/*
  Warnings:

  - You are about to drop the column `kitId` on the `Employee` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Employee` DROP FOREIGN KEY `Employee_kitId_fkey`;

-- AlterTable
ALTER TABLE `Employee` DROP COLUMN `kitId`;
