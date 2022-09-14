import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitUsersInNotification1644436068438 implements MigrationInterface {
  name = 'InitUsersInNotification1644436068438';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "notification" ADD "users" ntext`);

    await queryRunner.query(`ALTER TABLE "notification" ALTER COLUMN "groups" ntext`);

    await queryRunner.query(`ALTER TABLE "notification" ALTER COLUMN "groups" ntext`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "notification" ALTER COLUMN "groups" ntext NOT NULL`
    );

    await queryRunner.query(
      `ALTER TABLE "notification" ALTER COLUMN "groups" ntext NOT NULL`
    );

    await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "users"`);
  }
}
