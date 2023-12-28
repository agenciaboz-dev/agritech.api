-- CreateTable
CREATE TABLE `Chat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Message` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `send` DATE NOT NULL,
    `text` VARCHAR(191) NULL,
    `audio` VARCHAR(191) NULL,
    `chatId` INTEGER NOT NULL,

    UNIQUE INDEX `Message_chatId_key`(`chatId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `birth` DATE NULL,
    `phone` VARCHAR(191) NULL,
    `image` TEXT NULL,
    `image64` VARCHAR(191) NULL,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `isAdmin` BOOLEAN NOT NULL DEFAULT false,
    `approved` BOOLEAN NOT NULL DEFAULT false,
    `rejected` VARCHAR(191) NULL,
    `office` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_cpf_key`(`cpf`),
    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `street` VARCHAR(191) NOT NULL,
    `district` VARCHAR(191) NOT NULL,
    `number` VARCHAR(191) NOT NULL,
    `cep` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `uf` VARCHAR(191) NOT NULL,
    `adjunct` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `tillageId` INTEGER NOT NULL,

    UNIQUE INDEX `Address_userId_key`(`userId`),
    UNIQUE INDEX `Address_tillageId_key`(`tillageId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Producer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cnpj` VARCHAR(191) NOT NULL,
    `contract` BOOLEAN NOT NULL DEFAULT false,
    `userid` INTEGER NOT NULL,
    `employeeId` INTEGER NOT NULL,
    `reportId` INTEGER NOT NULL,

    UNIQUE INDEX `Producer_cnpj_key`(`cnpj`),
    UNIQUE INDEX `Producer_userid_key`(`userid`),
    UNIQUE INDEX `Producer_employeeId_key`(`employeeId`),
    UNIQUE INDEX `Producer_reportId_key`(`reportId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tillage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `area` VARCHAR(191) NOT NULL,
    `owner` VARCHAR(191) NOT NULL,
    `ceo` VARCHAR(191) NOT NULL,
    `manager` VARCHAR(191) NULL,
    `agronomist` VARCHAR(191) NULL,
    `technician` VARCHAR(191) NULL,
    `pilot` VARCHAR(191) NULL,
    `others` VARCHAR(191) NULL,
    `commments` VARCHAR(191) NULL,
    `producerId` INTEGER NOT NULL,

    UNIQUE INDEX `Tillage_producerId_key`(`producerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Coordinate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `x` VARCHAR(191) NOT NULL,
    `y` VARCHAR(191) NOT NULL,
    `tillageId` INTEGER NOT NULL,

    UNIQUE INDEX `Coordinate_tillageId_key`(`tillageId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Gallery` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image` TEXT NULL,
    `tillageId` INTEGER NOT NULL,

    UNIQUE INDEX `Gallery_tillageId_key`(`tillageId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Employee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rg` VARCHAR(191) NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `relationship` VARCHAR(191) NOT NULL,
    `nationality` VARCHAR(191) NOT NULL,
    `voter_card` VARCHAR(191) NOT NULL,
    `work_card` VARCHAR(191) NOT NULL,
    `military` TEXT NULL,
    `residence` TEXT NOT NULL,
    `office` VARCHAR(191) NOT NULL DEFAULT '',
    `userid` INTEGER NOT NULL,
    `kitId` INTEGER NOT NULL,

    UNIQUE INDEX `Employee_rg_key`(`rg`),
    UNIQUE INDEX `Employee_userid_key`(`userid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bank` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `agency` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `account` VARCHAR(191) NOT NULL,
    `employeeId` INTEGER NOT NULL,

    UNIQUE INDEX `Bank_employeeId_key`(`employeeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Professional` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `department` VARCHAR(191) NOT NULL,
    `office` VARCHAR(191) NOT NULL,
    `admission` DATE NOT NULL,
    `salary` VARCHAR(191) NOT NULL,
    `work_time` TIME NOT NULL,
    `employeeId` INTEGER NOT NULL,

    UNIQUE INDEX `Professional_employeeId_key`(`employeeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Calendar` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `employeeId` INTEGER NOT NULL,
    `kitId` INTEGER NOT NULL,

    UNIQUE INDEX `Calendar_employeeId_key`(`employeeId`),
    UNIQUE INDEX `Calendar_kitId_key`(`kitId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Call` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `open` DATE NOT NULL,
    `finish` DATE NOT NULL,
    `kitId` INTEGER NOT NULL,
    `producerId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `Call_producerId_key`(`producerId`),
    UNIQUE INDEX `Call_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Stage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `date` DATE NOT NULL,
    `start` TIME NOT NULL,
    `finish` TIME NOT NULL,
    `duration` TIME NOT NULL,
    `comments` VARCHAR(191) NULL,
    `callId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Object` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `kitId` INTEGER NOT NULL,

    UNIQUE INDEX `Object_kitId_key`(`kitId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Report` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `callId` INTEGER NOT NULL,

    UNIQUE INDEX `Report_callId_key`(`callId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Operation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `service` VARCHAR(191) NOT NULL,
    `culture` VARCHAR(191) NOT NULL,
    `areaMap` VARCHAR(191) NOT NULL,
    `equipment` VARCHAR(191) NOT NULL,
    `model` VARCHAR(191) NOT NULL,
    `reportId` INTEGER NOT NULL,

    UNIQUE INDEX `Operation_reportId_key`(`reportId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Treatment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `product` VARCHAR(191) NOT NULL,
    `dosage` VARCHAR(191) NOT NULL,
    `reportId` INTEGER NOT NULL,

    UNIQUE INDEX `Treatment_reportId_key`(`reportId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Material` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `talhao` INTEGER NOT NULL,
    `area` DOUBLE NOT NULL,
    `product` INTEGER NOT NULL,
    `dosage` DOUBLE NOT NULL,
    `classification` VARCHAR(191) NOT NULL,
    `total` DOUBLE NOT NULL,
    `removed` VARCHAR(191) NOT NULL,
    `applied` VARCHAR(191) NOT NULL,
    `returned` VARCHAR(191) NOT NULL,
    `comments` VARCHAR(191) NOT NULL,
    `reportId` INTEGER NOT NULL,

    UNIQUE INDEX `Material_reportId_key`(`reportId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TechReport` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATE NOT NULL,
    `init` TIME NOT NULL,
    `finish` TIME NOT NULL,
    `comments` VARCHAR(191) NOT NULL,
    `reportId` INTEGER NOT NULL,

    UNIQUE INDEX `TechReport_reportId_key`(`reportId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Flight` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `temperature` DOUBLE NOT NULL,
    `humidity` DOUBLE NOT NULL,
    `wind_velocity` DOUBLE NOT NULL,
    `height` DOUBLE NOT NULL,
    `faixa` DOUBLE NOT NULL,
    `flight_velocity` DOUBLE NOT NULL,
    `tank_volume` DOUBLE NOT NULL,
    `rate` DOUBLE NOT NULL,
    `performance` DOUBLE NOT NULL,
    `techReportId` INTEGER NOT NULL,

    UNIQUE INDEX `Flight_techReportId_key`(`techReportId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ChatToUser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ChatToUser_AB_unique`(`A`, `B`),
    INDEX `_ChatToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_chatId_fkey` FOREIGN KEY (`chatId`) REFERENCES `Chat`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_tillageId_fkey` FOREIGN KEY (`tillageId`) REFERENCES `Tillage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Producer` ADD CONSTRAINT `Producer_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Producer` ADD CONSTRAINT `Producer_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Producer` ADD CONSTRAINT `Producer_reportId_fkey` FOREIGN KEY (`reportId`) REFERENCES `Report`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tillage` ADD CONSTRAINT `Tillage_producerId_fkey` FOREIGN KEY (`producerId`) REFERENCES `Producer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Coordinate` ADD CONSTRAINT `Coordinate_tillageId_fkey` FOREIGN KEY (`tillageId`) REFERENCES `Tillage`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Gallery` ADD CONSTRAINT `Gallery_tillageId_fkey` FOREIGN KEY (`tillageId`) REFERENCES `Tillage`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_kitId_fkey` FOREIGN KEY (`kitId`) REFERENCES `Kit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bank` ADD CONSTRAINT `Bank_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Professional` ADD CONSTRAINT `Professional_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Calendar` ADD CONSTRAINT `Calendar_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Calendar` ADD CONSTRAINT `Calendar_kitId_fkey` FOREIGN KEY (`kitId`) REFERENCES `Kit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Call` ADD CONSTRAINT `Call_kitId_fkey` FOREIGN KEY (`kitId`) REFERENCES `Kit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Call` ADD CONSTRAINT `Call_producerId_fkey` FOREIGN KEY (`producerId`) REFERENCES `Producer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Call` ADD CONSTRAINT `Call_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Stage` ADD CONSTRAINT `Stage_callId_fkey` FOREIGN KEY (`callId`) REFERENCES `Call`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Object` ADD CONSTRAINT `Object_kitId_fkey` FOREIGN KEY (`kitId`) REFERENCES `Kit`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Report` ADD CONSTRAINT `Report_callId_fkey` FOREIGN KEY (`callId`) REFERENCES `Call`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Operation` ADD CONSTRAINT `Operation_reportId_fkey` FOREIGN KEY (`reportId`) REFERENCES `Report`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Treatment` ADD CONSTRAINT `Treatment_reportId_fkey` FOREIGN KEY (`reportId`) REFERENCES `Report`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Material` ADD CONSTRAINT `Material_reportId_fkey` FOREIGN KEY (`reportId`) REFERENCES `Report`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TechReport` ADD CONSTRAINT `TechReport_reportId_fkey` FOREIGN KEY (`reportId`) REFERENCES `Report`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Flight` ADD CONSTRAINT `Flight_techReportId_fkey` FOREIGN KEY (`techReportId`) REFERENCES `TechReport`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ChatToUser` ADD CONSTRAINT `_ChatToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Chat`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ChatToUser` ADD CONSTRAINT `_ChatToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
