import Discord from "discord.js";
const client = new Discord.Client();

require("dotenv-safe").config();

const main = async () => {
  client.on("ready", () => console.log("Logged in as " + client.user!.tag));

  client.login(process.env.DISCORD_TOKEN);
};

main().catch((err) => console.error(err));
