import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitTrashShare1663210144013 implements MigrationInterface {
  name = 'InitTrashShare1663210144013';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "trash_share" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_b66cffbb526dab7a49bf9de0b58" DEFAULT NEWSEQUENTIALID(), "trashType" nvarchar(255) NOT NULL, "trashTypeDescription" text, "intendedDay" int NOT NULL, "occursEvery" nvarchar(255) NOT NULL, "userId" uniqueidentifier, "addressId" uniqueidentifier, CONSTRAINT "PK_b66cffbb526dab7a49bf9de0b58" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "trash_share" ADD CONSTRAINT "FK_c1909090ccc3f5ebceb62dcd66d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "trash_share" ADD CONSTRAINT "FK_36ba915e002d14943dc210e4be1" FOREIGN KEY ("addressId") REFERENCES "user_address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "trash_share" DROP CONSTRAINT "FK_36ba915e002d14943dc210e4be1"`
    );
    await queryRunner.query(
      `ALTER TABLE "trash_share" DROP CONSTRAINT "FK_c1909090ccc3f5ebceb62dcd66d"`
    );
    await queryRunner.query(`DROP TABLE "trash_share"`);
  }
}
