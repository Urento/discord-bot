import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { CommandEntity } from "./entities/command.entity";

require("dotenv-safe").config();

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
    disableForeignKeys: false,
  },
  entities: [CommandEntity],
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  type: "postgresql",
  debug: true,
} as Parameters<typeof MikroORM.init>[0];
