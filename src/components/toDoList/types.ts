import { Task } from "../../features/todo/types";

export interface ToDoListProps {
  filter: string;
  tasks: Task[];
  completeTask: (id: number) => void;
  editTask: (id: number) => void;
  removeTask: (id: number) => void;
}
