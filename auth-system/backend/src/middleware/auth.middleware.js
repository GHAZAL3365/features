//validate token
// verify token
// docodded token
// call next to call other routes

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Access token missing",
      });
    }

    const token = authHeader.split(" ")[1]; // remove "Bearer"

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user = decoded; // attach user data to request

    next();
  } catch (err) {
    console.log("error: ", err.message);

    return res.status(500).json({
      message: "Something Went Wrong.",
    });
  }
};
