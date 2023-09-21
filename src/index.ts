import "reflect-metadata";

import cors from "cors";
import express, { Request, Response } from "express";
import { parse } from "graphql";
import {
  getGraphQLParameters,
  processRequest,
  renderGraphiQL,
  sendResult,
  shouldRenderGraphiQL,
} from "graphql-helix";
import next from "next";
import { lru } from "tiny-lru";
import { buildSchema } from "type-graphql";
import { PORT } from "./api/env";
import { GalleryResolver } from "./api/resolver/GalleryResolver";
import { HelloResolver } from "./api/resolver/HelloResolver";
import { UserResolver } from "./api/resolver/UserResolver";

(async () => {
  const dev = process.env.NODE_ENV !== "production";

  const app = express();
  const cache = lru(1000, 3600000);

  const nextApp = next({ dev });
  const handle = nextApp.getRequestHandler();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const [schema] = await Promise.all([
    // AppDataSource.initialize(),
    buildSchema({
      resolvers: [HelloResolver, UserResolver, GalleryResolver],
      validate: false,
    }),
    nextApp.prepare(),
  ]);

  app.use("/graphql", async (req: Request, res: Response) => {
    const request = {
      body: req.body,
      headers: req.headers,
      method: req.method,
      query: req.query,
    };
    if (shouldRenderGraphiQL(request)) {
      res.send(renderGraphiQL());
    } else {
      const { operationName, query, variables } = getGraphQLParameters(request);

      const result = await processRequest({
        operationName,
        query,
        variables,
        request,
        schema,
        contextFactory: () => ({ req, res }),
        parse: (source, options) => {
          if (!cache.get(query)) {
            cache.set(query, parse(source, options));
          }
          return cache.get(query);
        },
      });

      sendResult(result, res);
    }
  });

  app.get("*", async (req, res) => {
    return handle(req, res);
  });

  app.listen(PORT, () => {
    console.log(`GraphQL server is running on port ${PORT}.`);
  });
})();
