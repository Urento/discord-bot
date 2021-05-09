import { Migration } from "@mikro-orm/migrations";

export class Migration20210509101815 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "command_entity" ("id" serial primary key, "server_id" text not null, "prefix" varchar(255) not null, "command" text not null, "response" text not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);'
    );
  }
}
