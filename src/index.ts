import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import Discord from "discord.js";
import mikroOrmConfig from "./mikro-orm.config";
const client = new Discord.Client();

require("dotenv-safe").config();

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.getMigrator().up();

  /*const testCommand = orm.em.create(CommandEntity, {
    id: 324,
    command: "test",
    prefix: "!",
    serverID: "123",
    response: "khjdfgnb",
  });
  await orm.em.persistAndFlush(testCommand);*/

  client.on("ready", () => console.log("Logged in as " + client.user!.tag));

  client.login(process.env.DISCORD_TOKEN);
};

main().catch((err) => console.error(err));
