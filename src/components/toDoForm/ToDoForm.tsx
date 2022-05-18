import React, { useCallback, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CustomTextField from "../customTextField/CustomTextField";
import { addTask, updateTask } from "../../features/todo/toDoSlice";
import { useAppDispatch } from "../../app/hooks";
import { StateForm, ToDoFormProps } from "./types";
import styles from "./ToDoForm.module.css";

const ToDoForm: React.FC<ToDoFormProps> = ({ form, open, onClose }) => {
  const dispatch = useAppDispatch();
  const [errorForm, setError] = useState(false);
  const [stateForm, setStateForm] = useState<StateForm>({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (form.id && form.title.trim() !== "") {
      setStateForm({ title: form.title, description: form.description });
    }
  }, [form]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;

      if (name === "title" && errorForm) {
        setError(false);
      }

      setStateForm((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [errorForm]
  );

  const handleClose = useCallback(() => {
    setStateForm({ title: "", description: "" });
    onClose();

    if (errorForm) {
      setError(false);
    }
  }, [onClose, errorForm]);

  const checkForm = (form: StateForm) => {
    if (form.title.trim() === "") {
      setError(true);
      return false;
    }
    return true;
  };

  const handelSave = useCallback(() => {
    if (!checkForm(stateForm)) return;

    if (form.id) {
      dispatch(
        updateTask({
          id: form.id,
          title: stateForm.title,
          description: stateForm.description,
        })
      );
    } else {
      dispatch(
        addTask({
          id: new Date().getTime(),
          title: stateForm.title,
          description: stateForm.description,
          isCompleted: false,
        })
      );
    }

    setStateForm({ title: "", description: "" });
    handleClose();
  }, [dispatch, errorForm, form.id, handleClose, stateForm]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ pb: 0 }}>{`${
        form.id ? "Edit" : "Create"
      } task`}</DialogTitle>
      <DialogContent className={styles.content}>
        <CustomTextField
          error={errorForm}
          className={styles.title}
          label="Title"
          name="title"
          helperText={errorForm ? "* Required field" : ""}
          value={stateForm.title}
          onChange={handleChange}
        />
        <CustomTextField
          label="Description"
          multiline={true}
          name="description"
          rows={4}
          value={stateForm.description}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handelSave} disabled={errorForm}>
          Save
        </Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(ToDoForm);
