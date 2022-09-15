import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitUserData1663195055287 implements MigrationInterface {
  name = 'InitUserData1663195055287';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_cace4a159ff9f2512dd42373760" DEFAULT NEWSEQUENTIALID(), "externalId" text NOT NULL, "username" text NOT NULL, "useremail" text NOT NULL, "roles" ntext NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "user_address" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_302d96673413455481d5ff4022a" DEFAULT NEWSEQUENTIALID(), "way" nvarchar(255) NOT NULL, "neighborhood" nvarchar(255) NOT NULL, "name" nvarchar(255) NOT NULL, "city" nvarchar(255) NOT NULL, "province" nvarchar(255) NOT NULL, "country" nvarchar(255) NOT NULL, "userId" uniqueidentifier, CONSTRAINT "PK_302d96673413455481d5ff4022a" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "user_address" ADD CONSTRAINT "FK_1abd8badc4a127b0f357d9ecbc2" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_address" DROP CONSTRAINT "FK_1abd8badc4a127b0f357d9ecbc2"`
    );
    await queryRunner.query(`DROP TABLE "user_address"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
