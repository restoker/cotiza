CREATE TYPE "public"."estado" AS ENUM('open', 'closed');--> statement-breakpoint
CREATE TYPE "public"."roles" AS ENUM('user', 'admin');--> statement-breakpoint
CREATE TABLE "passwordResetToken" (
	"id" text PRIMARY KEY NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	"email" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "productImages" (
	"id" text PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"size" real NOT NULL,
	"key" text NOT NULL,
	"name" text NOT NULL,
	"productId" text NOT NULL,
	CONSTRAINT "productImages_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE "productVariant" (
	"id" text PRIMARY KEY NOT NULL,
	"description" text NOT NULL,
	"price" real NOT NULL,
	"phone" varchar(9) NOT NULL,
	"quantity" integer NOT NULL,
	"nameShop" text,
	"owner" text,
	"email" text,
	"address" text,
	"location" "point",
	"ruc" text,
	"productId" text NOT NULL,
	"updated" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" text PRIMARY KEY NOT NULL,
	"description" text NOT NULL,
	"title" text NOT NULL,
	"estado" "estado" DEFAULT 'open',
	"price" real NOT NULL,
	"quantity" integer NOT NULL,
	"updated" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"image" text,
	"password" text NOT NULL,
	"roles" "roles" DEFAULT 'user',
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "variantImages" (
	"id" text PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"size" real NOT NULL,
	"key" text NOT NULL,
	"name" text NOT NULL,
	"order" real NOT NULL,
	"variantId" text NOT NULL,
	CONSTRAINT "variantImages_key_unique" UNIQUE("key")
);
--> statement-breakpoint
ALTER TABLE "productImages" ADD CONSTRAINT "productImages_productId_products_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "productVariant" ADD CONSTRAINT "productVariant_productId_products_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "variantImages" ADD CONSTRAINT "variantImages_variantId_productVariant_id_fk" FOREIGN KEY ("variantId") REFERENCES "public"."productVariant"("id") ON DELETE cascade ON UPDATE no action;