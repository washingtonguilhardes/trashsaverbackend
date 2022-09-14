import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitSystemInfo1660616073975 implements MigrationInterface {
  name = 'InitSystemInfo1660616073975';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "system_info" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_b0c31720cc7fe00ce9116ac7606" DEFAULT NEWSEQUENTIALID(), "title" ntext NOT NULL, "description" ntext, "active" bit, "public" bit, "datasource" ntext NOT NULL, "type" nvarchar(255) CONSTRAINT CHK_d339007981c2cda68119c46d53_ENUM CHECK(type IN ('ghr','sigajus','ouvidoria','pje')) NOT NULL, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_e98d121399b135fc1fb0c1c5808" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_68f1c8cb36f232524daabaa8fca" DEFAULT getdate(), CONSTRAINT "PK_b0c31720cc7fe00ce9116ac7606" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "system_info"`);
  }
}
