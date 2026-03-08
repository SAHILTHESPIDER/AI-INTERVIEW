import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {

    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Token not found in cookies" });
    }

    const verifytoken = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.userId = verifytoken.userId

    next();

  } catch (error) {
    console.log("JWT Error:", error.message);

    return res
      .status(401)
      .json({ message: "Invalid or malformed token" });
  }
};

export default isAuth;