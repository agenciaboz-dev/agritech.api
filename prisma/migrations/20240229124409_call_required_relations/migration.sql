/*
  Warnings:

  - Made the column `kitId` on table `Call` required. This step will fail if there are existing NULL values in that column.
  - Made the column `producerId` on table `Call` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Call` required. This step will fail if there are existing NULL values in that column.
  - Made the column `talhaoId` on table `Call` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Call` DROP FOREIGN KEY `Call_kitId_fkey`;

-- DropForeignKey
ALTER TABLE `Call` DROP FOREIGN KEY `Call_producerId_fkey`;

-- DropForeignKey
ALTER TABLE `Call` DROP FOREIGN KEY `Call_talhaoId_fkey`;

-- DropForeignKey
ALTER TABLE `Call` DROP FOREIGN KEY `Call_userId_fkey`;

-- AlterTable
ALTER TABLE `Call` MODIFY `kitId` INTEGER NOT NULL,
    MODIFY `producerId` INTEGER NOT NULL,
    MODIFY `userId` INTEGER NOT NULL,
    MODIFY `talhaoId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Call` ADD CONSTRAINT `Call_talhaoId_fkey` FOREIGN KEY (`talhaoId`) REFERENCES `Talhao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Call` ADD CONSTRAINT `Call_kitId_fkey` FOREIGN KEY (`kitId`) REFERENCES `Kit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Call` ADD CONSTRAINT `Call_producerId_fkey` FOREIGN KEY (`producerId`) REFERENCES `Producer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Call` ADD CONSTRAINT `Call_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
