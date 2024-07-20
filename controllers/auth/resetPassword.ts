import bcryptjs from "bcryptjs";

import { AuthUsers } from "../../models";
import { generateToken, message } from "../../utils";
import { MessageEnum } from "./enum";

export const resetPassword = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return message(res, MessageEnum.ALL_FIELDS_REQUIRED, 401);
  }

  const user = await AuthUsers.findOne({ email });

  if (!user) {
    return message(res, MessageEnum.USER_NOR_FOUND, 400);
  }

  const isPasswordMatch = await bcryptjs.compare(password, user.password);

  if (isPasswordMatch) {
    return message(res, MessageEnum.SAME_PASSWORD, 400);
  }

  const hashedPassword = await bcryptjs.hash(password, 12);

  await AuthUsers.updateOne(
    {
      email,
    },
    { $set: { password: hashedPassword } }
  );

  // @ts-ignore
  const token = generateToken(user._id as string);

  return message(res, MessageEnum.PASSWORD_RESET, 201, {
    _id: user._id,
    email: user.email,
    token: token,
  });
};
