import { relations } from "drizzle-orm";
import {
    integer,
    pgEnum,
    pgTable,
    point,
    real,
    text,
    timestamp,
    varchar,
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

export const passwordResetTokens = pgTable("passwordResetToken",
    {
        id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
        token: text("token").notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
        email: text('email').notNull(),
    },
)

export const products = pgTable('products', {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    description: text('description').notNull(),
    title: text('title').notNull(),
    state: ProductStateEnum("estado").default('open'),
    price: real('price').notNull(),
    quantity: integer('quantity').notNull(),
    updated: timestamp('updated').defaultNow(),
});

export const productImages = pgTable('productImages', {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    url: text('url').notNull(),
    size: real('size').notNull(),
    key: text('key').notNull().unique(),
    name: text('name').notNull(),
    productId: text("productId").notNull()
        .references(() => products.id, { onDelete: 'cascade' })
});

export const productVariant = pgTable('productVariant', {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    // name: text('name').notNull(),
    description: text('description').notNull(),
    price: real('price').notNull(),
    phone: varchar('phone', { length: 9 }).notNull(),
    quantity: integer('quantity').notNull(),
    nameShop: text('nameShop'),
    owner: text('owner'),
    email: text('email'),
    address: text('address'),
    location: point('location', { mode: 'tuple' }),
    ruc: text('ruc'),
    // productType: text('productType').notNull(),
    productId: text("productId").notNull().references(() => products.id, { onDelete: 'cascade' }),
    updated: timestamp('updated').defaultNow(),
});

export const variantImages = pgTable('variantImages', {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    url: text('url').notNull(),
    size: real('size').notNull(),
    key: text('key').notNull().unique(),
    name: text('name').notNull(),
    order: real('order').notNull(),
    variantId: text("variantId").notNull()
        .references(() => productVariant.id, { onDelete: 'cascade' })
});

export const productRelations = relations(products, ({ one, many }) => ({
    productVariant: many(productVariant, { relationName: 'productVariants' }),
    productImages: many(productImages, { relationName: 'productImages' })
    // reviews: many(reviews, { relationName: 'reviews' }),
}));

export const productVariantsRelations = relations(productVariant, ({ one, many }) => ({
    products: one(products, {
        fields: [productVariant.productId],
        references: [products.id],
        relationName: "productVariants"
    }),
    variantImages: many(variantImages, { relationName: 'variantImages' }),
    // variantTags: many(variantTags, { relationName: 'variantTags' }),
}));

export const productImagesRelations = relations(productImages, ({ one, many }) => ({
    products: one(products, {
        fields: [productImages.productId],
        references: [products.id],
        relationName: 'productImages',
    })
}));

export const variantImagesRelations = relations(variantImages, ({ one, many }) => ({
    productVariant: one(productVariant, {
        fields: [variantImages.variantId],
        references: [productVariant.id],
        relationName: 'variantImages',
    })
}));
