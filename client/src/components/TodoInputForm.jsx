const TodoInputForm = ({ setDescription, description, handleSubmit }) => {
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
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

export default TodoInputForm;
