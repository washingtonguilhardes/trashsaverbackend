import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitAccessControls1644232851426 implements MigrationInterface {
  name = 'InitAccessControls1644232851426';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_access_control" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_6a49f7cd3dd80e33d40ebbfb6ac" DEFAULT NEWSEQUENTIALID(), "userId" nvarchar(255) NOT NULL, "accessEnable" bit NOT NULL, "tenant" nvarchar(255) NOT NULL, "capability" nvarchar(255) NOT NULL, CONSTRAINT "PK_6a49f7cd3dd80e33d40ebbfb6ac" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user_access_control"`);
  }
}
