import { db } from '@/server';
import React from 'react'
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';
import TableOfCotizaciones from './table';
import { columns } from './columns';

const TableCotizaciones = async ({ url, id }) => {
    const cotizaciones = await db.query.productVariant.findMany({
        where: (productVariant, { eq }) => eq(productVariant.productId, id),
        with: {
            products: {
                columns: {
                    id: true,
                    quantity: true,
                    price: true,
                }
            }
        }
    });
    // console.log(cotizaciones);

    if (!cotizaciones) throw new Error('No se encontraron los productos');

    const data = cotizaciones.map((cotizacion) => {
        return {
            id: cotizacion.id,
            price: cotizacion.price,
            cantidad: cotizacion.quantity,
            redito: Number(cotizacion.price) - Number(cotizacion.products.price),
        }
    });

    if (!data) throw new Error('No data found');

    return (
        <>
            {cotizaciones.length === 0
                ?
                <div className='flex flex-col justify-center w-full items-center h-full py-20'>
                    <ChatBubbleBottomCenterTextIcon className='size-14 mb-6 animate-bounce text-white' />
                    <p className='text-white'>No tienes ninguná cotización para este producto</p>
                </div>
                :
                <TableOfCotizaciones data={data} columns={columns} />
                // <h1>hola :D</h1>
            }
        </>
    )
}

export default TableCotizaciones