import {
  Grid,
  Card,
  Menu,
  MenuItem,
  ActionIcon,
  Box,
  Badge,
  Group,
  Text,
} from "@mantine/core";
import {
  IconCalendarTime,
  IconCheck,
  IconDotsVertical,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";
import { format } from "date-fns";
import { ITodoProps } from "../types/Todo";
import { ITodoItem } from "../types/TodoItem";

interface TodoItemProps extends ITodoProps {
  todo: ITodoItem;
}

export default function TodoItem({
  todo,
  editTodo,
  toggleCompleted,
  setSelectedTodo,
  toggleDialog,
}: Readonly<TodoItemProps>) {
  return (
    <Grid.Col key={todo.id} span="content">
      <Card
        title={todo.completed ? "Todo completed" : "In progress"}
        padding="xl"
        radius="md"
        withBorder
        pos="relative"
        opacity={todo.completed ? 0.6 : 1}
      >
        <Menu position="bottom-start">
          <Menu.Target>
            <ActionIcon
              pos="absolute"
              size="sm"
              variant="transparent"
              right={12}
              top={12}
            >
              <IconDotsVertical size={18} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <MenuItem onClick={() => editTodo(todo)} leftSection={<IconEdit />}>
              Edit todo
            </MenuItem>
            <MenuItem
              onClick={() => toggleCompleted(todo, !todo.completed)}
              leftSection={<IconCheck />}
            >
              {todo.completed ? "Mark as uncompleted" : "Mark as completed"}
            </MenuItem>
            <MenuItem
              leftSection={<IconTrash />}
              onClick={() => {
                setSelectedTodo(todo);
                toggleDialog();
              }}
            >
              Delete
            </MenuItem>
          </Menu.Dropdown>
        </Menu>

        <Box>
          {todo.tags.map((tag) => (
            <Badge
              key={tag}
              color="green"
              variant="outline"
              mr={12}
              p="sm"
              radius="xl"
            >
              {tag}
            </Badge>
          ))}
        </Box>
        <Box mt="md">
          <Text size="20px" fw={700}>
            {todo.todo}
          </Text>
          <Group mt="sm" justify="start" align="center">
            <IconCalendarTime size={20} />
            <Text fw={300}>{format(todo.date, "dd 'of' MMMM 'at' HH:mm")}</Text>
          </Group>
        </Box>
        {todo.completed && (
          <Box pos="absolute" right={12} bottom={12}>
            <IconCheck size={36} />
          </Box>
        )}
      </Card>
    </Grid.Col>
  );
}
