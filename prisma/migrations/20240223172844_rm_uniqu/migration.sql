/*
  Warnings:

  - You are about to drop the column `tillageId` on the `Gallery` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Gallery` DROP FOREIGN KEY `Gallery_tillageId_fkey`;

-- AlterTable
ALTER TABLE `Gallery` DROP COLUMN `tillageId`;
