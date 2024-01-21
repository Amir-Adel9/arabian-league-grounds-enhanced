ALTER TABLE `playerToFantasyTeam` MODIFY COLUMN `points` int NOT NULL;--> statement-breakpoint
ALTER TABLE `playerToFantasyTeam` MODIFY COLUMN `pickedAt` timestamp NOT NULL DEFAULT (now());