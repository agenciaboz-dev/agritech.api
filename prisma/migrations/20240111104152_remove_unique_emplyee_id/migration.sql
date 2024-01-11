/*
  Warnings:

  - You are about to drop the column `employeeId` on the `Producer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Producer` DROP FOREIGN KEY `Producer_employeeId_fkey`;

-- AlterTable
ALTER TABLE `Producer` DROP COLUMN `employeeId`;
