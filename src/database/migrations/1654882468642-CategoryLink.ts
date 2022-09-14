import { MigrationInterface, QueryRunner } from 'typeorm';

export class CategoryLink1654882468642 implements MigrationInterface {
  name = 'CategoryLink1654882468642';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "link" DROP CONSTRAINT "FK_a14479e01fc313237fd9fc04f52"`
    );
    await queryRunner.query(
      `ALTER TABLE "link" ADD CONSTRAINT "FK_a14479e01fc313237fd9fc04f52" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "link" DROP CONSTRAINT "FK_a14479e01fc313237fd9fc04f52"`
    );
    await queryRunner.query(
      `ALTER TABLE "link" ADD CONSTRAINT "FK_a14479e01fc313237fd9fc04f52" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
