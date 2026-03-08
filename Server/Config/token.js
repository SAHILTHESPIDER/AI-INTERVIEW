import jwt from "jsonwebtoken";

const genToken = (userId) => {
  try {

    const token = jwt.sign(
      { userId }, // payload
      process.env.JWT_Secret,
      { expiresIn: "2d" }
    );

    return token;

  } catch (error) {
    console.log(error);
  }
};

export default genToken;