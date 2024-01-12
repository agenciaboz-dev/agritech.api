/*
  Warnings:

  - You are about to drop the column `kitId` on the `Employee` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Employee` DROP FOREIGN KEY `Employee_kitId_fkey`;

-- AlterTable
ALTER TABLE `Employee` DROP COLUMN `kitId`;

-- CreateTable
CREATE TABLE `_KitEmployee` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_KitEmployee_AB_unique`(`A`, `B`),
    INDEX `_KitEmployee_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_KitEmployee` ADD CONSTRAINT `_KitEmployee_A_fkey` FOREIGN KEY (`A`) REFERENCES `Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_KitEmployee` ADD CONSTRAINT `_KitEmployee_B_fkey` FOREIGN KEY (`B`) REFERENCES `Kit`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
