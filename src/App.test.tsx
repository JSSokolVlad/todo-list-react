import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";

it("renders App component", () => {
  const { getByText, getByLabelText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByText(/ToDo App/i)).toBeInTheDocument();
  expect(getByLabelText("Type here to search")).toBeInTheDocument();
});
