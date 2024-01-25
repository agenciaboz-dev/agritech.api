/*
  Warnings:

  - You are about to drop the column `dosage` on the `Treatment` table. All the data in the column will be lost.
  - You are about to drop the column `product` on the `Treatment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Call` ADD COLUMN `totalPrice` DOUBLE NULL;

-- AlterTable
ALTER TABLE `Producer` ADD COLUMN `hectarePrice` DOUBLE NULL;

-- AlterTable
ALTER TABLE `Treatment` DROP COLUMN `dosage`,
    DROP COLUMN `product`;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `dosage` DOUBLE NOT NULL,
    `treatmentId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_treatmentId_fkey` FOREIGN KEY (`treatmentId`) REFERENCES `Treatment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
