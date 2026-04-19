-- AlterTable
ALTER TABLE `User` ADD COLUMN `defaultLanguage` VARCHAR(191) NOT NULL DEFAULT 'English',
    ADD COLUMN `defaultLength` VARCHAR(191) NOT NULL DEFAULT 'Medium',
    ADD COLUMN `emailNotifications` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `inAppNotifications` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `theme` VARCHAR(191) NOT NULL DEFAULT 'dark';
