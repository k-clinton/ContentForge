/*
  Warnings:

  - A unique constraint covering the columns `[verificationToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `emailVerified` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `verificationToken` VARCHAR(191) NULL,
    MODIFY `plan` VARCHAR(191) NOT NULL DEFAULT 'Free Member';

-- CreateIndex
CREATE UNIQUE INDEX `User_verificationToken_key` ON `User`(`verificationToken`);
