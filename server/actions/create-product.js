"use server";

import { productSchema } from "@/types/product-schema";
import { actionClient } from "@/types/safe-action";
import { db } from "..";
import { productImages, products } from '../schema';
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const createProductAction = actionClient
    .schema(productSchema)
    .action(async ({ parsedInput: { title, price, description, id, image, quantity }, ctx: { } }) => {
        try {
            if (id) {
                const product = await db.query.products.findFirst({
                    where: (products, { eq }) => eq(products.id, id),
                })
                if (!product) return { ok: false, msg: 'Product Not found' };
                const productUpdated = await db.update(products).set({
                    ...(title && { title }),
                    ...(price && { price }),
                    ...(description && { description }),
                    ...(quantity && { quantity }),
                }).where(eq(products.id, id)).returning();
                revalidatePath('/dashboard/products')
                return { ok: true, msg: `${productUpdated[0].title} fue actualizado` };
            }
            if (!id) {
                const productAdded = await db.insert(products).values({
                    title,
                    description,
                    price,
                    quantity,
                }).returning();
                await db.insert(productImages).values({
                    key: image[0].key,
                    productId: productAdded[0].id,
                    url: image[0].url,
                    size: image[0].size,
                    name: image[0].name
                })
                revalidatePath('/dashboard/products');
                return { ok: true, msg: `${productAdded[0].title} se creo correctamente` };
            }

        } catch (e) {
            console.log(e);
            return { ok: false, msg: 'Error on server' };
        }
    })