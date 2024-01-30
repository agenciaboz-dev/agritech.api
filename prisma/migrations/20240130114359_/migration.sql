/*
  Warnings:

  - You are about to alter the column `totalPrice` on the `Call` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `areaMap` on the `Operation` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `hectarePrice` on the `Producer` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `Call` MODIFY `totalPrice` DOUBLE NULL;

-- AlterTable
ALTER TABLE `Operation` MODIFY `areaMap` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `Producer` MODIFY `hectarePrice` DOUBLE NULL;
