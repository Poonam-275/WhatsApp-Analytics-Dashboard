import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitSchema1727860000000 implements MigrationInterface {
  name = 'InitSchema1727860000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "users" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "email" varchar NOT NULL UNIQUE,
      "passwordHash" varchar NOT NULL,
      "isActive" boolean NOT NULL DEFAULT true,
      "createdAt" timestamptz NOT NULL DEFAULT now(),
      "updatedAt" timestamptz NOT NULL DEFAULT now()
    )`);

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "campaigns" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "name" varchar NOT NULL,
      "ownerId" uuid NOT NULL,
      "status" varchar NOT NULL DEFAULT 'draft',
      "scheduledAt" timestamptz,
      "createdAt" timestamptz NOT NULL DEFAULT now(),
      "updatedAt" timestamptz NOT NULL DEFAULT now(),
      CONSTRAINT fk_campaign_owner FOREIGN KEY ("ownerId") REFERENCES users(id)
    )`);

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "messages" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "externalId" varchar NOT NULL,
      "userId" uuid NOT NULL,
      "campaignId" uuid,
      "from" varchar NOT NULL,
      "to" varchar NOT NULL,
      "timestamp" timestamptz NOT NULL,
      "type" varchar NOT NULL,
      "status" varchar,
      "content" text,
      "createdAt" timestamptz NOT NULL DEFAULT now(),
      CONSTRAINT fk_message_user FOREIGN KEY ("userId") REFERENCES users(id),
      CONSTRAINT fk_message_campaign FOREIGN KEY ("campaignId") REFERENCES campaigns(id)
    )`);

    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_messages_externalId ON messages("externalId")`);

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "replies" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "messageId" uuid NOT NULL,
      "userId" uuid NOT NULL,
      "content" text NOT NULL,
      "createdAt" timestamptz NOT NULL DEFAULT now(),
      CONSTRAINT fk_reply_message FOREIGN KEY ("messageId") REFERENCES messages(id),
      CONSTRAINT fk_reply_user FOREIGN KEY ("userId") REFERENCES users(id)
    )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "replies"`);
    await queryRunner.query(`DROP INDEX IF EXISTS idx_messages_externalId`);
    await queryRunner.query(`DROP TABLE IF EXISTS "messages"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "campaigns"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "users"`);
  }
}
