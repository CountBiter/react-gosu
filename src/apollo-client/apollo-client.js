import {
  ApolloClient,
  InMemoryCache

} from "@apollo/client";

export const Client = new ApolloClient({
  uri: "http://192.168.31.207:3000/graphql",
  cache: new InMemoryCache(),
});

