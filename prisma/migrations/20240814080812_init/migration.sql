/*
  Warnings:

  - A unique constraint covering the columns `[oauthId]` on the table `UserOauth` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `UserOauth_oauthId_key` ON `UserOauth`(`oauthId`);
