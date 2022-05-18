import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import toDoReducer from "./../features/todo/toDoSlice";
import { loadState } from "../common/utils/localStorage";
import { LOCAL_STORAGE_KEY } from "../common/constats/constatns";

const preloadedState = {
  toDo: {
    form: {
      id: null,
      title: "",
      description: "",
    },
    tasks: loadState(LOCAL_STORAGE_KEY) || [],
  },
};

export const store = configureStore({
  reducer: {
    toDo: toDoReducer,
  },
  preloadedState,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
