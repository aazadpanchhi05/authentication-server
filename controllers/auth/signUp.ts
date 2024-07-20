import bcryptjs from "bcryptjs";

import { AuthUsers } from "../../models";
import { generateToken, message } from "../../utils";
import { MessageEnum } from "./enum";

export const signUp = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return message(res, MessageEnum.ALL_FIELDS_REQUIRED, 401);
  }

  const userExist = await AuthUsers.findOne({ email });

  if (userExist) {
    return message(res, MessageEnum.USER_EXIST, 400);
  }

  const user = await AuthUsers.create({
    email,
    password,
  });

  // @ts-ignore
  const token = generateToken(user._id as string);

  return message(res, MessageEnum.USER_CREATED, 201, {
    _id: user._id,
    email: user.email,
    token: token,
  });
};
