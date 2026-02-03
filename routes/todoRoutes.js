const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware); //? Apply auth middleware to all routes below

//! Create a ToDo
//! POST /api/todos

router.post('/', async (req, res) => {
    try {
        //! Get Data from the request body
        const { title, description } = req.body;

        //! Create a new Todo Object
        const newTodo = new Todo({
            title,
            description,
            user: req.user.userId //? Attach the logged-in User's ID!
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

//! Read all ToDos
//! GET /api/todos
router.get('/', async(req,res) => {
    try {
        const todos = await Todo.find({ user: req.user.userId });    //? Fetch all todos from the database   .find() is a Mongoose method - retrieves all documents
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//! Update a ToDo
//! PUT /api/todos/:id
//? :id is a variable part of the URL representing the unique identifier of the ToDo item to be updated. For example, if the id of the ToDo item is 123, the client would send a PUT request to /api/todos/123 to update that specific item.
router.put('/:id', async(req,res) => {
    try {
        //? findByIdAndUpdate takes 3 things
        //? 1. The idea to look for
        //? 2. The new Data
        //? 3 { new: true } -> This tells Mongoose to return the *updated* version, not the old one.

        const { title, description } = req.body;
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            {title, description},
            {new: true}
        );

        if(!updatedTodo) {
            return res.status(404).json({message: 'Todo not found'});
        }

        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//! Delete a ToDo
//! Endpoint: DELETE /api/todos/:id
router.delete('/:id', async(req,res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        if(!deletedTodo) {
            return res.status(404).json({message: 'Todo not found'});
        }
        //? 204 means "No Content" (Successful deletion, nothing to return)
        res.json({message: 'Todo deleted successfully'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

module.exports = router;