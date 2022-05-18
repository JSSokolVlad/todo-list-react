import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChangeFormProps, Form, Task, ToDoState } from "./types";

const initialState: ToDoState = {
  form: {
    id: null,
    title: "",
    description: "",
  },
  tasks: [],
};

export const toDoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    completeTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.map((task) => {
        if (task.id === action.payload) {
          task.isCompleted = !task.isCompleted;
        }
        return task;
      });
    },
    removeTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    updateTask: (state, action: PayloadAction<Form>) => {
      state.tasks = state.tasks.map((task) => {
        if (task.id === action.payload.id && !!action.payload.id) {
          task.title = action.payload.title;
          task.description = action.payload.description;
        }

        return task;
      });
    },
    changeForm: (state, action: PayloadAction<ChangeFormProps>) => {
      state.form = {
        ...state.form,
        [action.payload.name]: action.payload.value,
      };
    },
    resetForm: (state) => {
      state.form = { ...initialState.form };
    },
    setForm: (state, action: PayloadAction<Form>) => {
      state.form = { ...action.payload };
    },
  },
});

export const {
  addTask,
  changeForm,
  completeTask,
  removeTask,
  updateTask,
  resetForm,
  setForm,
} = toDoSlice.actions;

export default toDoSlice.reducer;
