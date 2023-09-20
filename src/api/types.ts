import { Request, Response } from "express";
import { Field, InputType, ObjectType } from "type-graphql";
import { User } from "./entity/user";

@InputType()
export class IGetById {
  @Field()
  id!: string;
}

@ObjectType()
export class IAuthResponse {
  @Field()
  success!: boolean;

  @Field()
  msg!: string;

  @Field()
  username!: string;

  @Field()
  jwt!: string;
}

@ObjectType()
export class IStatusResponse {
  @Field()
  success!: boolean;

  @Field()
  msg!: string;

  @Field()
  data!: string;
}

export interface IJwtEncode {
  _id: string;
}

export interface MyContext {
  req: Request;
  res: Response;
  user: User;
}
