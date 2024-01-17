-- AlterTable
ALTER TABLE `Call` MODIFY `comments` TEXT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `Material` MODIFY `comments` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `Stage` MODIFY `comments` TEXT NULL;

-- AlterTable
ALTER TABLE `TechReport` MODIFY `comments` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `Tillage` MODIFY `comments` TEXT NULL;
