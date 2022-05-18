import ToDo from "./features/todo/ToDo";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>ToDo App</h1>
      <ToDo data-testid="todo" />
    </div>
  );
}

export default App;
