import { MigrationInterface, QueryRunner } from 'typeorm';

export class ExtendEntities1727861000000 implements MigrationInterface {
  name = 'ExtendEntities1727861000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS name varchar`);
    await queryRunner.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS role varchar NOT NULL DEFAULT 'USER'`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_users_role ON users(role)`);

    await queryRunner.query(`ALTER TABLE campaigns ADD COLUMN IF NOT EXISTS messageContent text`);
    await queryRunner.query(`ALTER TABLE campaigns ADD COLUMN IF NOT EXISTS recipientList jsonb DEFAULT '[]'::jsonb`);

    await queryRunner.query(`ALTER TABLE messages RENAME COLUMN "from" TO temp_from`);
    await queryRunner.query(`ALTER TABLE messages RENAME COLUMN "to" TO temp_to`);
    await queryRunner.query(`ALTER TABLE messages ADD COLUMN IF NOT EXISTS recipientPhone varchar`);
    await queryRunner.query(`UPDATE messages SET "recipientPhone" = COALESCE(temp_to, temp_from) WHERE "recipientPhone" IS NULL`);
    await queryRunner.query(`ALTER TABLE messages DROP COLUMN IF EXISTS temp_from`);
    await queryRunner.query(`ALTER TABLE messages DROP COLUMN IF EXISTS temp_to`);
    await queryRunner.query(`ALTER TABLE messages ALTER COLUMN recipientPhone SET NOT NULL`);

    await queryRunner.query(`ALTER TABLE messages ADD COLUMN IF NOT EXISTS sentAt timestamptz`);
    await queryRunner.query(`ALTER TABLE messages ADD COLUMN IF NOT EXISTS deliveredAt timestamptz`);
    await queryRunner.query(`ALTER TABLE messages ADD COLUMN IF NOT EXISTS readAt timestamptz`);
    await queryRunner.query(`ALTER TABLE messages ADD COLUMN IF NOT EXISTS repliedAt timestamptz`);
    await queryRunner.query(`ALTER TABLE messages ALTER COLUMN status TYPE varchar`);

    await queryRunner.query(`ALTER TABLE replies RENAME COLUMN "createdAt" TO "receivedAt"`);
    await queryRunner.query(`ALTER TABLE replies ADD COLUMN IF NOT EXISTS sentiment varchar`);

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS analytics (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "periodStart" timestamptz NOT NULL,
      "periodEnd" timestamptz NOT NULL,
      granularity varchar NOT NULL,
      "campaignId" varchar,
      "messagesSent" int NOT NULL DEFAULT 0,
      "messagesDelivered" int NOT NULL DEFAULT 0,
      "messagesRead" int NOT NULL DEFAULT 0,
      "repliesReceived" int NOT NULL DEFAULT 0,
      "createdAt" timestamptz NOT NULL DEFAULT now()
    )`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_analytics_period_start ON analytics("periodStart")`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_analytics_period_end ON analytics("periodEnd")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS analytics`);
    await queryRunner.query(`ALTER TABLE replies DROP COLUMN IF EXISTS sentiment`);
    await queryRunner.query(`ALTER TABLE replies RENAME COLUMN "receivedAt" TO "createdAt"`);
    await queryRunner.query(`ALTER TABLE messages DROP COLUMN IF EXISTS repliedAt`);
    await queryRunner.query(`ALTER TABLE messages DROP COLUMN IF EXISTS readAt`);
    await queryRunner.query(`ALTER TABLE messages DROP COLUMN IF EXISTS deliveredAt`);
    await queryRunner.query(`ALTER TABLE messages DROP COLUMN IF EXISTS sentAt`);
    await queryRunner.query(`ALTER TABLE messages DROP COLUMN IF EXISTS recipientPhone`);
    await queryRunner.query(`ALTER TABLE campaigns DROP COLUMN IF NOT EXISTS recipientList`);
    await queryRunner.query(`ALTER TABLE campaigns DROP COLUMN IF NOT EXISTS messageContent`);
    await queryRunner.query(`DROP INDEX IF EXISTS idx_users_role`);
    await queryRunner.query(`ALTER TABLE users DROP COLUMN IF EXISTS role`);
    await queryRunner.query(`ALTER TABLE users DROP COLUMN IF EXISTS name`);
  }
}
