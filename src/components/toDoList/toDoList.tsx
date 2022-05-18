import React, { useCallback } from "react";
import { useAppDispatch } from "../../app/hooks";
import {
  completeTask,
  removeTask,
  setForm,
} from "../../features/todo/toDoSlice";
import ToDoItem from "../toDoItem/ToDoItem";
import { ToDoListProps } from "./types";

const ToDoList: React.FC<ToDoListProps> = ({ filter, tasks, openForm }) => {
  const dispatch = useAppDispatch();

  const handleCompleteTask = useCallback(
    (id: number) => {
      dispatch(completeTask(id));
    },
    [dispatch]
  );

  const handleEditTask = useCallback(
    (id: number) => {
      const editableTask = tasks.find((task) => task.id === id);

      if (editableTask) {
        const { description, id, title } = editableTask;

        dispatch(setForm({ description, id, title }));
        openForm();
      }
    },
    [dispatch, openForm, tasks]
  );

  const handleRemoveTask = useCallback(
    (id: number) => {
      dispatch(removeTask(id));
    },
    [dispatch]
  );

  return (
    <div>
      {tasks.map((task) => (
        <ToDoItem
          filter={filter}
          key={task.id}
          task={task}
          completeTask={handleCompleteTask}
          editTask={handleEditTask}
          removeTask={handleRemoveTask}
        />
      ))}
    </div>
  );
};

export default React.memo(ToDoList);
