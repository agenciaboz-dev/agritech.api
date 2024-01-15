-- AlterTable
ALTER TABLE `Call` ADD COLUMN `producerId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Call` ADD CONSTRAINT `Call_producerId_fkey` FOREIGN KEY (`producerId`) REFERENCES `Producer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
