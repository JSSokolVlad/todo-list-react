import React from "react";
import ToDoItem from "../toDoItem/ToDoItem";
import { ToDoListProps } from "./types";

const ToDoList: React.FC<ToDoListProps> = ({
  filter,
  tasks,
  completeTask,
  editTask,
  removeTask,
}) => {
  return (
    <div>
      {tasks.map((task) => (
        <ToDoItem
          filter={filter}
          key={task.id}
          task={task}
          completeTask={completeTask}
          editTask={editTask}
          removeTask={removeTask}
        />
      ))}
    </div>
  );
};

export default React.memo(ToDoList);
