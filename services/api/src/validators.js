import Joi from "joi";

const sessionsPostSchema = Joi.object().keys({
  data: Joi.string().required(),
});

export const sessionsPost = (object) => Joi.validate(object, sessionsPostSchema);
