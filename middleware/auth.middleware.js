const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Does not exist authorization" });
    }
    const decoder = jwt.verify(token, process.env.SECRET);
    req.user = decoder;
    next();
  } catch (error) {
    res.status(401).json({
      message: error.message || " Catch Does not exist authorization",
    });
  }
};
