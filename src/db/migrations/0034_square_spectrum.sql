ALTER TABLE `player` MODIFY COLUMN `teamLogo` text NOT NULL;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `predictionPoints`;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `fantasyPoints`;