import bcryptjs from "bcryptjs";

import { AuthUsers } from "../../models";
import { generateToken, message } from "../../utils";
import { MessageEnum } from "./enum";

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return message(res, MessageEnum.ALL_FIELDS_REQUIRED, 401);
  }

  const user = await AuthUsers.findOne({ email });

  if (!user) {
    return message(res, MessageEnum.USER_NOR_FOUND, 400);
  }

  const isPasswordMatch = await bcryptjs.compare(password, user.password);

  if (!isPasswordMatch) {
    return message(res, MessageEnum.PASSWORD_NOT_MATCH, 400);
  }

  // @ts-ignore
  const token = generateToken(user._id as string);

  return message(res, MessageEnum.LOGIN_SUCCESS, 201, {
    _id: user._id,
    email: user.email,
    token: token,
  });
};
