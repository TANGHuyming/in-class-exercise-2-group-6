exports.login = (req, res) => {
    res.render('auth/login', {title: 'Login'});
}

exports.register = (req, res) => {
    res.render('auth/register', {title: 'Register'});
}

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).json({ message: "Logout failed" });
        res.clearCookie("user");
        res.json({ message: "Logout successful" });
    });

    res.redirect('/login');
}