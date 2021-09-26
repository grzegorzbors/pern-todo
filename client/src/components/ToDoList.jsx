import { useState, useEffect } from "react";
import ToDoItem from "./TodoItem";
import TodoInputForm from "./TodoInputForm";

const TodoList = () => {
  const [description, setDescription] = useState("");
  const [todoItems, setTodoItems] = useState([]);
  const [updateToggle, setUpdateToggle] = useState(false);

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
      await fetch(process.env.REACT_APP_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setDescription("");
      setUpdateToggle((toggle) => !toggle);
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
      setUpdateToggle((toggle) => !toggle);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    console.log("App Effect");
    getTodoData();
  }, [updateToggle]);

  return (
    <>
      <TodoInputForm
        description={description}
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

export default TodoList;
