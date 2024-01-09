/*
  Warnings:

  - You are about to drop the column `tillageId` on the `Coordinate` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Coordinate` DROP FOREIGN KEY `Coordinate_tillageId_fkey`;

-- AlterTable
ALTER TABLE `Coordinate` DROP COLUMN `tillageId`;
