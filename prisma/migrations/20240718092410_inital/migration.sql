-- CreateTable
CREATE TABLE `Smtp` (
    `id` VARCHAR(191) NOT NULL,
    `serverName` VARCHAR(191) NOT NULL,
    `port` INTEGER NOT NULL,
    `fromEmail` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `displayame` VARCHAR(191) NOT NULL,
    `toEmail` VARCHAR(191) NULL,

    INDEX `Smtp_username_idx`(`username`),
    UNIQUE INDEX `Smtp_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
