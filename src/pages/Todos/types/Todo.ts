import { ITodoItem } from "./TodoItem";

export interface ITodoProps {
  editTodo: (todo: ITodoItem) => void;
  markAsCompleted: (todo: ITodoItem) => void;
  setSelectedTodo: (todo: ITodoItem | null) => void;
  toggleDialog: () => void;
}
