import { db } from "@/server";
import { CheckCircleIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { formatDistance, subDays } from "date-fns";
import Link from "next/link";
import { notFound } from "next/navigation";
import { es } from 'date-fns/locale'
import formatPrice from "@/lib/format-price";
import TableCotizaciones from "./ui/table-cotizaciones";

export async function generateMetadata({ params, searchParams }) {
    const { id } = await params;
    // console.log(id);
    let orden = await db.query.products.findFirst({
        where: (products, { eq }) => eq(products.id, id),
    })

    return {
        title: orden?.title,
    }
}

export default async function ProductPage({ params, searchParams }) {
    const { id } = await params;
    let product = await db.query.products.findFirst({
        where: (products, { eq }) => eq(products.id, id),
        with: {
            productImages: {
                columns: {
                    url: true,
                    key: true,
                }
            }
        }
    });

    if (!product) {
        notFound();
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-lg:hidden">
                <Link href="/dashboard/productos" className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400">
                    <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
                    Productos
                </Link>
            </div>
            <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
                <div className="flex flex-wrap items-center gap-6">
                    <div className="w-32 shrink-0">
                        <img className="aspect-[3/2] rounded-lg shadow" src={product.productImages[0].url} alt="" />
                    </div>
                    <div>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                            <h1 className='text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 dark:text-white'>{product.title}</h1>
                            <span
                                className={clsx(
                                    'inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 forced-colors:outline',
                                    product.state === 'open' ? 'bg-lime-400/20 text-lime-700 group-data-[hover]:bg-lime-400/30 dark:bg-lime-400/10 dark:text-lime-300 dark:group-data-[hover]:bg-lime-400/15' : 'bg-zinc-600/10 text-zinc-700 group-data-[hover]:bg-zinc-600/20 dark:bg-white/5 dark:text-zinc-400 dark:group-data-[hover]:bg-white/10'
                                )}
                            >
                                {product.state}
                            </span>
                        </div>
                        <div className="mt-2 text-xs/6 text-zinc-500">
                            {formatDistance(subDays(product.updated, 0), new Date(), { locale: es })} atras.
                        </div>
                    </div>
                </div>
                <div className="flex gap-4">

                    <Link className="flex items-center gap-x-1.5 rounded-md bg-lime-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600" href={`/dashboard/productos/addproduct?id=${product.id}`}>
                        <CheckCircleIcon aria-hidden="true" className="-ml-0.5 h-5 w-5" />
                        Editar
                    </Link>

                    <Link className="flex items-center gap-x-1.5 rounded-md bg-lime-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600" href={`/dashboard/cotizaciones/new-cotizacion?idProduct=${id}`}>
                        <CheckCircleIcon aria-hidden="true" className="-ml-0.5 h-5 w-5" />
                        Crear Cotización
                    </Link>
                </div>
            </div>
            <div className="mt-8 grid gap-8 sm:grid-cols-3">
                <div>
                    <hr className='border-zinc-950/10 dark:border-white/10 w-full border-t' />
                    <div className="mt-6 text-lg/6 font-medium sm:text-sm/6 text-zinc-50">Precio y cantidad del producto</div>
                    <div className="mt-3 text-3xl/8 font-semibold sm:text-2xl/8 text-zinc-100">{formatPrice(product.price)}</div>
                    <div className="mt-3 text-sm sm:text-sm">
                        <span className="text-zinc-300">Cantidad: </span>
                        <span
                            className={clsx(
                                'inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 forced-colors:outline',
                                'bg-lime-400/20 text-lime-700 group-data-[hover]:bg-lime-400/30 dark:bg-lime-400/10 dark:text-lime-300 dark:group-data-[hover]:bg-lime-400/15'
                            )}
                        >
                            {product.quantity} uds.
                        </span>
                        {' '}
                    </div>
                </div>
                <div className="text-sm text-zinc-200 sm:col-span-2" dangerouslySetInnerHTML={{ __html: product.description }}>
                </div>
                {/* <Stat
          title="Tickets sold"
          value={`${event.ticketsSold}/${event.ticketsAvailable}`}
          change={event.ticketsSoldChange}
        /> */}
                {/* <Stat title="Pageviews" value={event.pageViews} change={event.pageViewsChange} /> */}
            </div>
            <h2 className="text-base/7 font-semibold text-zinc-950 sm:text-sm/6 dark:text-white mt-12">Cotizaciones recientes</h2>
            <TableCotizaciones url={product.productImages[0].url} id={id} />
        </div>
    );
}