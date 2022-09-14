import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBroadcastError1648074049262 implements MigrationInterface {
  name = 'AddBroadcastError1648074049262';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_notification_control" ADD "broadcastError" nvarchar(255)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_notification_control" DROP COLUMN "broadcastError"`
    );
  }
}
