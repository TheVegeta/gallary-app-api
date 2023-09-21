import { Link } from "@chakra-ui/next-js";
import {
  Box,
  Container,
  Grid,
  List,
  ListIcon,
  ListItem,
} from "@chakra-ui/react";
import cogoToast from "cogo-toast";
import { FC, ReactNode, memo } from "react";
import isEqual from "react-fast-compare";
import { CgBookmark, CgHeart } from "react-icons/cg";
import { useAppState } from "../store";

const LayoutProvider: FC<{ children: ReactNode }> = memo(({ children }) => {
  const {
    userInfo: { isAuth },
  } = useAppState();

  const handleRedirect = () => {
    if (isAuth === false) {
      cogoToast.warn("Please sing in");
    }
  };

  return (
    <>
      <Container maxW="container.lg">
        <Grid gridTemplateColumns="repeat(4, 1fr)" width="100%">
          <Box
            gridColumn={{ base: "span 1" }}
            display={{ base: "none", md: "block" }}
          >
            <List spacing={3}>
              <ListItem onClick={handleRedirect}>
                <Link href={isAuth ? "/my-gallery" : ""}>
                  <ListIcon as={CgBookmark} />
                  My Gallery
                </Link>
              </ListItem>
              <ListItem onClick={handleRedirect}>
                <Link href={isAuth ? "/my-likes" : ""}>
                  <ListIcon as={CgHeart} />
                  Favourite
                </Link>
              </ListItem>
            </List>
          </Box>
          <Box gridColumn={{ base: "span 4", md: "span 3" }}>{children}</Box>
        </Grid>
      </Container>
    </>
  );
}, isEqual);

export default LayoutProvider;
