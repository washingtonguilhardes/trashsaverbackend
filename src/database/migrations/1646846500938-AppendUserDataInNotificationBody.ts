import { MigrationInterface, QueryRunner } from 'typeorm';

export class AppendUserDataInNotificationBody1646846500938 implements MigrationInterface {
  name = 'AppendUserDataInNotificationBody1646846500938';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "notification" ADD "description" ntext`);
    await queryRunner.query(
      `ALTER TABLE "notification" ADD "createByUserId" nvarchar(255)`
    );
    await queryRunner.query(
      `ALTER TABLE "notification" ADD "createByUserName" nvarchar(255)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "createByUserName"`);
    await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "createByUserId"`);
    await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "description"`);
  }
}
