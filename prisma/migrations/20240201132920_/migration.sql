/*
  Warnings:

  - You are about to drop the column `tillageId` on the `Call` table. All the data in the column will be lost.
  - Added the required column `talhaoId` to the `Coordinate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `talhaoId` to the `Gallery` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Call` DROP FOREIGN KEY `Call_tillageId_fkey`;

-- AlterTable
ALTER TABLE `Call` DROP COLUMN `tillageId`,
    ADD COLUMN `talhaoId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Coordinate` ADD COLUMN `talhaoId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Gallery` ADD COLUMN `talhaoId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Talhao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `area` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Coordinate` ADD CONSTRAINT `Coordinate_talhaoId_fkey` FOREIGN KEY (`talhaoId`) REFERENCES `Talhao`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Gallery` ADD CONSTRAINT `Gallery_talhaoId_fkey` FOREIGN KEY (`talhaoId`) REFERENCES `Talhao`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Call` ADD CONSTRAINT `Call_talhaoId_fkey` FOREIGN KEY (`talhaoId`) REFERENCES `Talhao`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
