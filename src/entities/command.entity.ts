import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class CommandEntity {
  @PrimaryKey()
  id!: number;

  @Property({ type: "text" })
  serverID!: String;

  @Property()
  prefix!: String;

  @Property({ type: "text" })
  command!: string;

  @Property({ type: "text" })
  response!: string;

  @Property({ type: "date" })
  createdAt = new Date();

  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();

  constructor(id: number) {
    this.id = id;
  }
}
