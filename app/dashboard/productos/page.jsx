import { db } from "@/server";

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
    console.log(productos);
    return (
        <div>
            <h1 className="text-white">Productos</h1>
        </div>
    );
}