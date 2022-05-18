import Paper from "@mui/material/Paper";
import React, { useCallback } from "react";
import { ToDoItemProps } from "./types";
import CustomCheckbox from "../customCheckboxProps/CustomCheckbox";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Hightlight from "../hightLight/Hightlight";
import styles from "./ToDoItem.module.css";

const ToDoItem: React.FC<ToDoItemProps> = ({
  filter,
  task,
  completeTask,
  editTask,
  removeTask,
}) => {
  const light = useCallback(
    (str: string) => {
      return <Hightlight filter={filter} str={str} />;
    },
    [filter]
  );

  const handleCompleteTask = useCallback(() => {
    completeTask(task.id);
  }, [completeTask, task.id]);

  const handleEditTask = useCallback(() => {
    editTask(task.id);
  }, [editTask, task.id]);

  const handleRemoveTask = useCallback(() => {
    removeTask(task.id);
  }, [removeTask, task.id]);

  return (
    <Paper elevation={3} className={styles.toDoItem} data-testid="toDoItem">
      <div>
        <CustomCheckbox
          checked={task.isCompleted}
          onChange={handleCompleteTask}
        />
      </div>
      <div className={styles.contentSection}>
        <div className={styles.titleSection}>
          <span className={styles.title}>{task.title}</span>
          <EditIcon className={styles.editIcon} onClick={handleEditTask} />
          <DeleteOutlineIcon
            data-testid={`deleteIcon_${task.id}`}
            className={styles.deleteIcon}
            onClick={handleRemoveTask}
          />
        </div>
        <div className={styles.descriptionSection}>
          {light(task.description)}
        </div>
      </div>
    </Paper>
  );
};

export default React.memo(ToDoItem);
