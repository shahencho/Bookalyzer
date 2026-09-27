-- AlterTable
ALTER TABLE `question_attempts` ADD COLUMN `gradingMethod` VARCHAR(191) NULL,
    ADD COLUMN `gradingReasoning` TEXT NULL;
