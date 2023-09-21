import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { AppNavbar } from "../componenet/AppNavbar";
import { AppProvider } from "../componenet/AppProvider";
import { theme } from "../componenet/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AppProvider>
        <AppNavbar />
        <Component {...pageProps} />
      </AppProvider>
    </ChakraProvider>
  );
}

export default MyApp;
