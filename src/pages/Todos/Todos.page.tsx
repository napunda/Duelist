import * as Mantine from "@mantine/core";
import * as Firebase from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { DatePickerValue, DateTimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import {
  IconAlertCircle,
  IconCalendarTime,
  IconCheck,
  IconEdit,
  IconDotsVertical,
  IconTrash,
} from "@tabler/icons-react";
import classes from "./Todos.module.css";
import useAuthStore from "../../states/AuthState";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useDisclosure } from "@mantine/hooks";

interface TodoItem {
  id: string;
  todo: string;
  date: string;
  tags: string[];
  owner: string;
  completed?: boolean;
  ownerUid: string;
  createdAt: Date;
}

export default function Todos() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<TodoItem | null>(null);
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
        const todos: TodoItem[] = [];
        querySnapshot.forEach((doc) => {
          todos.push({
            id: doc.id,
            ...doc.data(),
          } as TodoItem);
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

  async function deleteDoc(todo: TodoItem | null) {
    closeDialog();
    if (!todo) return;
    await Firebase.deleteDoc(Firebase.doc(db, "todos", todo.id));
    setSelectedTodo(null);
  }

  function editTodo(todo: TodoItem | null) {
    setSelectedTodo(todo);
    if (!todo) return;
    form.setValues({
      todo: todo.todo,
      date: new Date(todo.date),
      tags: todo.tags,
      isEditing: true,
    });
  }

  async function handleEditTodo(todo: TodoItem | null) {
    if (!todo) return;
    await Firebase.updateDoc(Firebase.doc(db, "todos", todo.id), {
      todo: form.values.todo,
      date: form.values.date.toISOString(),
      tags: form.values.tags,
    });
  }

  async function markAsCompleted(todo: TodoItem | null) {
    if (!todo) return;
    await Firebase.updateDoc(Firebase.doc(db, "todos", todo.id), {
      completed: true,
    });
    setSelectedTodo(null);
  }

  return (
    <Mantine.Container className={classes.todoWrapper}>
      <Mantine.Title py="lg">My Todos</Mantine.Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Mantine.Stack>
          <Mantine.Textarea
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
          <Mantine.TagsInput
            size="md"
            variant="filled"
            label="Add some tags to your task"
            placeholder="Type and press Enter"
            value={form.values.tags}
            onChange={(value) => form.setFieldValue("tags", value)}
            splitChars={[",", " ", ";"]}
          />

          <Mantine.Text size="md" fw={500} mb={-18}>
            <label htmlFor="date-picker">Select date and time</label>
          </Mantine.Text>
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
        </Mantine.Stack>
        <Mantine.Group justify="end" mt="md">
          <Mantine.Button type="submit" radius="xl">
            {form.values.isEditing ? "Save todo" : "Add new todo"}
          </Mantine.Button>
        </Mantine.Group>
      </form>
      <Mantine.Divider mt="xl" mb="xl" />
      <h2>My Todos list</h2>
      {loading && (
        <Mantine.Grid pt="xl">
          <Mantine.Grid.Col span={{ base: 12, md: 6 }}>
            <Mantine.Skeleton radius="md" height={172}></Mantine.Skeleton>
          </Mantine.Grid.Col>
          <Mantine.Grid.Col span={{ base: 12, md: 6 }}>
            <Mantine.Skeleton radius="md" height={172}></Mantine.Skeleton>
          </Mantine.Grid.Col>
          <Mantine.Grid.Col span={{ base: 12 }}>
            <Mantine.Skeleton radius="md" height={172}></Mantine.Skeleton>
          </Mantine.Grid.Col>
        </Mantine.Grid>
      )}
      {!loading && todos.length > 0 && (
        <Mantine.Grid grow pt="xl">
          {todos.map((todo) => (
            <Mantine.Grid.Col key={todo.id} span="content">
              <Mantine.Card
                padding="xl"
                radius="md"
                withBorder={!todo.completed}
                pos="relative"
              >
                <Mantine.Menu position="bottom-start">
                  <Mantine.Menu.Target>
                    <Mantine.ActionIcon
                      pos="absolute"
                      size="sm"
                      variant="transparent"
                      right={12}
                      top={12}
                    >
                      <IconDotsVertical size={18} />
                    </Mantine.ActionIcon>
                  </Mantine.Menu.Target>
                  <Mantine.Menu.Dropdown>
                    <Mantine.MenuItem
                      onClick={() => editTodo(todo)}
                      leftSection={<IconEdit />}
                    >
                      Edit todo
                    </Mantine.MenuItem>
                    <Mantine.MenuItem
                      onClick={() => markAsCompleted(todo)}
                      leftSection={<IconCheck />}
                    >
                      Mark as completed
                    </Mantine.MenuItem>
                    <Mantine.MenuItem
                      leftSection={<IconTrash />}
                      onClick={() => {
                        setSelectedTodo(todo);
                        toggleDialog();
                      }}
                    >
                      Delete
                    </Mantine.MenuItem>
                  </Mantine.Menu.Dropdown>
                </Mantine.Menu>

                <Mantine.Box>
                  {todo.tags.map((tag) => (
                    <Mantine.Badge
                      key={tag}
                      color="green"
                      variant="outline"
                      mr={12}
                      p="sm"
                      radius="xl"
                    >
                      {tag}
                    </Mantine.Badge>
                  ))}
                </Mantine.Box>
                <Mantine.Box mt="md">
                  <Mantine.Text size="20px" fw={700}>
                    {todo.todo}
                  </Mantine.Text>
                  <Mantine.Group mt="sm" justify="start" align="center">
                    <IconCalendarTime size={20} />
                    <Mantine.Text fw={300}>
                      {format(todo.date, "dd 'of' MMMM 'at' HH:mm")}
                    </Mantine.Text>
                  </Mantine.Group>
                </Mantine.Box>
              </Mantine.Card>
            </Mantine.Grid.Col>
          ))}
        </Mantine.Grid>
      )}
      <Mantine.Modal
        opened={openedDialog}
        withCloseButton
        onClose={closeDialog}
        size="md"
        radius="md"
        centered
      >
        <Mantine.Group align="center" justify="center">
          <IconAlertCircle size={30} />
          <Mantine.Text size="md" fw={700}>
            This action will delete the curent todo!
          </Mantine.Text>
        </Mantine.Group>
        <Mantine.Group align="center" justify="center" mt="xl">
          <Mantine.Button
            color="red"
            variant="subtle"
            onClick={() => closeDialog()}
          >
            Cancel
          </Mantine.Button>
          <Mantine.Button
            variant="light"
            onClick={() => {
              deleteDoc(selectedTodo);
            }}
          >
            Confirm
          </Mantine.Button>
        </Mantine.Group>
      </Mantine.Modal>
    </Mantine.Container>
  );
}
