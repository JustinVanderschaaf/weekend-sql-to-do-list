const { Router } = require("express");
const express = require("express");
const taskRouter = express.Router();
const pool = require("../modules/pool");

// DB CONNECTION

// GET
// GET /tasks endpoint
// should return an array of tasks objects
// from the database
taskRouter.get("/", (req, res) => {
  // Make a SQL query as a string
  const queryText = 'SELECT * FROM "tasks" ORDER BY completed ASC ;';

  // Send the SQL query to the database
  // This is asynchronous! It is a network request, like AJAX.
  pool
    .query(queryText)
    .then((dbRes) => {
      // This function is called when
      // the database query is complete
      // Send the data back to the client
      res.send(dbRes.rows);
    })
    .catch((err) => {
      console.log("GET /tasks failed", err);

      // Tell the client that it failed
      res.sendStatus(500);
    });
});

// POST

taskRouter.post("/", (req, res) => {
  let newTask = req.body;
  console.log(`Adding task`, newTask);
  let queryText = `INSERT INTO "tasks" ("task", "completed")
                     VALUES ($1, $2);`;

  pool
    .query(queryText, [newTask.task, newTask.completed])

    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log((`Error adding new task`, error));
      res.sendStatus(500);
    });
});

// Delete task by id
// DELETE /task/:id
// The value of :id becomes req.params.id
taskRouter.delete("/:taskId", (req, res) => {
  // Grab the URL parameter
  console.log("id is", req.params.taskId);

  let queryText = `
        DELETE FROM "tasks"
        WHERE id=$1; 
    `;
  let queryParams = [
    req.params.taskId, // $1
  ];

  pool
    .query(queryText, queryParams)
    .then((dbRes) => {
      // Send back a 👍
      res.sendStatus(204); // 204 = No Content
    })
    .catch((err) => {
      console.log("DELETE /task failed!", err);
    });
});

// PUT
taskRouter.put("/:id", (req, res) => {
  let queryParams = [req.params.id];
  console.log("Toggling complete at id ", queryParams);
  let queryText = `
    UPDATE "tasks"
        SET "completed" = NOT "completed"
        WHERE "id" = ${queryParams};
    `;
  pool
    .query(queryText)
    .then((dbRes) => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log("PUT /tasks failed ", err);
    });
});

module.exports = taskRouter;
