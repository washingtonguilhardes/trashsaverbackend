import { MigrationInterface, QueryRunner } from 'typeorm';

export class CateogryGroupRel1654519796193 implements MigrationInterface {
  name = 'CateogryGroupRel1654519796193';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "category_group_relationship" ("guid" uniqueidentifier NOT NULL CONSTRAINT "DF_f89234c4112a209c0a60e231afd" DEFAULT NEWSEQUENTIALID(), "groupId" nvarchar(100) NOT NULL, "groupName" text NOT NULL, "categoryId" uniqueidentifier, CONSTRAINT "PK_f89234c4112a209c0a60e231afd" PRIMARY KEY ("guid"))`
    );
    await queryRunner.query(
      `ALTER TABLE "category_group_relationship" ADD CONSTRAINT "FK_5fc8aa0f17acebd76293b43bf01" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "category_group_relationship" DROP CONSTRAINT "FK_5fc8aa0f17acebd76293b43bf01"`
    );
    await queryRunner.query(`DROP TABLE "category_group_relationship"`);
  }
}
