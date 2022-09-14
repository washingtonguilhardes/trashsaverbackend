import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitAppSettings1645135584542 implements MigrationInterface {
  name = 'InitAppSettings1645135584542';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "app_setting" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_10b1e1bf64917bdb640f8eedb31" DEFAULT NEWSEQUENTIALID(), "tenantId" nvarchar(255) NOT NULL, "path" nvarchar(255) NOT NULL, "description" nvarchar(255) NOT NULL, "value" nvarchar(255), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_56c23a694494d60c4cc22b55360" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_7a3107c45a2ece630c6a4833d84" DEFAULT getdate(), CONSTRAINT "PK_10b1e1bf64917bdb640f8eedb31" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "app_setting"`);
  }
}
