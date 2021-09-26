import { useState, useEffect } from "react";
import ToDoItem from "./TodoItem";
import TodoInputForm from "./TodoInputForm";

const TotoList = () => {
  const [description, setDescription] = useState("");
  const [todoItems, setTodoItems] = useState([]);

  const getTodoData = async () => {
    console.log("GED");
    try {
      const response = await fetch(process.env.REACT_APP_ENDPOINT);
      const todos = await response.json();
      setTodoItems(todos);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (description.length === 0) return;
    try {
      const body = { description };
      await fetch(process.env.REACT_APP_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setDescription("");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleComplete = async (id, completedStatus) => {
    try {
      let completed = !completedStatus;
      const body = { completed };
      await fetch(`${process.env.REACT_APP_ENDPOINT}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    console.log("App Effect");
    getTodoData();
  }, []);

  return (
    <>
      <TodoInputForm
        setDescription={setDescription}
        handleSubmit={handleSubmit}
      />
      <ul className="list-group mt-2">
        {todoItems.map(({ todo_id, description, completed }) => (
          <ToDoItem
            key={todo_id}
            id={todo_id}
            description={description}
            completedStatus={completed}
            handleDelete={handleDelete}
            handleComplete={handleComplete}
          />
        ))}
      </ul>
    </>
  );
};

export default TotoList;
