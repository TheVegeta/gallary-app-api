import { useEffect, useState } from "react";
import ImageGallary from "../componenet/ImageGallary";
import LayoutProvider from "../componenet/LayoutProvider";
import {
  GetAllGalleryQuery,
  useGetMyAllLikedGalleryQuery,
} from "../generated/graphql";

const MyLikes = () => {
  const { data } = useGetMyAllLikedGalleryQuery();
  const [imageGallery, setImageGallery] = useState<
    GetAllGalleryQuery["getAllGallery"]
  >([]);

  useEffect(() => {
    const tempArr: GetAllGalleryQuery["getAllGallery"] = [];

    data?.getMyAllLikedGallery
      .filter((v, i, a) => a.findIndex((v2) => v2._id === v._id) === i)
      .map((item) => {
        if (item.gallary) {
          tempArr.push(item.gallary);
        }
      });

    setImageGallery(tempArr);
  }, [data]);

  return (
    <LayoutProvider>
      <ImageGallary data={imageGallery} />
    </LayoutProvider>
  );
};

export default MyLikes;
