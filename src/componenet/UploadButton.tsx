import { Button, Flex, Text } from "@chakra-ui/react";
import cogoToast from "cogo-toast";
import * as nsfwjs from "nsfwjs";
import { ChangeEvent, FC, createRef, memo, useState } from "react";
import isEqual from "react-fast-compare";
import { CgAdd } from "react-icons/cg";
import AuthModal from "../componenet/auth/AuthModal";
import { useAddOrUpdateGallaryMutation } from "../generated/graphql";
import { useAppState } from "../store";
import { ImgbbResponse } from "../types";

const chekcIsNsfw = (probability: number): boolean =>
  probability * 100 > 40 ? true : false;

const UploadButton: FC<{ reFetchData: () => Promise<void> }> = memo(
  ({ reFetchData }) => {
    const [isAuthModal, setIsAuthModal] = useState<boolean>(false);
    const { isAuth } = useAppState((item) => item.userInfo);
    const inputRef = createRef<HTMLInputElement | undefined>();
    const [createGallery] = useAddOrUpdateGallaryMutation();
    const [isImageProcessing, setIsImageProcessing] = useState(false);

    const toggleAuthModal = () => {
      setIsAuthModal((item) => !item);
    };

    const handleChange = async () => {
      if (isAuth) {
        inputRef.current?.click();
      } else {
        toggleAuthModal();
      }
    };

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
      setIsImageProcessing(true);

      const fileArray = Array.from(e.target.files || []);

      if (fileArray.length !== 0) {
        const imgFile = fileArray[0];
        if (imgFile.type.includes("image")) {
          const imgElm = new Image();
          imgElm.crossOrigin = "anonymous";
          imgElm.src = URL.createObjectURL(imgFile);
          imgElm.onload = async () => {
            const nsfwLoadedResult = await nsfwjs.load();

            const nswfResult = await nsfwLoadedResult!.classify(imgElm);

            const Porn = nswfResult.filter(
              (item) => item.className === "Porn"
            )[0];
            const Sexy = nswfResult.filter(
              (item) => item.className === "Sexy"
            )[0];
            const Hentai = nswfResult.filter(
              (item) => item.className === "Hentai"
            )[0];

            const isNsfw =
              chekcIsNsfw(Porn.probability) ||
              chekcIsNsfw(Sexy.probability) ||
              chekcIsNsfw(Hentai.probability);

            if (isNsfw) {
              cogoToast.error(
                "Select a picture that is appropriate for a family."
              );
              setIsImageProcessing(false);
            } else {
              const form = new FormData();
              form.set("key", process.env.NEXT_PUBLIC_IMGBB_API!);
              form.append(
                "image",
                new File(
                  [imgFile.slice(0, imgFile.size, "image/png")],
                  String(
                    Date.now().toString(32) + Math.random().toString(16)
                  ).replace(/\./g, ""),
                  { type: imgFile.type }
                )
              );

              try {
                const res = await fetch("https://api.imgbb.com/1/upload", {
                  method: "POST",
                  body: form,
                });

                const jsonData: ImgbbResponse = await res.json();

                if (jsonData.success === true) {
                  const response = await createGallery({
                    variables: {
                      options: {
                        image:
                          jsonData.data?.image?.url ||
                          jsonData.data.display_url,
                        medium:
                          jsonData.data?.medium?.url ||
                          jsonData.data.display_url,
                        thumb:
                          jsonData.data?.thumb?.url ||
                          jsonData.data.display_url,
                      },
                    },
                  });

                  if (response.data?.AddOrUpdateGallary.success === true) {
                    cogoToast.success("Image uploaded successfully");
                    await reFetchData();
                    setIsImageProcessing(false);
                  } else {
                    cogoToast.error("Trouble uploading image to server");
                    setIsImageProcessing(false);
                  }
                } else {
                  cogoToast.error("Trouble uploading image to imgbb server");
                }
                setIsImageProcessing(false);
              } catch (err) {
                console.log(err);
                cogoToast.error("Trouble uploading image to imgbb server");
                setIsImageProcessing(false);
              }
            }
          };
        } else {
          cogoToast.error("Please select proper file type");
          setIsImageProcessing(false);
        }
      } else {
        cogoToast.error("Please select file");
        setIsImageProcessing(false);
      }
    };

    return (
      <>
        <input
          //   @ts-ignore
          ref={inputRef}
          style={{ display: "none" }}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        <AuthModal isOpen={isAuthModal} toggle={toggleAuthModal} />
        <Flex
          alignItems="center"
          justifyContent="space-between"
          borderBottom="1px"
          pb="1"
          borderColor={"#c2c2c2"}
        >
          <Text fontWeight="bold" fontSize="lg">
            Gallery
          </Text>
          <Button
            onClick={handleChange}
            disabled={isImageProcessing}
            isLoading={isImageProcessing}
            loadingText="Loading..."
          >
            <CgAdd />
            <Text ml="2">Upload</Text>
          </Button>
        </Flex>
      </>
    );
  },
  isEqual
);

export default UploadButton;
