import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import Discord from "discord.js";
import mikroOrmConfig from "./mikro-orm.config";
import { CommandEntity } from "./entities/command.entity";
const client = new Discord.Client();

require("dotenv-safe").config();

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.getMigrator().up();

  /*const testCommand = orm.em.create(CommandEntity, {
    id: 324,
    command: "test",
    prefix: "!",
    serverID: "840556939829182504",
    response: "khjdfgnb",
  });
  await orm.em.persistAndFlush(testCommand);*/

  client.on("ready", () => console.log("Logged in as " + client.user!.tag));
  client.on("message", async (msg) => {
    const commands = await orm.em.find(CommandEntity, {
      serverID: msg.guild!.id,
    });
    for (const command of commands) {
      if (msg.content === command.prefix + command.command) {
        msg.reply(command.response);
      }
    }
  });

  client.login(process.env.DISCORD_TOKEN);
};

main().catch((err) => console.error(err));
