import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRelCatGroupCreateDate1654521701918 implements MigrationInterface {
  name = 'AddRelCatGroupCreateDate1654521701918';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "category_group_relationship" ADD "createdAt" datetime2 NOT NULL CONSTRAINT "DF_e2c0350653085e2f8d0922bbce1" DEFAULT getdate()`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "category_group_relationship" DROP CONSTRAINT "DF_e2c0350653085e2f8d0922bbce1"`
    );
    await queryRunner.query(
      `ALTER TABLE "category_group_relationship" DROP COLUMN "createdAt"`
    );
  }
}
