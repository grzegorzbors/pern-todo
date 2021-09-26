import todoItemStyles from "./TodoItem.module.css";

const ToDoItem = ({
  id,
  description,
  completedStatus,
  handleComplete,
  handleDelete,
}) => {
  console.log("Item", id);
  const completedClass =
    completedStatus === true ? todoItemStyles.todo__strikethrough : "";

  return (
    <div className="d-flex justify-content-center p-1">
      <li className={`list-group-item flex-grow-1 ${completedClass}`}>
        {description}
      </li>
      <button
        onClick={() => handleComplete(id, completedStatus)}
        className="btn btn-success"
      >
        <i className="fas fa-check"></i>
      </button>
      <button onClick={() => handleDelete(id)} className="btn btn-danger">
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
};

export default ToDoItem;
