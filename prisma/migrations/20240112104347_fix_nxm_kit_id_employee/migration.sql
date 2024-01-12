/*
  Warnings:

  - You are about to drop the `_KitEmployee` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_KitEmployee` DROP FOREIGN KEY `_KitEmployee_A_fkey`;

-- DropForeignKey
ALTER TABLE `_KitEmployee` DROP FOREIGN KEY `_KitEmployee_B_fkey`;

-- DropTable
DROP TABLE `_KitEmployee`;

-- CreateTable
CREATE TABLE `_EmployeeToKit` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_EmployeeToKit_AB_unique`(`A`, `B`),
    INDEX `_EmployeeToKit_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_EmployeeToKit` ADD CONSTRAINT `_EmployeeToKit_A_fkey` FOREIGN KEY (`A`) REFERENCES `Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EmployeeToKit` ADD CONSTRAINT `_EmployeeToKit_B_fkey` FOREIGN KEY (`B`) REFERENCES `Kit`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
