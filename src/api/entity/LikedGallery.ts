import { nanoid } from "nanoid";
import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  BeforeInsert,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { Gallery } from "./Gallery";
import { User } from "./user";

@Entity()
@ObjectType()
export class LikedGallery extends BaseEntity {
  @Field()
  @PrimaryColumn()
  _id!: string;

  @Field(() => Gallery, { nullable: true })
  @ManyToOne((type) => Gallery, { nullable: true })
  gallary!: Gallery;

  @ManyToOne((type) => User, { nullable: true })
  createdBy!: User;

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
