/*
  Warnings:

  - A unique constraint covering the columns `[inscricaoEstadual]` on the table `Producer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `inscricaoEstadual` to the `Producer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Producer` ADD COLUMN `inscricaoEstadual` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Producer_inscricaoEstadual_key` ON `Producer`(`inscricaoEstadual`);
