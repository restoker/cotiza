'use server';
import { db } from ".."

export const getOrderAction = async (id) => {
    try {
        const cotizacion = await db.query.productVariant.findFirst({
            where: (productVariant, { eq }) => eq(productVariant.id, id),
        });
        if (!cotizacion) return { ok: false, msg: 'No hay ninguna cotizacion con el id indicado' };

        return { ok: true, msg: 'Operacion exitosa', data: cotizacion };
    } catch (e) {
        return {
            ok: false,
            msg: 'Error on system',
        }
    }
}