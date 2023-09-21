import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import LayoutProvider from "../componenet/LayoutProvider";
import UploadButton from "../componenet/UploadButton";
import {
  GetAllGalleryQuery,
  useGetAllGalleryQuery,
} from "../generated/graphql";

const ImageGallary = dynamic(() => import("../componenet/ImageGallary"), {
  ssr: false,
});

const index = () => {
  const [pageNo, setPageNo] = useState(0);
  const [imageGallery, setImageGallery] = useState<
    GetAllGalleryQuery["getAllGallery"]
  >([]);

  const { data, refetch, previousData } = useGetAllGalleryQuery({
    variables: { pageNo },
  });

  useEffect(() => {
    refetch({ pageNo });
  }, [pageNo]);

  useEffect(() => {
    const allArr = [...imageGallery];

    if (data?.getAllGallery) {
      data.getAllGallery.map((item) => allArr.push(item));
    }

    setImageGallery(
      allArr.filter((v, i, a) => a.findIndex((v2) => v2._id === v._id) === i)
    );
  }, [data]);

  useEffect(() => {
    window.onscroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        if (previousData?.getAllGallery.length !== 0) {
          setPageNo((x) => x + 1);
        }
      }
    };
  }, []);

  const reFetchData = async () => {
    refetch({ pageNo });
  };

  return (
    <LayoutProvider>
      <UploadButton reFetchData={reFetchData} />
      <ImageGallary data={imageGallery} />
    </LayoutProvider>
  );
};

export default index;
