/*
  Warnings:

  - Added the required column `cover` to the `Talhao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cover` to the `Tillage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Talhao` ADD COLUMN `cover` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `Tillage` ADD COLUMN `cover` TEXT NOT NULL;
