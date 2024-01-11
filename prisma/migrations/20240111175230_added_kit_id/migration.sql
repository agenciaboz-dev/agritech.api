-- AlterTable
ALTER TABLE `Employee` ADD COLUMN `kitId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_kitId_fkey` FOREIGN KEY (`kitId`) REFERENCES `Kit`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
