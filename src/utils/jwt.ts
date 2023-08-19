import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../env";
import { IJwtEncode } from "../types";

export const signJwt = (arg0: IJwtEncode): string => {
  return jwt.sign(arg0, JWT_SECRET, { expiresIn: "7d" });
};

export const verifyJwt = (arg0: string): IJwtEncode => {
  try {
    const jwtData = jwt.verify(arg0, JWT_SECRET) as IJwtEncode;
    return jwtData;
  } catch (err) {
    return { _id: "" };
  }
};
