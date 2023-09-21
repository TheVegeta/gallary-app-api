import { Box, Button, Image } from "@chakra-ui/react";
import cogoToast from "cogo-toast";
import { FC, memo, useEffect, useState } from "react";
import isEqual from "react-fast-compare";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import {
  GetAllGalleryQuery,
  useAddFavouriteGalleryMutation,
  useGetMyAllLikedGalleryLazyQuery,
} from "../generated/graphql";
import { useAppState } from "../store";

const RenderImage: FC<{
  item: {
    __typename?: "Gallery" | undefined;
    _id: string;
    image: string;
    thumb: string;
    medium: string;
  };
  myLikedImage: Array<string>;
  reFetchLiked: VoidFunction;
}> = memo(({ item, myLikedImage, reFetchLiked }) => {
  const {
    userInfo: { isAuth },
  } = useAppState();
  const [addLike] = useAddFavouriteGalleryMutation();

  const handleToggleLike = async () => {
    if (isAuth) {
      const response = await addLike({ variables: { imageId: item._id } });
      cogoToast.success(response.data?.addFavouriteGallery.msg);
      reFetchLiked();
    } else {
      cogoToast.warn("Please sing in to like this image");
    }
  };

  return (
    <Box position="relative">
      <Button
        fontSize="xl"
        position="absolute"
        colorScheme="pink"
        onClick={handleToggleLike}
        borderRadius="0 50% 50% 0"
        p="0"
        color={myLikedImage.includes(item._id) ? "red.400" : "black"}
      >
        {myLikedImage.includes(item._id) ? <AiFillHeart /> : <AiOutlineHeart />}
      </Button>
      <Image
        key={item._id}
        w="100%"
        borderRadius="xl"
        mb={2}
        display="inline-block"
        src={item.medium}
        alt="Alt"
      />
    </Box>
  );
}, isEqual);

const ImageGallary: FC<{ data: GetAllGalleryQuery["getAllGallery"] }> = memo(
  ({ data }) => {
    const {
      userInfo: { isAuth },
    } = useAppState();
    const [myLikedImage, setMyLikedImage] = useState<Array<string>>([]);

    const [fetchData, { data: likedImage, refetch }] =
      useGetMyAllLikedGalleryLazyQuery();

    useEffect(() => {
      if (isAuth) {
        fetchData();
        refetch();
      }
    }, [isAuth]);

    useEffect(() => {
      if (isAuth) {
        const tempArr: Array<string> = [];

        likedImage?.getMyAllLikedGallery.map((item) => {
          tempArr.push(item.gallary?._id || "");
        });

        setMyLikedImage(tempArr);
      }
    }, [likedImage, isAuth]);

    return (
      <>
        <Box
          mt="3"
          w="100%"
          maxW="900px"
          mx="auto"
          bg="gray.800"
          sx={{ columnCount: [1, 2, 3], columnGap: "8px" }}
        >
          {data
            .sort((a, b) => {
              return (
                new Date(a.createdAt).valueOf() -
                new Date(b.createdAt).valueOf()
              );
            })
            .map((item) => (
              <RenderImage
                item={item}
                key={item._id}
                myLikedImage={myLikedImage}
                reFetchLiked={refetch}
              />
            ))}
        </Box>
      </>
    );
  },
  isEqual
);

export default ImageGallary;
