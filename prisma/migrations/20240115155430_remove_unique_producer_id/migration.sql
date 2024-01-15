/*
  Warnings:

  - You are about to drop the column `producerId` on the `Call` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Call` DROP FOREIGN KEY `Call_producerId_fkey`;

-- AlterTable
ALTER TABLE `Call` DROP COLUMN `producerId`;
