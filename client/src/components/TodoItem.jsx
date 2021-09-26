import { useState } from "react";
import todoItemStyles from "./TodoItem.module.css";

const ToDoItem = ({ id, description, completedStatus, handleDelete }) => {
  const [completed, setCompleted] = useState(completedStatus);

  const handleComplete = async (id) => {
    try {
      setCompleted((completed) => !completed);
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
