import genToken from "../Config/token.js";
import User from "../models/User.model.js";

export const Googleauth = async (req, res) => {
  try {
    const { name, email } = req.body;

    let existingUser = await User.findOne({ email });

    if (!existingUser) {
      existingUser = await User.create({
        name,
        email,
      });
    }

    const token = await genToken(existingUser._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json(existingUser);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Google auth error: ${error.message}` });
  }
};

export const googlelogout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Logout error: ${error.message}` });
  }
};