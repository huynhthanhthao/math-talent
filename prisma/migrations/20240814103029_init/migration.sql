-- CreateTable
CREATE TABLE `AuthToken` (
    `accountId` VARCHAR(191) NOT NULL,
    `ip` VARCHAR(191) NULL,
    `userAgent` VARCHAR(191) NULL,
    `lastLogin` DATETIME(3) NULL,
    `refreshToken` VARCHAR(191) NOT NULL,
    `deviceId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `AuthToken_deviceId_key`(`deviceId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AuthToken` ADD CONSTRAINT `AuthToken_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `Account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
