import { nanoid } from "nanoid";
import { Field, InputType } from "type-graphql";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@InputType()
export class ICreateUser {
  @Field()
  username!: string;

  @Field()
  hash!: string;
}

@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryColumn()
  _id!: string;

  @Field()
  @Column()
  username!: string;

  @Field()
  @Column()
  hash!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;

  @BeforeInsert()
  setId() {
    this._id = nanoid(8);
  }
}
