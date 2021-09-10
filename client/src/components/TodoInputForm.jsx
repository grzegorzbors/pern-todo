const TodoInput = ({ setDescription, description, getTodoData }) => {
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      await fetch(process.env.REACT_APP_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      getTodoData();
      setDescription("");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <form className="d-flex" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={handleDescriptionChange}
        />
        <button type="submit" className="btn btn-success">
          Add
        </button>
      </form>
    </>
  );
};

export default TodoInput;
