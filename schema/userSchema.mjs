import Joi from "joi";
const namePattern = /^[A-Za-z]+$/;
const phonePattern = /^(?:\+62|62|0)8[1-9][0-9]{6,9}$/;
const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const userSchema = Joi.object({
  firstName: Joi.string().pattern(namePattern).min(3).required(),
  lastName: Joi.string().pattern(namePattern).min(3).required(),
  phoneNumber: Joi.string().pattern(phonePattern).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(passwordPattern),
});
export default userSchema;
