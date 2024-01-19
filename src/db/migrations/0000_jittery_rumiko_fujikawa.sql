CREATE TABLE `fantasyTeam` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userClerkId` varchar(100) NOT NULL,
	CONSTRAINT `fantasyTeam_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `player` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100),
	`summonerName` varchar(100) NOT NULL,
	`nationality` text NOT NULL,
	`role` text NOT NULL,
	`cost` int NOT NULL,
	`teamName` text,
	`teamCode` text,
	`teamSlug` text,
	`kills` int DEFAULT 0,
	`deaths` int DEFAULT 0,
	`assists` int DEFAULT 0,
	`pointsFromKills` int DEFAULT 0,
	`pointsFromDeaths` int DEFAULT 0,
	`pointsFromAssists` int DEFAULT 0,
	`pointsFromGameWins` int DEFAULT 0,
	`totalFantasyPoints` int DEFAULT 0,
	CONSTRAINT `player_id` PRIMARY KEY(`id`),
	CONSTRAINT `summonerName` UNIQUE(`summonerName`)
);
--> statement-breakpoint
CREATE TABLE `playerToFantasyTeam` (
	`fantasyTeamId` int NOT NULL,
	`playerId` int,
	`role` varchar(10) NOT NULL,
	CONSTRAINT `playerToFantasyTeam_fantasyTeamId_role` PRIMARY KEY(`fantasyTeamId`,`role`)
);
--> statement-breakpoint
CREATE TABLE `prediction` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`userClerkId` varchar(100) NOT NULL,
	`username` varchar(100) NOT NULL,
	`matchId` text NOT NULL,
	`winningTeamId` text NOT NULL,
	`losingTeamId` text NOT NULL,
	`bestOf` int NOT NULL,
	`winningTeamScore` int,
	`losingTeamScore` int,
	`state` text DEFAULT ('unfulfilled'),
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `prediction_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`clerkId` varchar(100) NOT NULL,
	`username` varchar(100),
	`predictionPoints` int DEFAULT 0,
	`fantasyPoints` int DEFAULT 0,
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_clerkId_unique` UNIQUE(`clerkId`)
);
--> statement-breakpoint
ALTER TABLE `fantasyTeam` ADD CONSTRAINT `fantasyTeam_userClerkId_user_clerkId_fk` FOREIGN KEY (`userClerkId`) REFERENCES `user`(`clerkId`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `playerToFantasyTeam` ADD CONSTRAINT `playerToFantasyTeam_fantasyTeamId_fantasyTeam_id_fk` FOREIGN KEY (`fantasyTeamId`) REFERENCES `fantasyTeam`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `playerToFantasyTeam` ADD CONSTRAINT `playerToFantasyTeam_playerId_player_id_fk` FOREIGN KEY (`playerId`) REFERENCES `player`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `prediction` ADD CONSTRAINT `prediction_userClerkId_user_clerkId_fk` FOREIGN KEY (`userClerkId`) REFERENCES `user`(`clerkId`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `prediction` ADD CONSTRAINT `prediction_username_user_username_fk` FOREIGN KEY (`username`) REFERENCES `user`(`username`) ON DELETE no action ON UPDATE no action;