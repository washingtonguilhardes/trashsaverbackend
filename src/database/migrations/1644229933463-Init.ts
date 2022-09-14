import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1644229933463 implements MigrationInterface {
  name = 'Init1644229933463';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "settings" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_0669fe20e252eb692bf4d344975" DEFAULT NEWSEQUENTIALID(), "tenant" nvarchar(255) NOT NULL, "token" text NOT NULL, "refreshToken" text NOT NULL, CONSTRAINT "PK_0669fe20e252eb692bf4d344975" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "category" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_9c4e4a89e3674fc9f382d733f03" DEFAULT NEWSEQUENTIALID(), "title" text NOT NULL, "tab" nvarchar(255) NOT NULL, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_c15e0393f5bebfb602fb0778972" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_a7f046d46350d4bc4aa0f7c113a" DEFAULT getdate(), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "file_object" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_1994186c0a6bafbb6ccc8bc1853" DEFAULT NEWSEQUENTIALID(), "fieldname" nvarchar(255) NOT NULL, "hash" text NOT NULL, "originalname" text NOT NULL, "encoding" nvarchar(255) NOT NULL, "mimetype" nvarchar(255) NOT NULL, "size" nvarchar(255) NOT NULL, "storageUrl" nvarchar(255), CONSTRAINT "PK_1994186c0a6bafbb6ccc8bc1853" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "link" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_26206fb7186da72fbb9eaa3fac9" DEFAULT NEWSEQUENTIALID(), "title" ntext NOT NULL, "href" ntext NOT NULL, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_5f66e43b97ceeb7d40ee3116ba0" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_8d4f2def879981a56403d75c894" DEFAULT getdate(), "categoryId" uniqueidentifier, "thumbnailId" uniqueidentifier, CONSTRAINT "PK_26206fb7186da72fbb9eaa3fac9" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "REL_2df8855f1d4bbcb6fd8e5b9197" ON "link" ("thumbnailId") WHERE "thumbnailId" IS NOT NULL`
    );
    await queryRunner.query(
      `CREATE TABLE "notification_delivery_status" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_b0ea4cdce1d084c41f9fd60e9b8" DEFAULT NEWSEQUENTIALID(), "chunkDate" datetime NOT NULL, "chunkKey" nvarchar(255) NOT NULL, "notificationId" uniqueidentifier NOT NULL, "status" nvarchar(255) NOT NULL, "error" bit, "errorMessage" nvarchar(255), "errorStack" text, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_fb4ebe315f48c93a02f3a1cae15" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_1ff868f38a7563726bde834a678" DEFAULT getdate(), CONSTRAINT "PK_b0ea4cdce1d084c41f9fd60e9b8" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "notification" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_705b6c7cdf9b2c2ff7ac7872cb7" DEFAULT NEWSEQUENTIALID(), "body" ntext NOT NULL, "groups" ntext NOT NULL, "title" ntext NOT NULL, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_b11a5e627c41d4dc3170f1d3703" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_489f2762db84e32ef4d1df3533a" DEFAULT getdate(), "dateOfAvailability" datetime NOT NULL, "avaliableUntil" datetime, "status" nvarchar(255) NOT NULL, "categoryId" uniqueidentifier, "thumbnailId" uniqueidentifier, CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "REL_c63a8e0400d0a5374bd2666da8" ON "notification" ("thumbnailId") WHERE "thumbnailId" IS NOT NULL`
    );
    await queryRunner.query(
      `CREATE TABLE "user_notification_control" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_f70227325877d395a31141b1db0" DEFAULT NEWSEQUENTIALID(), "notificationId" uniqueidentifier NOT NULL, "notificationTitle" nvarchar(255) NOT NULL, "userId" nvarchar(255) NOT NULL, "read" bit, "open" bit, "createdAd" datetime2 NOT NULL CONSTRAINT "DF_fb190a90546582411851ad888da" DEFAULT getdate(), "updatedAd" datetime2 NOT NULL CONSTRAINT "DF_4864d4a9810b235a08dea93e5d5" DEFAULT getdate(), CONSTRAINT "PK_f70227325877d395a31141b1db0" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "link" ADD CONSTRAINT "FK_a14479e01fc313237fd9fc04f52" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "link" ADD CONSTRAINT "FK_2df8855f1d4bbcb6fd8e5b91971" FOREIGN KEY ("thumbnailId") REFERENCES "file_object"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "notification" ADD CONSTRAINT "FK_12cd9d4d4fdf4809e346b540e81" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "notification" ADD CONSTRAINT "FK_c63a8e0400d0a5374bd2666da82" FOREIGN KEY ("thumbnailId") REFERENCES "file_object"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "notification" DROP CONSTRAINT "FK_c63a8e0400d0a5374bd2666da82"`
    );
    await queryRunner.query(
      `ALTER TABLE "notification" DROP CONSTRAINT "FK_12cd9d4d4fdf4809e346b540e81"`
    );
    await queryRunner.query(
      `ALTER TABLE "link" DROP CONSTRAINT "FK_2df8855f1d4bbcb6fd8e5b91971"`
    );
    await queryRunner.query(
      `ALTER TABLE "link" DROP CONSTRAINT "FK_a14479e01fc313237fd9fc04f52"`
    );
    await queryRunner.query(`DROP TABLE "user_notification_control"`);
    await queryRunner.query(
      `DROP INDEX "REL_c63a8e0400d0a5374bd2666da8" ON "notification"`
    );
    await queryRunner.query(`DROP TABLE "notification"`);
    await queryRunner.query(`DROP TABLE "notification_delivery_status"`);
    await queryRunner.query(`DROP INDEX "REL_2df8855f1d4bbcb6fd8e5b9197" ON "link"`);
    await queryRunner.query(`DROP TABLE "link"`);
    await queryRunner.query(`DROP TABLE "file_object"`);
    await queryRunner.query(`DROP TABLE "category"`);
    await queryRunner.query(`DROP TABLE "settings"`);
  }
}
