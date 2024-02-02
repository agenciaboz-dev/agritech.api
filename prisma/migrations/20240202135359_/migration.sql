/*
  Warnings:

  - You are about to drop the column `image64` on the `Kit` table. All the data in the column will be lost.
  - You are about to drop the column `image64` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Kit` DROP COLUMN `image64`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `image64`;
