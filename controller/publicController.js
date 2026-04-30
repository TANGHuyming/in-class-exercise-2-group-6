
const { data } = require("../model/data")



exports.home = async (req, res, next) => { 
    try { 
        return res.JSON(data); 
    } catch (err) { 
        console.log(err); 
        next(err);
    }
}



exports.getRecords = async (req, res, next) => { 
    try { 
        return res.JSON(data); 
    } catch (err) { 
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