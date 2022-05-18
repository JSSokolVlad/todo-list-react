import { Form } from "../../features/todo/types";

export interface ToDoFormProps {
  form: Form;
  open: boolean;
  onClose: () => void;
}

export interface StateForm {
  title: string;
  description: string;
}
