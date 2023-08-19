import bcrypt from "bcrypt";
import _ from "lodash";
import { Arg, Mutation, Resolver } from "type-graphql";
import { ICreateUser, User } from "../entity/user";
import { IAuthResponse } from "../types";
import { signJwt } from "../utils/jwt";

@Resolver()
export class UserResolver {
  @Mutation(() => IAuthResponse)
  async registerUser(
    @Arg("options") options: ICreateUser
  ): Promise<IAuthResponse> {
    const { hash, username } = options;

    const trimUsername = _.trim(_.toLower(username));

    const findUser = await User.findOne({
      where: { username: trimUsername },
    });

    if (findUser) {
      return {
        success: false,
        jwt: "",
        msg: "username alrady exist",
        username: "",
      };
    } else {
      const newUser = new User();
      newUser.username = trimUsername;
      newUser.hash = await bcrypt.hash(hash, 8);
      await newUser.save();

      return {
        success: true,
        msg: "user created successfully",
        jwt: signJwt({ _id: newUser._id }),
        username: trimUsername,
      };
    }
  }

  @Mutation(() => IAuthResponse)
  async authUser(@Arg("options") options: ICreateUser): Promise<IAuthResponse> {
    const { hash, username } = options;

    const trimUsername = _.trim(_.toLower(username));

    const findUser = await User.findOne({
      where: { username: trimUsername },
    });

    if (findUser) {
      const isPasswordValid = await bcrypt.compare(hash, findUser.hash);

      if (isPasswordValid) {
        return {
          success: true,
          jwt: signJwt({ _id: findUser._id }),
          msg: "authenticated successfully",
          username: trimUsername,
        };
      } else {
        return {
          success: false,
          jwt: "",
          msg: "invalid login errors",
          username: "",
        };
      }
    } else {
      return {
        success: false,
        jwt: "",
        msg: "invalid login errors",
        username: "",
      };
    }
  }
}
