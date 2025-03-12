import { z } from "zod";

export const cotizacionSchema = z.object({
    id: z.string().uuid().optional(),
    // title: z.string().min(5, { message: 'EL nombre debe contener almenos 5 caracteres' }),
    nameShop: z.string().optional(),
    owner: z.string().optional(),
    quantity: z.coerce.number({ invalid_type_error: 'El precio debe ser un número' }).min(1, { message: 'La cantidad debe ser mayor a 0' }).positive({ message: 'La cantidad debe ser un numero positivo' }),
    description: z.string().min(5, { message: 'La Descripcion debe contener al menos 20 caracteres' }),
    price: z.coerce.number({ invalid_type_error: 'El precio debe ser un número' }).positive({ message: 'El Precio debe ser un numero positivo' }),
    // name: text('name').notNull(),
    phone: z.coerce.number({ message: 'debe ingresar un teléfono de referencia' }).gte(900000000, { message: 'El teléfono debe contener 9 caracteres como mínimo' }).lte(1000000000, { message: 'El teléfono solo puede contener 9 digitos' }).int({ message: 'Debe ingresar un numero entero' }),
    email: z.string().email({ message: 'Ingrese un email válido' }).optional().or(z.literal('')),
    address: z.string().max(100, { message: 'sobrepaso el máximo numero de caracteres' }),
    location: z.array(z.coerce.number()).length(2, { message: 'Debe ingresar coordenadas validas' }),
    ruc: z.optional(z.number()),
    productId: z.string().uuid(),
    // updated: timestamp('updated').defaultNow(),

});

// export type OrderSchemaType = z.infer<typeof orderSchema>;