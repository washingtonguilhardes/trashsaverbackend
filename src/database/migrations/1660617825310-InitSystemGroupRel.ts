import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitSystemGroupRel1660617825310 implements MigrationInterface {
  name = 'InitSystemGroupRel1660617825310';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "system_group_rel" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_6546e996944326fdc073c4d60f1" DEFAULT NEWSEQUENTIALID(), "systemGuid" uniqueidentifier NOT NULL, "groupName" ntext NOT NULL, "groupId" uniqueidentifier NOT NULL, "systemGuidId" uniqueidentifier, CONSTRAINT "PK_6546e996944326fdc073c4d60f1" PRIMARY KEY ("id"))`
    );

    await queryRunner.query(
      `ALTER TABLE "system_group_rel" ADD CONSTRAINT "FK_f74290d75cf14d54d7267e9652a" FOREIGN KEY ("systemGuidId") REFERENCES "system_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "system_group_rel" DROP CONSTRAINT "FK_f74290d75cf14d54d7267e9652a"`
    );
    await queryRunner.query(`DROP TABLE "system_group_rel"`);
  }
}
