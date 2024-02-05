/*
  Warnings:

  - You are about to drop the column `tillageId` on the `Talhao` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Talhao` DROP FOREIGN KEY `Talhao_tillageId_fkey`;

-- AlterTable
ALTER TABLE `Talhao` DROP COLUMN `tillageId`;
