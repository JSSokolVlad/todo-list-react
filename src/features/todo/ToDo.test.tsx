import { fireEvent, render } from "../../common/utils/test-utils";
import { screen } from "@testing-library/react";
import ToDo from "./ToDo";
import userEvent from "@testing-library/user-event";

const preloadedState = {
  toDo: {
    form: {
      id: null,
      title: "",
      description: "",
    },
    tasks: [
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
    ],
  },
};

describe("ToDo component", () => {
  let container: any;

  beforeEach(() => {
    container = render(<ToDo />, { preloadedState });
  });

  it("renders the search field", () => {
    const { getByLabelText } = container;
    expect(getByLabelText("Type here to search")).toBeInTheDocument();
  });

  it('renders "Add task" button', () => {
    const { getByText } = container;
    expect(getByText("Add ToDo")).toBeInTheDocument();
  });

  it("renders toDo List", () => {
    expect(screen.getAllByText(/complete/i).length).toBe(2);
  });

  it("change filter value", () => {
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "React" },
    });
    expect(screen.getByRole("textbox")).toHaveValue("React");
  });

  it("check filter", () => {
    userEvent.type(screen.getByRole("textbox"), "Complete");
    expect(screen.getAllByRole("checkbox").length).toBe(2);
  });
});
