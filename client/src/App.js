import { useState, useEffect } from "react";
import "./App.css";
import TodoInputForm from "./components/TodoInputForm.jsx";
import TotoList from "./components/TotoList";

// env
require("dotenv").config();

const App = () => {
  const [description, setDescription] = useState("");
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

  const handleDelete = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_ENDPOINT}/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getTodoData();
  }, [todoItems]);

  return (
    <div className="App">
      <div className="container">
        <h1 className="text-center mt-5">PERN Todo List</h1>
        <TodoInputForm
          setDescription={setDescription}
          description={description}
        />
        <TotoList
          todoItems={todoItems}
          setTodoItems={setTodoItems}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default App;
