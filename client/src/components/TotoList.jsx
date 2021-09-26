import ToDoItem from "./TodoItem";

const TotoList = ({ todoItems, handleDelete }) => {
  return (
    <ul className="list-group mt-2">
      {todoItems.map(({ todo_id, description, completed }) => (
        <ToDoItem
          key={todo_id}
          id={todo_id}
          description={description}
          completedStatus={completed}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
};

export default TotoList;
