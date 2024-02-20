import { ITodoItem } from "./TodoItem";

export interface ITodoProps {
  editTodo: (todo: ITodoItem) => void;
  toggleCompleted: (todo: ITodoItem, completed: boolean) => void;
  setSelectedTodo: (todo: ITodoItem | null) => void;
  toggleDialog: () => void;
}
