const Task = require('../models/task');

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.userData.userId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    const task = new Task({ title, description, dueDate, user: req.userData.userId });
    await task.save();

    res.status(201).json({ message: 'Task created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const { title, description, dueDate, completed } = req.body;

    const task = await Task.findOneAndUpdate(
      { _id: taskId, user: req.userData.userId },
      { title, description, dueDate, completed },
      { new: true }
    );

    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    res.status(200).json({ message: 'Task updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const task = await Task.findOneAndDelete({ _id: taskId, user: req.userData.userId });

    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
