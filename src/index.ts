import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import Discord from "discord.js";
import mikroOrmConfig from "./mikro-orm.config";
import { CommandEntity } from "./entities/command.entity";
import { CommandHandler } from "./command/command.handler";
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
    if (msg.author.bot) return;
    if (!msg.content.startsWith("!")) return;
    if (msg.member?.hasPermission("MANAGE_ROLES")) {
      if (msg.content.includes("!command create")) {
        const split = msg.content.split(" ");
        const commandHandler = new CommandHandler(orm);
        const cmd = split[2];
        /**
         * Check if command has the right amount of arguments
         */
        if (cmd === undefined) {
          msg.reply("Usage: !command create COMMAND");
          return;
        }
        /**
         * Check if the Command already eixst
         */
        if (await commandHandler.exists(cmd, msg.guild!.id)) {
          msg.reply(cmd + " does already exist");
          return;
        }
        msg.reply(
          "Write the Response of the Command now! (You have 30 Seconds from now)"
        );

        let filter = (m: { author: { id: string } }) =>
          m.author.id === msg.author.id;

        msg.channel
          .awaitMessages(filter, {
            max: 1,
            time: 30000,
            errors: ["time"],
          })
          .then((message) => {
            const message1 = message.first();

            commandHandler.create(cmd, msg.guild!.id, "!", message1!.content);
            msg.reply(
              "Successfully created the Command " +
                cmd +
                " with Response " +
                message1!.content
            );
          })
          .catch((err) => msg.reply("Error while creating command:" + err));
        return;
      }
    }

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
