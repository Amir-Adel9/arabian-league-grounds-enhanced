ALTER TABLE `user` MODIFY COLUMN `credits` int NOT NULL DEFAULT 800;--> statement-breakpoint
ALTER TABLE `player` ADD `flagUrl` text NOT NULL;--> statement-breakpoint
ALTER TABLE `player` ADD `teamLogo` text;