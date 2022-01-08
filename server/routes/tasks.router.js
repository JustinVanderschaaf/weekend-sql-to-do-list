const { Router } = require('express');
const express = require('express');
const taskRouter = express.Router();
const pool = require('../modules/pool');

// DB CONNECTION


// GET
// GET /tasks endpoint
// should return an array of tasks objects
// from the database
taskRouter.get('/', (req, res) => {
    // Make a SQL query as a string
    const queryText = 'SELECT * FROM "tasks";';

    // Send the SQL query to the database
    // This is asynchronous! It is a network request, like AJAX.
    pool.query(queryText)
        .then((dbRes) => {
            // This function is called when
            // the database query is complete
            // Send the data back to the client
            res.send(dbRes.rows);
        })
        .catch((err) => {
            console.log('GET /tasks failed', err);

            // Tell the client that it failed
            res.sendStatus(500);    
        });
});

// POST

taskRouter.post('/', (req, res) => {
    let newTask =req.body;
    console.log(`Adding task`, newTask);
    let queryText = `INSERT INTO "tasks" ("task", "completed")
                     VALUES ($1, $2);`;
    pool.query(queryText, [newKoala.task, newKoala.completed])
    .then(result => {
        res.sendStatus(201);
    })
    .catch(error => {
        console.log((`Error adding new task`, error));
        res.sendStatus(500);
    })                 
    
})


module.exports = taskRouter;