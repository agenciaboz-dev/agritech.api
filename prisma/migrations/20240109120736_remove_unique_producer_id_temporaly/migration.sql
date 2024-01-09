/*
  Warnings:

  - You are about to drop the column `producerId` on the `Tillage` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Tillage` DROP FOREIGN KEY `Tillage_producerId_fkey`;

-- AlterTable
ALTER TABLE `Tillage` DROP COLUMN `producerId`;
