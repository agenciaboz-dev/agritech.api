/*
  Warnings:

  - Added the required column `hectareDay` to the `Kit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Kit` ADD COLUMN `hectareDay` DOUBLE NOT NULL;
