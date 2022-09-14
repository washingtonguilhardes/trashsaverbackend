import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFeaturedColumnInNotification1646859413290 implements MigrationInterface {
  name = 'AddFeaturedColumnInNotification1646859413290';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "notification" ADD "featured" bit`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "featured"`);
  }
}
