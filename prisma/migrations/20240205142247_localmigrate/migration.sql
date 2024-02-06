-- AlterTable
ALTER TABLE `Call` MODIFY `comments` TEXT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `isManager` BOOLEAN NOT NULL DEFAULT false;
