ALTER TABLE `playerToFantasyTeam` ADD `pickedAt` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `user` ADD `credits` int DEFAULT 0;