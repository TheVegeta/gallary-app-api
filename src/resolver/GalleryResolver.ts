import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Gallery, ICreateGallery } from "../entity/Gallery";
import { LikedGallery } from "../entity/LikedGallery";
import { isUser } from "../middleware";
import { IGetById, IStatusResponse, MyContext } from "../types";

@Resolver()
export class GalleryResolver {
  @Query(() => [Gallery])
  async getAllGallery(@Arg("pageNo") pgNo: number): Promise<Array<Gallery>> {
    return await Gallery.find({ skip: pgNo * 10, take: 10 });
  }

  @Query(() => [Gallery])
  @UseMiddleware([isUser])
  async getMyAllGallery(
    @Arg("pageNo") pgNo: number,
    @Ctx() { user }: MyContext
  ): Promise<Array<Gallery>> {
    return await Gallery.find({
      skip: pgNo * 10,
      take: 10,
      where: { createdBy: { _id: user._id } },
    });
  }

  @Query(() => [LikedGallery])
  @UseMiddleware([isUser])
  async getMyAllLikedGallery(
    @Ctx() { user }: MyContext
  ): Promise<Array<LikedGallery>> {
    return await LikedGallery.find({
      where: { createdBy: { _id: user._id } },
      relations: { createdBy: true },
    });
  }

  @Mutation(() => IStatusResponse)
  @UseMiddleware([isUser])
  async AddOrUpdateGallary(
    @Arg("options") options: ICreateGallery,
    @Ctx() { user }: MyContext
  ): Promise<IStatusResponse> {
    const { image, medium, thumb, _id } = options;

    if (_id) {
      try {
        const findGallary = await Gallery.findOneOrFail({
          where: { _id, createdBy: { _id: user._id } },
        });
        findGallary.image = image;
        findGallary.thumb = thumb;
        findGallary.medium = medium;
        findGallary.updatedBy = user;
        findGallary.save();

        return { success: true, msg: "gallery updated successfully", data: "" };
      } catch (err) {
        return {
          success: false,
          msg: "trouble updating gallery",
          data: "",
        };
      }
    } else {
      const newGallary = new Gallery();
      newGallary.image = image;
      newGallary.thumb = thumb;
      newGallary.medium = medium;
      newGallary.createdBy = user;
      newGallary.updatedBy = user;
      newGallary.save();

      return { success: true, msg: "gallery added successfully", data: "" };
    }
  }

  @Mutation(() => IStatusResponse)
  @UseMiddleware([isUser])
  async deleteGallary(
    @Arg("options") options: IGetById,
    @Ctx() { user }: MyContext
  ): Promise<IStatusResponse> {
    const { id } = options;

    const findGallary = await Gallery.findOneOrFail({
      where: { _id: id, createdBy: { _id: user._id } },
    });
    findGallary.updatedBy = user;
    findGallary.save();
    findGallary.softRemove();
    return { success: true, msg: "gallery deleted successfully", data: "" };
  }
}
