/*
  Warnings:

  - You are about to drop the column `kitId` on the `Object` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Object` DROP FOREIGN KEY `Object_kitId_fkey`;

-- AlterTable
ALTER TABLE `Object` DROP COLUMN `kitId`;
