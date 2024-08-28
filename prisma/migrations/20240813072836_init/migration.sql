/*
  Warnings:

  - You are about to drop the column `background` on the `project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `board` MODIFY `name` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `comment` MODIFY `message` TEXT NULL;

-- AlterTable
ALTER TABLE `label` MODIFY `name` TEXT NOT NULL,
    MODIFY `color` TEXT NULL;

-- AlterTable
ALTER TABLE `project` DROP COLUMN `background`,
    ADD COLUMN `backgroundUrl` TEXT NULL,
    MODIFY `name` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `subtask` MODIFY `description` TEXT NULL,
    MODIFY `isCompleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `task` MODIFY `name` TEXT NOT NULL,
    MODIFY `description` TEXT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `avatarUrl` TEXT NULL,
    MODIFY `jobTitle` TEXT NULL,
    MODIFY `department` TEXT NULL,
    MODIFY `organization` TEXT NULL,
    MODIFY `address` TEXT NULL;

-- AlterTable
ALTER TABLE `useroauth` MODIFY `accessToken` TEXT NOT NULL;

-- CreateTable
CREATE TABLE `AccountActivition` (
    `id` VARCHAR(191) NOT NULL,
    `token` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
