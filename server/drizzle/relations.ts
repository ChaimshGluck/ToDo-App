import { relations } from "drizzle-orm/relations";
import { person, task } from "./schema";

export const taskInTodos1Relations = relations(task, ({one}) => ({
	person: one(person, {
		fields: [task.userId],
		references: [person.id]
	}),
}));

export const personInTodos1Relations = relations(person, ({many}) => ({
	taskInTodos1s: many(task),
}));