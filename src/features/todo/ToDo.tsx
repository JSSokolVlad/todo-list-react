import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Button from "@mui/material/Button";
import ToDoForm from "../../components/toDoForm/ToDoForm";
import { resetForm } from "./toDoSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import ToDoList from "../../components/toDoList/toDoList";
import CustomTextField from "../../components/customTextField/CustomTextField";
import debounce from "../../common/utils/debounce";
import { saveState } from "../../common/utils/localStorage";
import {
  FILTER_LABEL,
  LOCAL_STORAGE_KEY,
} from "../../common/constats/constatns";
import styles from "./ToDo.module.css";
import { Task } from "./types";

const ToDo: React.FC = () => {
  const dispatch = useAppDispatch();
  const inputEl = useRef<HTMLInputElement>(null);
  const [openForm, setOpenForm] = React.useState(false);
  const [filter, setFilter] = useState<string>("");
  const { form, tasks } = useAppSelector((state: RootState) => state.toDo);

  const filteredTasks: Task[] = useMemo(() => {
    if (filter === "") {
      return tasks;
    } else {
      return tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(filter) ||
          task.description.toLowerCase().includes(filter)
      );
    }
  }, [tasks, filter]);

  useEffect(() => {
    saveState(LOCAL_STORAGE_KEY, tasks);
  }, [tasks]);

  const onChangeFilter = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFilter(event.target.value.toLowerCase());
    },
    300
  );

  const handleOpenForm = useCallback(() => {
    setOpenForm(true);
  }, []);

  const handleCloseForm = useCallback(() => {
    setOpenForm(false);
    dispatch(resetForm());
  }, [dispatch]);

  return (
    <div className={styles.toDoWrapper}>
      <div className={styles.toDoHeader}>
        <div className={styles.headerSection}>
          <Button
            className={styles.btnAdd}
            variant="contained"
            onClick={handleOpenForm}
          >
            Add ToDo
          </Button>
        </div>
        <div className={styles.headerSection}>
          <CustomTextField
            className={styles.filter}
            label={FILTER_LABEL}
            name="filter"
            ref={inputEl}
            onChange={onChangeFilter}
          />
        </div>
      </div>
      <ToDoForm form={form} open={openForm} onClose={handleCloseForm} />
      <ToDoList
        filter={filter}
        tasks={filteredTasks}
        openForm={handleOpenForm}
      />
    </div>
  );
};

export default ToDo;
