-- AlterTable
ALTER TABLE `Talhao` ADD COLUMN `tillageId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Talhao` ADD CONSTRAINT `Talhao_tillageId_fkey` FOREIGN KEY (`tillageId`) REFERENCES `Tillage`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
