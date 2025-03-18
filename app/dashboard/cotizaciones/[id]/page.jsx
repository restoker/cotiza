
export default async function CotizationPage() {
    const products = [
        {
            id: 1,
            name: 'Cold Brew Bottle',
            description:
                'This glass bottle comes with a mesh insert for steeping tea or cold-brewing coffee. Pour from any angle and remove the top for easy cleaning.',
            href: '#',
            quantity: 1,
            price: '$32.00',
            imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/confirmation-page-05-product-01.jpg',
            imageAlt: 'Glass bottle with black plastic pour top and mesh insert.',
        },
    ]
    return (
        <>
            <main className="bg-white/5 backdrop-blur-lg px-4 pb-24 sm:px-6 lg:px-8 lg:py-10">
                <div className="mx-auto max-w-3xl">
                    <div className="max-w-xl">
                        <h1 className="font-bold text-white text-4xl">Cotización</h1>
                        <p className="mt-2 text-base text-gray-300">Este pantalla muestra las especificaciones de su cotizacon.</p>

                        <dl className="mt-12 text-sm font-medium">
                            <dt className="text-zinc-100">ID</dt>
                            <dd className="mt-2 text-amber-50">51547878755545848512</dd>
                        </dl>
                    </div>

                    <section aria-labelledby="order-heading" className="mt-10 border-t border-gray-200">
                        <h2 id="order-heading" className="sr-only">
                            Tu cotización
                        </h2>

                        <h3 className="sr-only">Items</h3>
                        {products.map((product) => (
                            <div key={product.id} className="flex space-x-6 border-b border-gray-200 py-10">
                                <img
                                    alt={product.imageAlt}
                                    src={product.imageSrc}
                                    className="h-20 w-20 flex-none rounded-lg bg-gray-100 object-cover object-center sm:h-40 sm:w-40"
                                />
                                <div className="flex flex-auto flex-col">
                                    <div>
                                        <h4 className="font-medium text-gray-100">
                                            <a href={product.href}>{product.name}</a>
                                        </h4>
                                        <p className="mt-2 text-sm text-gray-400">{product.description}</p>
                                    </div>
                                    <div className="mt-6 flex flex-1 items-end">
                                        <dl className="flex space-x-4 divide-x divide-gray-200 text-sm sm:space-x-6">
                                            <div className="flex">
                                                <dt className="font-medium text-gray-300">Quantity</dt>
                                                <dd className="ml-2 text-gray-50">{product.quantity}</dd>
                                            </div>
                                            <div className="flex pl-4 sm:pl-6">
                                                <dt className="font-medium text-gray-300">Price</dt>
                                                <dd className="ml-2 text-gray-50">{product.price}</dd>
                                            </div>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="sm:ml-40 sm:pl-6">
                            <h3 className="sr-only">Información</h3>

                            <h4 className="sr-only">Dirección</h4>
                            <dl className="grid grid-cols-2 gap-x-6 py-10 text-sm">
                                <div>
                                    <dt className="font-medium text-gray-50">Dirección</dt>
                                    <dd className="mt-2 text-gray-400">
                                        <address className="not-italic">
                                            <span className="block">Kristin Watson</span>
                                            <span className="block">7363 Cynthia Pass</span>
                                            <span className="block">Toronto, ON N3Y 4H8</span>
                                        </address>
                                    </dd>
                                </div>
                                <div>
                                    <dt className="font-medium text-gray-50">Billing address</dt>
                                    <dd className="mt-2 text-gray-400">
                                        <address className="not-italic">
                                            <span className="block">Kristin Watson</span>
                                            <span className="block">7363 Cynthia Pass</span>
                                            <span className="block">Toronto, ON N3Y 4H8</span>
                                        </address>
                                    </dd>
                                </div>
                            </dl>

                            <h4 className="sr-only">Payment</h4>
                            <dl className="grid grid-cols-2 gap-x-6 border-t border-gray-200 py-10 text-sm">
                                <div>
                                    <dt className="font-medium text-gray-50">Payment method</dt>
                                    <dd className="mt-2 text-gray-400">
                                        <p>Apple Pay</p>
                                        <p>Mastercard</p>
                                        <p>
                                            <span aria-hidden="true">••••</span>
                                            <span className="sr-only">Ending in </span>1545
                                        </p>
                                    </dd>
                                </div>
                                <div>
                                    <dt className="font-medium text-gray-50">Shipping method</dt>
                                    <dd className="mt-2 text-gray-400">
                                        <p>DHL</p>
                                        <p>Takes up to 3 working days</p>
                                    </dd>
                                </div>
                            </dl>

                            <h3 className="sr-only">Summary</h3>

                            <dl className="space-y-6 border-t border-gray-200 pt-10 text-sm">
                                <div className="flex justify-between">
                                    <dt className="font-medium text-gray-50">Subtotal</dt>
                                    <dd className="text-gray-400">$36.00</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="flex font-medium text-gray-50">
                                        Discount
                                        <span className="ml-2 rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-600">STUDENT50</span>
                                    </dt>
                                    <dd className="text-gray-400">-$18.00 (50%)</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="font-medium text-gray-50">Shipping</dt>
                                    <dd className="text-gray-400">$5.00</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="font-medium text-gray-50">Total</dt>
                                    <dd className="text-gray-900">$23.00</dd>
                                </div>
                            </dl>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}