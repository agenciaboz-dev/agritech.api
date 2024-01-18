-- AlterTable
ALTER TABLE `Call` ADD COLUMN `userId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Call` ADD CONSTRAINT `Call_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;