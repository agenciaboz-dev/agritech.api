/*
  Warnings:

  - You are about to drop the column `userId` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `local_tillage` on the `Producer` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Producer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tillageId]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[employeeId]` on the table `Bank` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userid]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userid]` on the table `Producer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[employeeId]` on the table `Professional` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tillageId` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `account` to the `Bank` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employeeId` to the `Bank` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userid` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userid` to the `Producer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employeeId` to the `Professional` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Employee_userId_key` ON `Employee`;

-- DropIndex
DROP INDEX `Producer_userId_key` ON `Producer`;

-- AlterTable
ALTER TABLE `Address` ADD COLUMN `tillageId` INTEGER NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Bank` ADD COLUMN `account` VARCHAR(191) NOT NULL,
    ADD COLUMN `employeeId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Employee` DROP COLUMN `userId`,
    ADD COLUMN `userid` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Producer` DROP COLUMN `local_tillage`,
    DROP COLUMN `userId`,
    ADD COLUMN `userid` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Professional` ADD COLUMN `employeeId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Tillage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `area` VARCHAR(191) NOT NULL,
    `owner` VARCHAR(191) NOT NULL,
    `ceo` VARCHAR(191) NOT NULL,
    `manager` VARCHAR(191) NOT NULL,
    `agronomist` VARCHAR(191) NOT NULL,
    `technician` VARCHAR(191) NOT NULL,
    `others` VARCHAR(191) NOT NULL,
    `commments` VARCHAR(191) NOT NULL,
    `producerId` INTEGER NOT NULL,

    UNIQUE INDEX `Tillage_producerId_key`(`producerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Coordinate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `x` VARCHAR(191) NOT NULL,
    `y` VARCHAR(191) NOT NULL,
    `tillageId` INTEGER NOT NULL,

    UNIQUE INDEX `Coordinate_tillageId_key`(`tillageId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Gallery` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image` TEXT NULL,
    `tillageId` INTEGER NOT NULL,

    UNIQUE INDEX `Gallery_tillageId_key`(`tillageId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Address_userId_key` ON `Address`(`userId`);

-- CreateIndex
CREATE UNIQUE INDEX `Address_tillageId_key` ON `Address`(`tillageId`);

-- CreateIndex
CREATE UNIQUE INDEX `Bank_employeeId_key` ON `Bank`(`employeeId`);

-- CreateIndex
CREATE UNIQUE INDEX `Employee_userid_key` ON `Employee`(`userid`);

-- CreateIndex
CREATE UNIQUE INDEX `Producer_userid_key` ON `Producer`(`userid`);

-- CreateIndex
CREATE UNIQUE INDEX `Professional_employeeId_key` ON `Professional`(`employeeId`);

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Producer` ADD CONSTRAINT `Producer_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_tillageId_fkey` FOREIGN KEY (`tillageId`) REFERENCES `Tillage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bank` ADD CONSTRAINT `Bank_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Professional` ADD CONSTRAINT `Professional_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tillage` ADD CONSTRAINT `Tillage_producerId_fkey` FOREIGN KEY (`producerId`) REFERENCES `Producer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Coordinate` ADD CONSTRAINT `Coordinate_tillageId_fkey` FOREIGN KEY (`tillageId`) REFERENCES `Tillage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Gallery` ADD CONSTRAINT `Gallery_tillageId_fkey` FOREIGN KEY (`tillageId`) REFERENCES `Tillage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
