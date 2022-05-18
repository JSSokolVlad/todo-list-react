import toDoReducer, {
  addTask,
  changeForm,
  completeTask,
  removeTask,
  updateTask,
  resetForm,
  setForm,
} from "./toDoSlice";
import { ToDoState } from "./types";

const initialTasks = [
  {
    id: 1,
    title: "Task_1",
    description: "Complete a Task_1",
    isCompleted: false,
  },
  {
    id: 3,
    title: "Task_3",
    description: "Complete a Task_3",
    isCompleted: false,
  },
];

describe("toDo reducer", () => {
  const initialState: ToDoState = {
    form: {
      id: null,
      title: "",
      description: "",
    },
    tasks: initialTasks,
  };
  it("should handle initial state", () => {
    expect(toDoReducer(undefined, { type: "unknown" })).toEqual({
      form: {
        id: null,
        title: "",
        description: "",
      },
      tasks: [],
    });
  });

  it("should handle addTask", () => {
    const toDo = toDoReducer(
      initialState,
      addTask({
        id: 2,
        title: "Task_2",
        description: "Complete a Task_2",
        isCompleted: false,
      })
    );
    expect(toDo.tasks.length).toEqual(3);
  });

  it("should handle compliteTask", () => {
    const toDo = toDoReducer(initialState, completeTask(1));

    const completedTask = toDo.tasks.find((task) => task.id === 1);
    expect(completedTask?.isCompleted).toEqual(true);

    const oldTask = toDo.tasks.find((task) => task.id === 3);
    expect(oldTask?.isCompleted).toEqual(false);
  });

  it("should handle updateTask", () => {
    const toDo = toDoReducer(
      initialState,
      updateTask({ id: 1, title: "Task_1", description: "Complete all tasks" })
    );
    const updatedTask = toDo.tasks.find((task) => task.id === 1);
    expect(updatedTask?.description).toEqual("Complete all tasks");
  });

  it("should handle removeTask", () => {
    const toDo = toDoReducer(initialState, removeTask(1));
    expect(toDo.tasks.length).toEqual(1);
  });

  it("should handle changeForm", () => {
    const toDo = toDoReducer(
      initialState,
      changeForm({ name: "title", value: "New task" })
    );
    const newToDo = toDoReducer(
      toDo,
      changeForm({ name: "description", value: "Complete a new task" })
    );

    expect(newToDo.form.title).toEqual("New task");
    expect(newToDo.form.description).toEqual("Complete a new task");
  });

  it("should handle setForm", () => {
    const toDo = toDoReducer(
      initialState,
      setForm({ id: 1, title: "Сheck tasks", description: "Сheck all tasks" })
    );
    expect(toDo.form.title).toEqual("Сheck tasks");
    expect(toDo.form.description).toEqual("Сheck all tasks");
  });

  it("should handle resetForm", () => {
    const toDo = toDoReducer(
      initialState,
      setForm({ id: 1, title: "Сheck tasks", description: "Сheck all tasks" })
    );
    expect(toDo.form.title).toEqual("Сheck tasks");

    const newToDo = toDoReducer(toDo, resetForm());
    expect(newToDo.form.title).toEqual("");
  });
});
