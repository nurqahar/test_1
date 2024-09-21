import User from "../models/userModel.mjs";
import authSchema from "../schema/auth.mjs";
import generateJWT from "../lib/jwt.mjs";
import loginSchema from "../schema/auth.mjs";

export const login = async (req, res) => {
  let validationResult;
  try {
    validationResult = loginSchema.validate(req.body);
  } catch (err) {
    const { message } = err;
    return res.status(400).json({ error: message });
  }

  const { error, value } = validationResult;
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const user = await User.getByEmailPassword(value);
    const auth = generateJWT({ user });

    return res.status(200).json(auth);
  } catch (err) {
    const { message } = err;
    return res.status(400).json({ error: message });
  }
};

export default login;
