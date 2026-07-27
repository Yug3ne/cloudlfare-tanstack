CREATE TABLE `todos` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`title` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch())
);
