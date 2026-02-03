const express = require('express');
const router = express.Router();
const User = require('../models/User'); //? Import User Blueprint
const bcrypt = require('bcryptjs'); //? Import encryption tool
const jwt = require('jsonwebtoken'); //? Import token tool

//! REGISTER a new user
//! Endpoint: POST /api/auth/register
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //? 1. Validation: Check if user already exists
        //? If we don't do this, we might get duplicate emails
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        //? 2. Security: Hash the password
        //? "10" is the "salt rounds" (how complex the scrambling is)
        const hashedPassword = await bcrypt.hash(password, 10);

        //? 3. Create the User in the Database
        const newUser = new User({
            name,
            email,
            password: hashedPassword //? Store the scrambled version!
        });
        await newUser.save();

        //? 4. Generate a Token (The "VIP Badge")
        //? We put the user's ID inside the token so we know who they are later
        const token = jwt.sign(
            { userId: newUser._id }, 
            process.env.JWT_SECRET, //? In a real app, this goes in .env!
            { expiresIn: '1h' } //? Token expires in 1 hour
        );

        //? 5. Respond with the token
        res.status(201).json({ token });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//! LOGIN an existing user
//! Endpoint: POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        //? 1. Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        //? 2. Check if password matches (Compare plain text vs. Hashed)
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        //? 3. Generate Token (Sign it with the same SECRET from .env)
        const token = jwt.sign(
            { userId: user._id }, 
            process.env.JWT_SECRET, //? <--- Using the same key
            { expiresIn: '1h' }
        );

        res.json({ token });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;