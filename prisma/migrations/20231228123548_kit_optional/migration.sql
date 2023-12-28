-- DropForeignKey
ALTER TABLE `Address` DROP FOREIGN KEY `Address_tillageId_fkey`;

-- DropForeignKey
ALTER TABLE `Calendar` DROP FOREIGN KEY `Calendar_kitId_fkey`;

-- DropForeignKey
ALTER TABLE `Employee` DROP FOREIGN KEY `Employee_kitId_fkey`;

-- DropForeignKey
ALTER TABLE `Producer` DROP FOREIGN KEY `Producer_employeeId_fkey`;

-- DropForeignKey
ALTER TABLE `Producer` DROP FOREIGN KEY `Producer_reportId_fkey`;

-- AlterTable
ALTER TABLE `Address` MODIFY `tillageId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Calendar` MODIFY `kitId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Employee` MODIFY `kitId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Producer` MODIFY `employeeId` INTEGER NULL,
    MODIFY `reportId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_tillageId_fkey` FOREIGN KEY (`tillageId`) REFERENCES `Tillage`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Producer` ADD CONSTRAINT `Producer_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Producer` ADD CONSTRAINT `Producer_reportId_fkey` FOREIGN KEY (`reportId`) REFERENCES `Report`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_kitId_fkey` FOREIGN KEY (`kitId`) REFERENCES `Kit`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Calendar` ADD CONSTRAINT `Calendar_kitId_fkey` FOREIGN KEY (`kitId`) REFERENCES `Kit`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
