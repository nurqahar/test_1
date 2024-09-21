import dotenv from "dotenv";
import jsonwebtoken from "jsonwebtoken";

dotenv.config();
function generateJWT({ user, expiresIn = "1d", algorithm = "HS256" }) {

  const { id } = user;
  const payload = {
    sub: id,
    iat: Date.now(),
  };

  const token = jsonwebtoken.sign(payload, process.env.SECRET, {
    expiresIn,
    algorithm,
  });

  return {
    token,
  };
}

export default generateJWT;
