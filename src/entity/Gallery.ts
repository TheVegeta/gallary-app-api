import { nanoid } from "nanoid";
import { Field, InputType, ObjectType } from "type-graphql";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user";

@InputType()
export class ICreateGallery {
  @Field({ nullable: true })
  _id?: string;

  @Field()
  @Column()
  image!: string;

  @Field()
  @Column()
  thumb!: string;

  @Field()
  @Column()
  medium!: string;
}

@Entity()
@ObjectType()
export class Gallery extends BaseEntity {
  @Field()
  @PrimaryColumn()
  _id!: string;

  @Field()
  @Column()
  image!: string;

  @Field()
  @Column()
  thumb!: string;

  @Field()
  @Column()
  medium!: string;

  @ManyToOne((type) => User, { nullable: true })
  createdBy!: User;

  @ManyToOne((type) => User, { nullable: true })
  updatedBy!: User;

  @Field(() => String)
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
