import { pgTable, pgSchema, serial, text, foreignKey, integer, timestamp } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const todos1 = pgSchema("todos1");


export const person = todos1.table("person", {
	id: serial("id").primaryKey().notNull(),
	username: text("username").notNull(),
	email: text("email"),
	pass: text("pass").notNull(),
	firstname: text("firstname").notNull(),
	lastname: text("lastname"),
	profileImg: text("profile_img"),
	role2: text("role2").default("user2").notNull(),
});

export const task = todos1.table("task", {
	id: serial("id").primaryKey().notNull(),
	userId: integer("user_id").notNull().references(() => person.id),
	title: text("title").notNull(),
	tags: text("tags").default('{}').array(),
	description: text("description"),
	status: text("status").default('active').notNull(),
	deletedAt: timestamp("deleted_at", { withTimezone: true, mode: 'string' }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
	image: text("image"),
});