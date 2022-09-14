import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitUserListTable1647899402365 implements MigrationInterface {
  name = 'InitUserListTable1647899402365';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_notification_list" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_56635da50bcecf9140ce8fe46ac" DEFAULT NEWSEQUENTIALID(), "userId" nvarchar(255) NOT NULL, "listKey" nvarchar(255) NOT NULL, "listName" nvarchar(255) NOT NULL, CONSTRAINT "UQ_f0505b6ce7a1e5e0d3a9cf8118d" UNIQUE ("listKey"), CONSTRAINT "PK_56635da50bcecf9140ce8fe46ac" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "user_notification_list_notifications_notification" ("userNotificationListId" uniqueidentifier NOT NULL, "notificationId" uniqueidentifier NOT NULL, CONSTRAINT "PK_cad80c45f824a433ba52c6f3a24" PRIMARY KEY ("userNotificationListId", "notificationId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1282a42f6416a38dbddba42781" ON "user_notification_list_notifications_notification" ("userNotificationListId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_06aa19c74cb6434fa3451c6f3d" ON "user_notification_list_notifications_notification" ("notificationId") `
    );
    await queryRunner.query(
      `ALTER TABLE "user_notification_list" ADD "createdAt" datetime2 NOT NULL CONSTRAINT "DF_d555bfc394df45f1433eaa3d5cc" DEFAULT getdate()`
    );
    await queryRunner.query(
      `ALTER TABLE "user_notification_list" ADD "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_922401050f4861dfd6d2fe2bc31" DEFAULT getdate()`
    );
    await queryRunner.query(
      `ALTER TABLE "user_notification_list" DROP CONSTRAINT "UQ_f0505b6ce7a1e5e0d3a9cf8118d"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_notification_list_notifications_notification" ADD CONSTRAINT "FK_1282a42f6416a38dbddba42781a" FOREIGN KEY ("userNotificationListId") REFERENCES "user_notification_list"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "user_notification_list_notifications_notification" ADD CONSTRAINT "FK_06aa19c74cb6434fa3451c6f3df" FOREIGN KEY ("notificationId") REFERENCES "notification"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_notification_list_notifications_notification" DROP CONSTRAINT "FK_06aa19c74cb6434fa3451c6f3df"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_notification_list_notifications_notification" DROP CONSTRAINT "FK_1282a42f6416a38dbddba42781a"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_notification_list" ADD CONSTRAINT "UQ_f0505b6ce7a1e5e0d3a9cf8118d" UNIQUE ("listKey")`
    );
    await queryRunner.query(
      `ALTER TABLE "user_notification_list" DROP CONSTRAINT "DF_922401050f4861dfd6d2fe2bc31"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_notification_list" DROP COLUMN "updatedAt"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_notification_list" DROP CONSTRAINT "DF_d555bfc394df45f1433eaa3d5cc"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_notification_list" DROP COLUMN "createdAt"`
    );
    await queryRunner.query(
      `DROP INDEX "IDX_06aa19c74cb6434fa3451c6f3d" ON "user_notification_list_notifications_notification"`
    );
    await queryRunner.query(
      `DROP INDEX "IDX_1282a42f6416a38dbddba42781" ON "user_notification_list_notifications_notification"`
    );
    await queryRunner.query(
      `DROP TABLE "user_notification_list_notifications_notification"`
    );
    await queryRunner.query(`DROP TABLE "user_notification_list"`);
  }
}
