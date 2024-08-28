/*
  Warnings:

  - You are about to drop the column `accountId` on the `authtoken` table. All the data in the column will be lost.
  - Added the required column `userId` to the `AuthToken` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `authtoken` DROP FOREIGN KEY `AuthToken_accountId_fkey`;

-- AlterTable
ALTER TABLE `authtoken` DROP COLUMN `accountId`,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `AuthToken` ADD CONSTRAINT `AuthToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
