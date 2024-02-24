const { signup, login } = require('./controllers/auth');
app.post('/signup', signup);
app.post('/login', login);