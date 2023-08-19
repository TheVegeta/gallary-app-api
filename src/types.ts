import { Field, ObjectType } from "type-graphql";

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
