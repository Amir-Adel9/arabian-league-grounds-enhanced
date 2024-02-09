ALTER TABLE `user` MODIFY COLUMN `predictionPoints` int NOT NULL;--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `fantasyPoints` int NOT NULL;--> statement-breakpoint
ALTER TABLE `prediction` ADD `matchAt` timestamp NOT NULL;