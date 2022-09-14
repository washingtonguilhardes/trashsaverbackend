import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddResultsByUser1647517497619 implements MigrationInterface {
  name = 'AddResultsByUser1647517497619';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "notification_delivery_status" ADD "resultsByUser" ntext`
    );
    await queryRunner.query(
      `ALTER TABLE "user_notification_control" ADD "userName" nvarchar(255)`
    );
    await queryRunner.query(`ALTER TABLE "user_notification_control" ADD "received" bit`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_notification_control" DROP COLUMN "received"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_notification_control" DROP COLUMN "userName"`
    );
    await queryRunner.query(
      `ALTER TABLE "notification_delivery_status" DROP COLUMN "resultsByUser"`
    );
  }
}
