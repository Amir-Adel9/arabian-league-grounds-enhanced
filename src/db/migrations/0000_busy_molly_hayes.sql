CREATE TABLE `user` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`clerkId` text,
	`username` varchar(100),
	CONSTRAINT `user_id` PRIMARY KEY(`id`)
);
