import { useState } from "react";

const TodoInput = () => {
  const [description, setDescription] = useState("");

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch(process.env.REACT_APP_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <h1 className="text-center mt-5">PERN Todo List</h1>
      <form className="d-flex" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          defaultValue={description}
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
