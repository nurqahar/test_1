import Joi from "joi";

const userSchema = Joi.object({
  name: Joi.string().min(3).required(),
  price: Joi.number().positive().required(),
});

export default userSchema;
