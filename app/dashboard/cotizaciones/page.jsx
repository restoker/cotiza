import { db } from "@/server";
import { desc } from "drizzle-orm";
import DataTable from "./ui/data-table";
import { columns } from "./ui/columns";
import Link from "next/link";
import { productVariant } from "@/server/schema";

export default async function CotizacionesPage() {
    const cotizaciones = await db.query.productVariant.findMany({
        with: {
            products: {
                with: {
                    productImages: {
                        columns: {
                            url: true,
                            key: true,
                        }
                    }
                }
            },
        },
        orderBy: [desc(productVariant.updated)]
    });

    if (!cotizaciones) throw new Error('No se encontraron los');

    const dataTable = cotizaciones.map((cotizacion) => {
        return {
            id: cotizacion.id,
            producto: cotizacion.products.title,
            precio: cotizacion.price,
            cantidad: cotizacion.quantity,
            imagen: cotizacion.products.productImages[0].url,
        }
    });

    if (!dataTable) throw new Error('No data found');

    return (
        <div>
            <div>
                {/* <Link className="absolute px-3 py-2 top-3 right-10 bg-lime-600 rounded-lg text-white hover:bg-lime-500 cursor-pointer z-40" href={'/dashboard/cotizaciones/addcotizacion'} >
                    Crear Cotizacion
                </Link> */}
                <DataTable data={dataTable} columns={columns} />
            </div>
        </div>
    );
}