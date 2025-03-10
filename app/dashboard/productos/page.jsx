import { db } from "@/server";
import DataTable from "./ui/data-table";
import { columns } from "./ui/columns";
import Link from "next/link";

export default async function ProductosPage() {
    const productos = await db.query.products.findMany({
        orderBy: (products, { desc }) => desc(products.updated),
        with: {
            productImages: {
                columns: {
                    key: true,
                    url: true,
                }
            }
        }
    });

    if (!productos) throw new Error('No se encontraron los productos');
    const dataTable = productos.map((producto) => {
        return {
            id: producto.id,
            Titulo: producto.title,
            price: producto.price,
            imagen: producto.productImages[0].url,
            cantidad: producto.quantity,
            descripcion: producto.description
        }
    });

    if (!dataTable) throw new Error('No data found');
    return (
        <div>
            <Link className="absolute px-3 py-2 top-3 right-10 bg-lime-600 rounded-lg text-white hover:bg-lime-500 cursor-pointer z-40" href={'/dashboard/productos/add-product'} >
                Crear Producto
            </Link>
            <DataTable data={dataTable} columns={columns} />
        </div>
    );
}