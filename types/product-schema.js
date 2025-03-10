import { z } from "zod";

export const productSchema = z.object({
    id: z.string().uuid().optional(),
    title: z.string().min(5, { message: 'EL nombre debe contener almenos 5 caracteres' }),
    quantity: z.coerce.number({ invalid_type_error: 'El precio debe ser un número' }).min(1, { message: 'La cantidad debe ser mayor a 0' }).positive({ message: 'La cantidad debe ser un numero positivo' }),
    description: z.string().min(20, { message: 'La Descripcion debe contener al menos 20 caracteres' }),
    price: z.coerce.number({ invalid_type_error: 'El precio debe ser un número' }).positive({ message: 'El Precio debe ser un numero positivo' }),
    image: z.array(z.object({
        url: z.string().refine((url) => url.search('blob:') !== 0, { message: 'Por favor espera a que la imagen se suba al servidor 😺' }),
        size: z.number(),
        name: z.string(),
        key: z.string().optional(),
        id: z.string().optional(),
    })).max(1, { message: 'Debes ingresar al menos una imagen' })
});

// export type ProductSchemaType = z.infer<typeof productSchema>;