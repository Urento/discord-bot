import { MikroORM } from "@mikro-orm/core";
import { CommandEntity } from "../entities/command.entity";

export class CommandHandler {
  orm: MikroORM;

  constructor(orm: MikroORM) {
    this.orm = orm;
  }

  async exists(command: string, serverID: string): Promise<boolean> {
    const commands = await this.orm.em.find(CommandEntity, {
      command: command,
      serverID: serverID,
    });

    // command does not exist for the given server
    if (commands.length <= 0) {
      return false;
    }

    // command does exist
    return true;
  }

  async create(
    command: string,
    serverID: string,
    prefix: string,
    response: string
  ) {
    const newCommand = await this.orm.em.create(CommandEntity, {
      command: command,
      serverID: serverID,
      prefix: prefix,
      response: response,
    });
    this.orm.em.persistAndFlush(newCommand);
  }

  async delete(id: number) {
    const command = new CommandEntity(id);
    await this.orm.em.removeAndFlush(command);
  }
}
