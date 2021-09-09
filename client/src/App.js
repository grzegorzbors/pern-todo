import "./App.css";
import TodoInput from "./components/TodoInput";
import TotoList from "./components/TotoList";

// env
require("dotenv").config();

const App = () => {
  return (
    <div className="App">
      <div className="container">
        <TodoInput />
        <TotoList />
      </div>
    </div>
  );
};

export default App;
