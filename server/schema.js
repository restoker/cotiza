import {
    pgEnum,
    pgTable,
    text,
} from "drizzle-orm/pg-core";

export const RoleEnum = pgEnum("roles", ["user", "admin"]);
export const ProductStateEnum = pgEnum("estado", ["open", "closed"]);

export const users = pgTable("user", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    email: text("email").notNull().unique(),
    image: text("image"),
    password: text('password').notNull(),
    role: RoleEnum("roles").default("user"),
})