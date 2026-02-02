const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

//! Create a ToDo
//! POST /api/todos

router.post('/', async (req, res) => {
    try {
        //! Get Data from the request body
        const { title, description, user } = req.body;

        //! Create a new Todo Object
        const newTodo = new Todo({
            title,
            description,
        });

        //! Save it on DB

        const saveTodo = await newTodo.save();

        //! Send back the response
        res.status(201).json(saveTodo);
    } catch (error) {
        //! Send error if something goes wrong
        res.status(500).json({message: error.message})
        
    }
})

module.exports = router;