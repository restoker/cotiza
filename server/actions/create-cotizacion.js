'use server';

import { actionClient } from "@/types/safe-action";
import { db } from "..";
import { productVariant } from "../schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { cotizacionSchema } from "@/types/order-schema";

export const createCotizationAction = actionClient
    .schema(cotizacionSchema)
    .action(async ({ parsedInput: { id, address, description, location, phone, price, quantity, email, nameShop, owner, ruc, productId } }) => {
        try {
            if (id) {
                const cotizacion = await db.query.productVariant.findFirst({
                    where: (productVariant, { eq }) => eq(productVariant.id, id),
                })
                if (!cotizacion) return { ok: false, msg: `No hay ninguna cotización con el id:${id}` }
                const cotizacionUpdateded = await db.update(productVariant).set({
                    ...(description && { description }),
                    ...(phone && { phone: String(phone) }),
                    ...(price && { price }),
                    ...(quantity && { quantity }),
                    ...(email && { email }),
                    ...(location && { location: [location[0], location[1]] }),
                    ...(address && { address }),
                    ...(nameShop && { nameShop }),
                    ...(owner && { owner }),
                    ...(ruc && { ruc: String(ruc) }),
                }).where(eq(productVariant.id, id)).returning();
                revalidatePath('/dashboard/orders/new-order');
                return { ok: true, msg: `La cotizacion fue actualizada` }
            }
            if (!id) {
                const producto = await db.query.products.findFirst({
                    where: (products, { eq }) => eq(products.id, productId),
                })
                if (!producto) return { ok: false, msg: 'El producto no existe' };
                const cotizacion = await db.insert(productVariant).values({
                    description,
                    phone: String(phone),
                    price,
                    quantity: quantity,
                    productId: producto.id,
                    ...(email && { email }),
                    ...(location && { location: [location[0], location[1]] }),
                    ...(address && { address }),
                    ...(nameShop && { nameShop }),
                    ...(owner && { owner }),
                    ...(ruc && { ruc: String(ruc) }),
                }).returning();
                // revalidatePath(`/dashboard/products/${productId}`);
                return { ok: true, msg: 'La cotizacion fue añadida' }
            }
        } catch (e) {
            console.log(e);
            return {
                ok: false,
                msg: 'Error en el server'
            }
        }
    }) 