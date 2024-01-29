/*
  Warnings:

  - You are about to drop the column `image` on the `Gallery` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Gallery` DROP COLUMN `image`;

-- CreateTable
CREATE TABLE `GalleryImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `galleryId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `GalleryImage` ADD CONSTRAINT `GalleryImage_galleryId_fkey` FOREIGN KEY (`galleryId`) REFERENCES `Gallery`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
