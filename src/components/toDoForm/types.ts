import { Form } from "../../features/todo/types";

export interface ToDoFormProps {
  form: Form;
  open: boolean;
  onClose: () => void;
}
