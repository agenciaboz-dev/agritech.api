-- DropForeignKey
ALTER TABLE `Calendar` DROP FOREIGN KEY `Calendar_employeeId_fkey`;

-- AlterTable
ALTER TABLE `Calendar` MODIFY `employeeId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Calendar` ADD CONSTRAINT `Calendar_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
