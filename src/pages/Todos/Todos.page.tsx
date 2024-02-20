import {
  Container,
  Title,
  Stack,
  TagsInput,
  Textarea,
  Text,
  Group,
  Button,
  Divider,
} from "@mantine/core";
import * as Firebase from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { DatePickerValue, DateTimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconCalendarTime } from "@tabler/icons-react";
import classes from "./Todos.module.css";
import useAuthStore from "../../states/AuthState";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { ITodoItem } from "./types/TodoItem";
import TodoList from "./components/TodoList";
import DeleteTodoModal from "./components/DeleteTodoModal";
import Skeleton from "./components/Skeleton";

export default function Todos() {
  const [todos, setTodos] = useState<ITodoItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<ITodoItem | null>(null);
  const user = useAuthStore((state) => state.user);
  const [openedDialog, { toggle: toggleDialog, close: closeDialog }] =
    useDisclosure(false);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = Firebase.onSnapshot(
      Firebase.query(
        Firebase.collection(db, "todos"),
        Firebase.where("owenerUid", "==", user?.uid)
      ),
      (querySnapshot) => {
        const todos: ITodoItem[] = [];
        querySnapshot.forEach((doc) => {
          todos.push({
            id: doc.id,
            ...doc.data(),
          } as ITodoItem);
        });
        setTodos(todos);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user?.uid]);

  const form = useForm<{
    todo: string;
    date: Date;
    tags: string[];
    isEditing?: boolean;
  }>({
    initialValues: {
      todo: "",
      date: new Date(),
      tags: [],
      isEditing: false,
    },

    validate: {
      todo: (val) =>
        val.length <= 5 ? "Todo should include at least 5 characters" : null,
    },
  });

  function handleSubmit() {
    const { todo, date, tags } = form.values;

    if (form.values.isEditing) {
      handleEditTodo(selectedTodo);
      form.reset();
      setSelectedTodo(null);
      return;
    }

    Firebase.addDoc(Firebase.collection(db, "todos"), {
      todo,
      date: date.toISOString(),
      tags,
      owner: user?.displayName,
      completed: false,
      owenerUid: user?.uid,
      createdAt: new Date(),
    });
    form.reset();
  }

  async function deleteDoc(todo: ITodoItem | null) {
    closeDialog();
    if (!todo) return;
    await Firebase.deleteDoc(Firebase.doc(db, "todos", todo.id));
    setSelectedTodo(null);
  }

  function editTodo(todo: ITodoItem | null) {
    setSelectedTodo(todo);
    if (!todo) return;
    form.setValues({
      todo: todo.todo,
      date: new Date(todo.date),
      tags: todo.tags,
      isEditing: true,
    });
  }

  async function handleEditTodo(todo: ITodoItem | null) {
    if (!todo) return;
    await Firebase.updateDoc(Firebase.doc(db, "todos", todo.id), {
      todo: form.values.todo,
      date: form.values.date.toISOString(),
      tags: form.values.tags,
    });
  }

  async function markAsCompleted(todo: ITodoItem | null) {
    if (!todo) return;
    await Firebase.updateDoc(Firebase.doc(db, "todos", todo.id), {
      completed: true,
    });
    setSelectedTodo(null);
  }

  return (
    <Container className={classes.todoWrapper}>
      <Title py="lg">My Todos</Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <Textarea
            size="md"
            rows={3}
            variant="filled"
            required
            label="Create a new task"
            placeholder="Task description"
            value={form.values.todo}
            onChange={(event) =>
              form.setFieldValue("todo", event.currentTarget.value)
            }
            error={form.errors.todo}
            radius="md"
          />
          <TagsInput
            size="md"
            variant="filled"
            label="Add some tags to your task"
            placeholder="Type and press Enter"
            value={form.values.tags}
            onChange={(value) => form.setFieldValue("tags", value)}
            splitChars={[",", " ", ";"]}
          />

          <Text size="md" fw={500} mb={-18}>
            <label htmlFor="date-picker">Select date and time</label>
          </Text>
          <DateTimePicker
            id="date-picker"
            required
            label={<IconCalendarTime size={30} />}
            className={classes.datePicker}
            value={form.values.date}
            onChange={(date: DatePickerValue | null) =>
              form.setFieldValue("date", date ?? new Date())
            }
          />
        </Stack>
        <Group justify="end" mt="md">
          <Button type="submit" radius="xl">
            {form.values.isEditing ? "Save todo" : "Add new todo"}
          </Button>
        </Group>
      </form>
      <Divider mt="xl" mb="xl" />
      <h2>My Todos list</h2>
      {loading && <Skeleton units={3} height={162} />}
      {!loading && todos.length > 0 && (
        <TodoList
          todos={todos}
          editTodo={editTodo}
          markAsCompleted={markAsCompleted}
          setSelectedTodo={setSelectedTodo}
          toggleDialog={toggleDialog}
        />
      )}
      <DeleteTodoModal
        openedDialog={openedDialog}
        closeDialog={closeDialog}
        deleteDoc={deleteDoc}
        selectedTodo={selectedTodo}
      />
    </Container>
  );
}
