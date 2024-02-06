CREATE TABLE `wildcard` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`userClerkId` varchar(100) NOT NULL,
	`name` text NOT NULL,
	`picked` text NOT NULL,
	`correct` text,
	`state` text DEFAULT ('unfulfilled'),
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `wildcard_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `wildcard` ADD CONSTRAINT `wildcard_userClerkId_user_clerkId_fk` FOREIGN KEY (`userClerkId`) REFERENCES `user`(`clerkId`) ON DELETE no action ON UPDATE no action;