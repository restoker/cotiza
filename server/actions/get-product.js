"use server";

import { db } from "..";

export const getProductAction = async (id) => {
    try {
        const producto = await db.query.products.findFirst({
            where: (products, { eq }) => eq(products.id, id),
            with: {
                productImages: {
                    columns: {
                        name: true,
                        id: true,
                        key: true,
                        size: true,
                        url: true,
                    }
                },
            }
        });
        if (!producto) return { ok: false, msg: 'Product Dont Exist' };
        // console.log(producto);
        return { ok: true, msg: 'Product found', data: producto };
    } catch (e) {
        return {
            ok: false,
            msg: 'Error on server',
        }
    }
} 