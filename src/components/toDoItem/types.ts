import { Task } from "../../features/todo/types";

export interface ToDoItemProps {
  filter: string;
  task: Task;
  completeTask: (id: number) => void;
  editTask: (id: number) => void;
  removeTask: (id: number) => void;
}
