import { Grid } from "@mantine/core";
import TodoItem from "./TodoItem";
import { ITodoProps } from "../types/Todo";
import { ITodoItem } from "../types/TodoItem";

interface ITodoListProps extends ITodoProps {
  todos: ITodoItem[];
}

export default function TodoList({
  todos,
  editTodo,
  markAsCompleted,
  setSelectedTodo,
  toggleDialog,
}: Readonly<ITodoListProps>) {
  return (
    <Grid grow pt="xl">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          editTodo={editTodo}
          markAsCompleted={markAsCompleted}
          setSelectedTodo={setSelectedTodo}
          toggleDialog={toggleDialog}
        />
      ))}
    </Grid>
  );
}
