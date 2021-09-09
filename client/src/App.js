import { useState, useEffect } from "react";
import "./App.css";
import TodoInput from "./components/TodoInput.jsx";
import TotoList from "./components/TotoList";
import TodoContext from "./context/TodoContext";

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
    console.log("app effect");
    getTodoData();
  }, []);

  return (
    <TodoContext.Provider value={{ todoItems, setTodoItems }}>
      <div className="App">
        <div className="container">
          <h1>ToDo List</h1>
          <TodoInput />
          <TotoList />
        </div>
      </div>
    </TodoContext.Provider>
  );
};

export default App;
