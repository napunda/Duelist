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
  toggleCompleted,
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
          toggleCompleted={toggleCompleted}
          setSelectedTodo={setSelectedTodo}
          toggleDialog={toggleDialog}
        />
      ))}
    </Grid>
  );
}
