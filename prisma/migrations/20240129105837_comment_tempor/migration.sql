/*
  Warnings:

  - You are about to drop the column `techReportId` on the `Flight` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Flight` DROP FOREIGN KEY `Flight_techReportId_fkey`;

-- AlterTable
ALTER TABLE `Flight` DROP COLUMN `techReportId`;
