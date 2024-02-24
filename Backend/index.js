const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { authenticate } = require('./middleware/auth');
const Task = require('./models/task');
const User = require('./models/user');
const { signup, login } = require('./controllers/auth');

// require('./auth')
// require('./task')

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/taskmanagement');


app.post('/signup', signup);
app.post('/login', login);
const { getTasks, createTask, updateTask, deleteTask } = require('./controllers/task');
app.get('/tasks', authenticate, getTasks);
app.post('/tasks', authenticate, createTask);
app.put('/tasks/:taskId', authenticate, updateTask);
app.delete('/tasks/:taskId', authenticate, deleteTask);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
