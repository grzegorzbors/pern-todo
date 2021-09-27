import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import pool from "./db";

const app = express();

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

//create a todo

app.post("/todos", async (req: Request, res: Response) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );

    res.json(newTodo.rows[0]);
  } catch (error: any) {
    console.log(error.message);
  }
});

//get all todos
app.get("/todos", async (req: Request, res: Response) => {
  try {
    const allTodos = await pool.query(
      "SELECT * FROM todo ORDER BY todo_id DESC"
    );
    res.json(allTodos.rows);
  } catch (error: any) {
    console.log(error.message);
  }
});

//get a todo
app.get("/todos/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (error: any) {
    console.log(error.message);
  }
});

//update todo completed
app.put("/todos/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET completed = $1 WHERE todo_id = $2",
      [completed, id]
    );
    res.json("Todo updated!");
  } catch (error: any) {
    console.log(error.message);
  }
});

//delete todo
app.delete("/todos/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(`Item ${id} deleted!`);
  } catch (error: any) {
    console.log(error.message);
  }
});

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
