ALTER TABLE `prediction` MODIFY COLUMN `userClerkId` text NOT NULL;--> statement-breakpoint
ALTER TABLE `prediction` MODIFY COLUMN `username` varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE `prediction` MODIFY COLUMN `matchId` text NOT NULL;--> statement-breakpoint
ALTER TABLE `prediction` MODIFY COLUMN `winningTeamId` text NOT NULL;--> statement-breakpoint
ALTER TABLE `prediction` MODIFY COLUMN `losingTeamId` text NOT NULL;--> statement-breakpoint
ALTER TABLE `prediction` MODIFY COLUMN `bestOf` int NOT NULL;--> statement-breakpoint
ALTER TABLE `prediction` DROP COLUMN `userId`;