import { useContext } from "react";
import TodoContext from "../context/TodoContext";

const TotoList = () => {
  const { todoItems, setTodoItems } = useContext(TodoContext);

  const handleDelete = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_ENDPOINT}/${id}`, {
        method: "DELETE",
      });

      setTodoItems(todoItems.filter(({ todo_id }) => todo_id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <table className="table mt-5 text-center">
      <thead>
        <tr>
          <th>Description</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {todoItems
          ? todoItems.map(({ todo_id, description }) => (
              <tr key={todo_id}>
                <td>{description}</td>
                <td>Edit</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(todo_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          : "Loading..."}
      </tbody>
    </table>
  );
};

export default TotoList;
