const TotoList = ({ todoItems }) => {
  return (
    <>
      <h2>ToDo List</h2>
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
                  <td>Delete</td>
                </tr>
              ))
            : "Loading..."}
        </tbody>
      </table>
    </>
  );
};

export default TotoList;
