import {
  ApolloClient,
  ApolloProvider,
  from,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";
import cogoToast from "cogo-toast";
import { FC, memo, ReactNode } from "react";
import isEqual from "react-fast-compare";
import { useAppState } from "../store";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message }) => {
      if (message === "AUTH_ERROR") {
        cogoToast.error("AUTH_ERROR");
      } else {
        cogoToast.error("SOMETHING WENT WRONG ON SERVER");
      }
    });
  }

  if (networkError) {
    cogoToast.error("INTERNET ERROR");
  }
});

const AppProvider: FC<{ children: ReactNode }> = memo(({ children }) => {
  const {
    userInfo: { jwt },
  } = useAppState();

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: jwt || "",
      },
    };
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: from([
      errorLink,
      authLink.concat(
        createUploadLink({ uri: process.env.NEXT_PUBLIC_API_URL! as string })
      ),
    ]),
    headers: {
      authorization: jwt || "",
    },
    defaultOptions: {
      query: { fetchPolicy: "no-cache" },
      mutate: { fetchPolicy: "no-cache" },
      watchQuery: { fetchPolicy: "no-cache" },
    },
    ssrMode: true,
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}, isEqual);

export { AppProvider };
