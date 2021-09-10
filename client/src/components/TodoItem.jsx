import { useEffect, useState } from "react";
import todoItemStyles from "./TodoItem.module.css";

const ToDoItem = ({ id, description, completedStatus, getTodoData }) => {
  const [completed, setCompleted] = useState(completedStatus);

  const handleDelete = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_ENDPOINT}/${id}`, {
        method: "DELETE",
      });
      getTodoData();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleComplete = (id) => {
    setCompleted(() => !completed);
    updateData(id);
  };

  const updateData = async (id) => {
    console.log(completed);
    const body = { completed };
    try {
      await fetch(`${process.env.REACT_APP_ENDPOINT}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const completedClass =
    completed === true ? todoItemStyles.todo__strikethrough : "";

  return (
    <div className="d-flex justify-content-center p-1">
      <li className={`list-group-item flex-grow-1 ${completedClass}`}>
        {description}
      </li>
      <button onClick={() => handleComplete(id)} className="btn btn-success">
        <i className="fas fa-check"></i>
      </button>
      <button onClick={() => handleDelete(id)} className="btn btn-danger">
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
};

export default ToDoItem;
