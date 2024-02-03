import {
  Container,
  Title,
  Button,
  TextInput,
  Stack,
  TagsInput,
  Group,
  Skeleton,
  Box,
  Card,
  Badge,
  Text,
  Grid,
} from "@mantine/core";
import { DatePickerValue, DateTimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconCalendarTime } from "@tabler/icons-react";
import classes from "./Todos.module.css";
import { db } from "../../services/firebaseConnection";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import useAuthStore from "../../states/AuthState";
import { useEffect, useState } from "react";
import { format } from "date-fns";

export default function Todos() {
  const user = useAuthStore((state) => state.user);
  const [loading, setLoading] = useState(false);
  interface TodoItem {
    id: string;
    todo: string;
    date: string;
    tags: string[];
    owner: string;
    ownerUid: string;
  }

  const [todos, setTodos] = useState<TodoItem[]>([]);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onSnapshot(
      query(collection(db, "todos"), where("owenerUid", "==", user?.uid)),
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
  }>({
    initialValues: {
      todo: "",
      date: new Date(),
      tags: [],
    },

    validate: {
      todo: (val) =>
        val.length <= 10 ? "Todo should include at least 10 characters" : null,
    },
  });

  function handleSubmit() {
    const { todo, date, tags } = form.values;

    addDoc(collection(db, "todos"), {
      todo,
      date: date.toISOString(),
      tags,
      owner: user?.displayName,
      owenerUid: user?.uid,
    });
  }

  return (
    <Container>
      <Title py="lg">My Todos</Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            size="md"
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

          <DateTimePicker
            label={<IconCalendarTime color="white" size={30} />}
            className={classes.datePicker}
            value={form.values.date}
            onChange={(date: DatePickerValue | null) =>
              form.setFieldValue("date", date ?? new Date())
            }
          />
        </Stack>
        <Group justify="end" mt="md">
          <Button type="submit" variant="outline" radius="xl">
            Add new todo
          </Button>
        </Group>
      </form>
      <div>
        <h2>My Todos</h2>
        {loading && (
          <Grid>
            <Grid.Col span={6}>
              <Skeleton mt="xl" radius="xl" height={"212px"}></Skeleton>
            </Grid.Col>
            <Grid.Col span={6}>
              <Skeleton mt="xl" radius="xl" height={"212px"}></Skeleton>
            </Grid.Col>
          </Grid>
        )}

        {!loading && todos && (
          <Grid>
            {todos.map((todo) => (
              <Grid.Col key={todo.id} span={6}>
                <Card padding="xl" radius="xl" mt="lg" withBorder>
                  <Box>
                    {todo.tags.map((tag) => (
                      <Badge key={tag} color="green" mr={12} p="sm" radius="xl">
                        {tag}
                      </Badge>
                    ))}
                  </Box>
                  <Box mt="md">
                    <Text size="28px" fw={700}>
                      {todo.todo}
                    </Text>
                    <Group mt="sm" justify="start" align="center">
                      <IconCalendarTime size={20} />
                      <Text fw="lighter">
                        {format(todo.date, "dd 'of' MMMM 'at' HH:mm")}
                      </Text>
                    </Group>
                  </Box>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        )}
      </div>
    </Container>
  );
}
