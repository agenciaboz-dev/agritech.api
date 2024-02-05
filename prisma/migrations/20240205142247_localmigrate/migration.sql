-- AlterTable
ALTER TABLE `call` MODIFY `comments` TEXT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `isManager` BOOLEAN NOT NULL DEFAULT false;
