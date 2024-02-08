/*
  Warnings:

  - You are about to drop the column `hectarePrice` on the `Producer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Producer` DROP COLUMN `hectarePrice`;

-- AlterTable
ALTER TABLE `Tillage` ADD COLUMN `hectarePrice` DOUBLE NULL;
