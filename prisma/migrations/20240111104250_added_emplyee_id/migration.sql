-- AlterTable
ALTER TABLE `Producer` ADD COLUMN `employeeId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Producer` ADD CONSTRAINT `Producer_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
