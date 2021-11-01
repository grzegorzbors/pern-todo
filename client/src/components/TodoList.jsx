import { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import TodoInputForm from "./TodoInputForm";

const TodoList = () => {
  const [description, setDescription] = useState("");
  const [todoItems, setTodoItems] = useState([]);

  const getTodoData = async () => {
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
      setTodoItems(
        todoItems.filter(({ todo_id }) => {
          return todo_id !== id;
        })
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (description.length === 0) return;
    try {
      const body = { description };
      const response = await fetch(process.env.REACT_APP_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      setDescription("");
      setTodoItems((items) => [data, ...items]);
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
      getTodoData();
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getTodoData();
  }, []);

  return (
    <>
      <TodoInputForm
        description={description}
        setDescription={setDescription}
        handleSubmit={handleSubmit}
      />
      <ul className="list-group mt-2">
        {todoItems.map(({ todo_id, description, completed }) => (
          <TodoItem
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

export default TodoList;
