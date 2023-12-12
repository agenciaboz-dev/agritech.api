-- AlterTable
ALTER TABLE `Tillage` ADD COLUMN `pilot` VARCHAR(191) NULL,
    MODIFY `manager` VARCHAR(191) NULL,
    MODIFY `agronomist` VARCHAR(191) NULL,
    MODIFY `technician` VARCHAR(191) NULL,
    MODIFY `others` VARCHAR(191) NULL,
    MODIFY `commments` VARCHAR(191) NULL;
