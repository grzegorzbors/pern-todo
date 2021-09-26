import "./App.css";
import TotoList from "./components/ToDoList";

// env
require("dotenv").config();

const App = () => {
  return (
    <div className="App">
      <div className="container">
        <h1 className="text-center mt-5">PERN Todo List</h1>
        <TotoList />
      </div>
    </div>
  );
};

export default App;
