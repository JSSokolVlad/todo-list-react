import React, { useCallback } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { ToDoFormProps } from "./types";
import styles from "./ToDoForm.module.css";
import CustomTextField from "../customTextField/CustomTextField";
import { addTask, changeForm, updateTask } from "../../features/todo/toDoSlice";
import { useAppDispatch } from "../../app/hooks";
import { Form } from "../../features/todo/types";

const ToDoForm: React.FC<ToDoFormProps> = ({ form, open, onClose }) => {
  const dispatch = useAppDispatch();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = event.target.name as keyof Form;

    dispatch(changeForm({ name, value: event.target.value }));
  };

  const handleCreate = useCallback(
    (title: string, description: string) => {
      dispatch(
        addTask({
          id: new Date().getTime(),
          title,
          description,
          isCompleted: false,
        })
      );
      onClose();
    },
    [dispatch, onClose]
  );

  const handleEdit = useCallback(
    (id: number, title: string, description: string) => {
      dispatch(updateTask({ id, title, description }));
      onClose();
    },
    [dispatch, onClose]
  );

  const handleClose = () => {
    onClose();
  };

  const handelSave = () => {
    if (form.id) {
      handleEdit(form.id, form.title, form.description);
    } else {
      handleCreate(form.title, form.description);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ pb: 0 }}>{`${
        form.id ? "Edit" : "Create"
      } task`}</DialogTitle>
      <DialogContent className={styles.content}>
        <CustomTextField
          className={styles.title}
          label="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
        />
        <CustomTextField
          label="Description"
          multipline={true}
          name="description"
          rows={4}
          value={form.description}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handelSave}>Save</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(ToDoForm);
