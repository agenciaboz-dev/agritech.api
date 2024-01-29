/*
  Warnings:

  - You are about to drop the column `reportId` on the `Material` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Material` DROP FOREIGN KEY `Material_reportId_fkey`;

-- AlterTable
ALTER TABLE `Material` DROP COLUMN `reportId`;
