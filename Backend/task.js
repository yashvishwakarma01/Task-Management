const { getTasks, createTask, updateTask, deleteTask } = require('./controllers/task');
app.get('/tasks', authenticate, getTasks);
app.post('/tasks', authenticate, createTask);
app.put('/tasks/:taskId', authenticate, updateTask);
app.delete('/tasks/:taskId', authenticate, deleteTask);