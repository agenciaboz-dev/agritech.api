-- DropForeignKey
ALTER TABLE `Call` DROP FOREIGN KEY `Call_kitId_fkey`;

-- AlterTable
ALTER TABLE `Call` MODIFY `kitId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Call` ADD CONSTRAINT `Call_kitId_fkey` FOREIGN KEY (`kitId`) REFERENCES `Kit`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
