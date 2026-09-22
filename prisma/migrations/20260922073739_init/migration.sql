-- CreateTable
CREATE TABLE `book_groups` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `author` VARCHAR(191) NOT NULL,
    `genre` VARCHAR(191) NOT NULL,
    `copyrightStatus` VARCHAR(191) NOT NULL DEFAULT 'public domain',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `book_groups_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `books` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bookGroupId` INTEGER NOT NULL,
    `language` ENUM('hy', 'ru', 'en') NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `author` VARCHAR(191) NOT NULL,
    `shortSummary` TEXT NOT NULL,
    `extendedSummary` TEXT NOT NULL,
    `status` ENUM('LIVE', 'NOT_LIVE') NOT NULL DEFAULT 'LIVE',
    `coverImageId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `books_bookGroupId_language_key`(`bookGroupId`, `language`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `questions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bookId` INTEGER NOT NULL,
    `type` ENUM('MC', 'ORDERING', 'MATCHING', 'FILLBLANK', 'CLASSIFICATION', 'OPEN', 'RANKING', 'CROSSWORD') NOT NULL,
    `bloomLevel` ENUM('REMEMBER', 'UNDERSTAND', 'APPLY', 'ANALYZE', 'EVALUATE', 'CREATE') NOT NULL,
    `prompt` TEXT NOT NULL,
    `content` JSON NOT NULL,
    `explanation` TEXT NOT NULL,
    `archivedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `questions_bookId_archivedAt_idx`(`bookId`, `archivedAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `assessment_sessions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `childId` INTEGER NOT NULL,
    `bookId` INTEGER NOT NULL,
    `readingMode` ENUM('SHORT', 'EXTENDED', 'PHYSICAL') NOT NULL,
    `overallScore` DOUBLE NULL,
    `xpEarned` INTEGER NULL,
    `badgeEarned` ENUM('BRONZE', 'SILVER', 'GOLD') NULL,
    `durationSeconds` INTEGER NULL,
    `status` ENUM('IN_PROGRESS', 'COMPLETED', 'ABANDONED') NOT NULL DEFAULT 'IN_PROGRESS',
    `startedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `completedAt` DATETIME(3) NULL,

    INDEX `assessment_sessions_childId_bookId_status_idx`(`childId`, `bookId`, `status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `question_attempts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sessionId` INTEGER NOT NULL,
    `questionId` INTEGER NOT NULL,
    `answerGiven` JSON NULL,
    `score` DOUBLE NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `parents` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `passwordHash` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `parents_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `children` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `parentId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `nickname` VARCHAR(191) NOT NULL,
    `pinHash` VARCHAR(191) NOT NULL,
    `age` INTEGER NOT NULL,
    `preferredLanguage` ENUM('hy', 'ru', 'en') NOT NULL DEFAULT 'en',
    `xp` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `children_nickname_key`(`nickname`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cover_images` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `storagePath` VARCHAR(191) NOT NULL,
    `uploadedByAdminId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `badges` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `childId` INTEGER NOT NULL,
    `bookId` INTEGER NOT NULL,
    `badgeTier` ENUM('BRONZE', 'SILVER', 'GOLD') NOT NULL,
    `earnedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `badges_childId_bookId_badgeTier_key`(`childId`, `bookId`, `badgeTier`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admin_users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `passwordHash` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `admin_users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `login_attempts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `childId` INTEGER NOT NULL,
    `succeeded` BOOLEAN NOT NULL,
    `attemptedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `login_attempts_childId_attemptedAt_idx`(`childId`, `attemptedAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `books` ADD CONSTRAINT `books_bookGroupId_fkey` FOREIGN KEY (`bookGroupId`) REFERENCES `book_groups`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `books` ADD CONSTRAINT `books_coverImageId_fkey` FOREIGN KEY (`coverImageId`) REFERENCES `cover_images`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `questions` ADD CONSTRAINT `questions_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `books`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `assessment_sessions` ADD CONSTRAINT `assessment_sessions_childId_fkey` FOREIGN KEY (`childId`) REFERENCES `children`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `assessment_sessions` ADD CONSTRAINT `assessment_sessions_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `books`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `question_attempts` ADD CONSTRAINT `question_attempts_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `assessment_sessions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `question_attempts` ADD CONSTRAINT `question_attempts_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `questions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `children` ADD CONSTRAINT `children_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `parents`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cover_images` ADD CONSTRAINT `cover_images_uploadedByAdminId_fkey` FOREIGN KEY (`uploadedByAdminId`) REFERENCES `admin_users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `badges` ADD CONSTRAINT `badges_childId_fkey` FOREIGN KEY (`childId`) REFERENCES `children`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `badges` ADD CONSTRAINT `badges_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `books`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `login_attempts` ADD CONSTRAINT `login_attempts_childId_fkey` FOREIGN KEY (`childId`) REFERENCES `children`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
