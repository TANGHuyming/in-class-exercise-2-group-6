// JWT login
const jwt = require('jsonwebtoken');
const { users } = require('../data/users');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if(!token) {
        return res.status(401).redirect('/login').json({ message: 'No token provided' });
    };
    jwt.verify(token, 'secret', (err, decoded) => {
        if(err) {
            return res.status(401).redirect('/login').json({ message: 'Invalid token' });
        }
        req.user = decoded;
        next();
    });
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = users.find(u => u.email === email);
        if(!user) {
            return res.status(401).redirect('/login').json({ message: 'Invalid credentials' });
        }

        if(user.password !== password) {
            return res.status(401).redirect('/login').json({ message: 'Invalid credentials' });
        }

        if(!isPasswordValid) {
            return res.status(401).redirect('/login').json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.id }, 'secret', { expiresIn: '1h' });
        res.json({ token });
    }
    catch(err) {
        next(err)
    }
}

const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = users.find(u => u.email === email);
        if(existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }
        const newUser = { id: users.length + 1, name, email, password };
        users.push(newUser);
        res.status(201).redirect('/').json({ message: 'User registered successfully' });
    }
    catch(err) {
        next(err)
    }
}

const csrfProtection = (err, req, res, next) => {
    if (err.code !== "EBADCSRFTOKEN") return next(err);
    res.status(403).json({ message: "Invalid CSRF token" });
}

module.exports = {
    login,
    register,
    verifyToken,
    csrfProtection
}