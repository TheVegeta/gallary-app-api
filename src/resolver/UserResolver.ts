import { Mutation, Resolver } from "type-graphql";
import { IAuthResponse } from "../types";

@Resolver()
export class UserResolver {
  @Mutation(() => IAuthResponse)
  async registerUser() {}
}
