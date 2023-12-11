-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `birth` DATE NULL,
    `phone` VARCHAR(191) NULL,
    `image` TEXT NULL,
    `image64` VARCHAR(191) NULL,
    `isAdmin` BOOLEAN NOT NULL DEFAULT false,
    `approved` BOOLEAN NOT NULL DEFAULT false,
    `rejected` VARCHAR(191) NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_cpf_key`(`cpf`),
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

    UNIQUE INDEX `Employee_rg_key`(`rg`),
    UNIQUE INDEX `Employee_userid_key`(`userid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Producer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cnpj` VARCHAR(191) NOT NULL,
    `userid` INTEGER NOT NULL,

    UNIQUE INDEX `Producer_cnpj_key`(`cnpj`),
    UNIQUE INDEX `Producer_userid_key`(`userid`),
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
    `complement` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `Address_userId_key`(`userId`),
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
CREATE TABLE `Tillage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `area` VARCHAR(191) NOT NULL,
    `owner` VARCHAR(191) NOT NULL,
    `ceo` VARCHAR(191) NOT NULL,
    `manager` VARCHAR(191) NOT NULL,
    `agronomist` VARCHAR(191) NOT NULL,
    `technician` VARCHAR(191) NOT NULL,
    `others` VARCHAR(191) NOT NULL,
    `commments` VARCHAR(191) NOT NULL,
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

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Producer` ADD CONSTRAINT `Producer_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bank` ADD CONSTRAINT `Bank_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Professional` ADD CONSTRAINT `Professional_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tillage` ADD CONSTRAINT `Tillage_producerId_fkey` FOREIGN KEY (`producerId`) REFERENCES `Producer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Coordinate` ADD CONSTRAINT `Coordinate_tillageId_fkey` FOREIGN KEY (`tillageId`) REFERENCES `Tillage`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Gallery` ADD CONSTRAINT `Gallery_tillageId_fkey` FOREIGN KEY (`tillageId`) REFERENCES `Tillage`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
