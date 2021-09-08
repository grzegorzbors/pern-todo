import { useEffect, useState } from "react";
import "./App.css";
import TodoInput from "./components/TodoInput";
import TotoList from "./components/TotoList";

// env
require("dotenv").config();

const App = () => {
  const [todoItems, setTodoItems] = useState([]);

  const getTodoData = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_ENDPOINT);
      const jsonData = await response.json();
      setTodoItems(jsonData);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getTodoData();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <TodoInput />
        <TotoList todoItems={todoItems} />
      </div>
    </div>
  );
};

export default App;
