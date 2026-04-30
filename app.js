const express = require('express');
const { engine } = require('express-handlebars');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const { randomUUID } = require('node:crypto');
const csrf = require('csurf');
const path = require('path');
const indexRouter = require('./routes/index');
const middlewares = require('./middlewares/middlewares');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up Handlebars as the view engine
app.engine('hbs', engine({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SECRET || 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use(cookieParser());
app.use(csrf({ cookie: true }));
app.use(cors({origin: 'http://localhost:3000'}));
app.use(morgan('dev'));
app.use(verifyToken);
app.disable('x-powered-by');

// Routes
app.use('/', indexRouter);

app.use(middlewares.csrfProtection);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
