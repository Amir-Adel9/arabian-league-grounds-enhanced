CREATE TABLE `prediction` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`userId` text,
	`userClerkId` text,
	`username` varchar(100),
	`matchId` text,
	`winningTeamId` text,
	`losingTeamId` text,
	`createdAt` timestamp DEFAULT (now()),
	`state` text DEFAULT ('unfulfilled'),
	CONSTRAINT `prediction_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `user` ADD `predictionPoints` int DEFAULT 0;