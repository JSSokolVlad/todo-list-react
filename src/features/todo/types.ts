export interface Form {
  id: number | null;
  title: string;
  description: string;
}

export interface ChangeFormProps {
  name: keyof Form;
  value: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
}

export interface ToDoState {
  form: Form;
  tasks: Task[];
}
