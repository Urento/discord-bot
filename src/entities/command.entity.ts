import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class CommandEntity {
  @Property({ type: "text" })
  serverID!: String;

  @PrimaryKey()
  prefix!: number;

  @Property({ type: "text" })
  command!: string;

  @Property({ type: "text" })
  response: string;

  @Property({ type: "date" })
  createdAt = new Date();

  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();
}
