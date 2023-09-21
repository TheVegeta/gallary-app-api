import { DataSource } from "typeorm";
import { entityPath } from "./constant";
import { DB_CONNECTION } from "./env";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: DB_CONNECTION,
  synchronize: true,
  logging: true,
  entities: [entityPath],
  subscribers: [],
  migrations: [],
});
