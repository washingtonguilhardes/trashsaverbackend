import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitTrashCollect1663266179781 implements MigrationInterface {
  name = 'InitTrashCollect1663266179781';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "trash_collect" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_3331af5eec27bcd043c01c65526" DEFAULT NEWSEQUENTIALID(), "trashCollectStatus" nvarchar(255) NOT NULL, "collectorId" uniqueidentifier, "shareInfoId" uniqueidentifier, CONSTRAINT "PK_3331af5eec27bcd043c01c65526" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "REL_97713ddae5a6fc663a189bfade" ON "trash_collect" ("shareInfoId") WHERE "shareInfoId" IS NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "trash_collect" ADD CONSTRAINT "FK_1a4cf31e49dd84eeedf5b76bfb1" FOREIGN KEY ("collectorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "trash_collect" ADD CONSTRAINT "FK_97713ddae5a6fc663a189bfadeb" FOREIGN KEY ("shareInfoId") REFERENCES "trash_share"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "trash_collect" DROP CONSTRAINT "FK_97713ddae5a6fc663a189bfadeb"`
    );
    await queryRunner.query(
      `ALTER TABLE "trash_collect" DROP CONSTRAINT "FK_1a4cf31e49dd84eeedf5b76bfb1"`
    );
    await queryRunner.query(
      `DROP INDEX "REL_97713ddae5a6fc663a189bfade" ON "trash_collect"`
    );
    await queryRunner.query(`DROP TABLE "trash_collect"`);
  }
}
