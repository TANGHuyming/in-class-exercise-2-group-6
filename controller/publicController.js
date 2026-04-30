const { data } = require("../model/data")
const { getFuelSummaryContext } = require("../utils/fuelSummary");

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

exports.home = async (req, res, next) => { 
    try { 
        return res.JSON(data); 
    } catch (err) { 
        console.log(err); 
        next(err);
    }
}

exports.getRecords = (req, res, next) => { 
    try { 
        return res.render("dashboard/dashboard", getFuelSummaryContext(data)); 
    } catch (err) { 
        console.log(err); 
        next(err);
    }
}

exports.postRecords = (req, res, next) => {
    try { 
        const newRecord = req.body;
        data.push(newRecord);
        return res.redirect('/api/records'); 
    } catch (err) { 
        console.log(err); 
        next(err);
    }
}

exports.putRecords = (req, res, next) => {
    try { 
        const { id } = req.body;
        const recordIndex = data.findIndex((record) => record.id === id);
        if (recordIndex !== -1) {
            data[recordIndex] = { ...data[recordIndex], ...req.body };
        }
        return res.redirect('/api/records');
    }
    catch (err) {
        console.log(err); 
        next(err);
    }
}

exports.deleteRecords = (req, res, next) => {
    try { 
        const { id } = req.body;
        const recordIndex = data.findIndex((record) => record.id === id);
        if (recordIndex !== -1) {
            data.splice(recordIndex, 1);
        }
        return res.redirect('/api/records');
    }
    catch (err) {
        console.log(err); 
        next(err);
    }
}













exports.notFound = (req, res) => {
  const isAuthRoute =
    req.path.startsWith("/login") ||
    req.path.startsWith("/register");

  res.status(404).json({
    layout: isAuthRoute ? false : true,
    message: "The page you are looking for does not exist."
  });
}