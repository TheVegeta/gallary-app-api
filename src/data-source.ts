import { DataSource } from "typeorm";
import { entityPath } from "./constant";
import { DB_NAME, DB_PASSWORD, DB_USERNAME } from "./env";

export const AppDataSource = new DataSource({
  type: "mysql",
  database: DB_NAME,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  synchronize: true,
  logging: true,
  entities: [entityPath],
  subscribers: [],
  migrations: [],
});
