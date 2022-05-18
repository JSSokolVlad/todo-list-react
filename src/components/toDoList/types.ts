import { Task } from "../../features/todo/types";

export interface ToDoListProps {
  filter: string;
  tasks: Task[];
  openForm: () => void;
}
