import "./App.css";
import TodoList from "./components/TodoList";

// env
require("dotenv").config();

const App = () => {
  return (
    <div className="App">
      <div className="container">
        <h1 className="text-center mt-5">PERN Todo List</h1>
        <TodoList />
      </div>
    </div>
  );
};

export default App;
