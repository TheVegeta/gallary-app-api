import { useEffect, useState } from "react";
import ImageGallary from "../componenet/ImageGallary";
import LayoutProvider from "../componenet/LayoutProvider";
import {
  GetAllGalleryQuery,
  useGetMyAllGalleryQuery,
} from "../generated/graphql";

const MyGallery = () => {
  const { data } = useGetMyAllGalleryQuery();
  const [imageGallery, setImageGallery] = useState<
    GetAllGalleryQuery["getAllGallery"]
  >([]);

  useEffect(() => {
    const tempArr: GetAllGalleryQuery["getAllGallery"] = [];

    data?.getMyAllGallery
      .filter((v, i, a) => a.findIndex((v2) => v2._id === v._id) === i)
      .map((item) => {
        tempArr.push(item);
      });

    setImageGallery(tempArr);
  }, [data]);

  return (
    <LayoutProvider>
      <ImageGallary data={imageGallery} />
    </LayoutProvider>
  );
};

export default MyGallery;
