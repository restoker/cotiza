'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { BellAlertIcon, CurrencyDollarIcon, DevicePhoneMobileIcon, FaceFrownIcon, FaceSmileIcon, MapPinIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Tiptap from './Tiptap';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAction } from 'next-safe-action/hooks';
import clsx from 'clsx';
import { createCotizationAction } from '@/server/actions/create-cotizacion';
import { getOrderAction } from '@/server/actions/get-cotization';
import { cotizacionSchema } from '@/types/order-schema';

const FormOrder = () => {
    const router = useRouter()
    const params = useSearchParams();
    const productId = params.get('idProduct');
    const editMode = params.get('id');

    const [chargetProduct, setChargetProduct] = useState(false);

    const form = useForm({
        resolver: zodResolver(cotizacionSchema),
        defaultValues: {
            nameShop: '',
            owner: '',
            description: "",
            price: 0,
            quantity: 0,
            address: '',
            email: '',
            location: [],
            phone: 0,
            ruc: 0,
        },
        mode: "all",
    });

    if (productId) form.setValue('productId', productId);

    const checkProduct = async () => {
        if (editMode) {
            setChargetProduct(true);
            const { ok, data: cotizacion, msg } = await getOrderAction(editMode);
            setChargetProduct(false);
            if (!ok) {
                toast.error(`${msg}`);
                router.push('/dashboard/products');
                return;
            }
            if (cotizacion) {
                form.setValue('nameShop', cotizacion.nameShop || '');
                form.setValue('description', cotizacion.description);
                form.setValue('price', cotizacion.price);
                form.setValue('quantity', cotizacion.quantity);
                form.setValue('phone', +cotizacion.phone);
                form.setValue('location', [cotizacion.location[0], cotizacion.location[1]]);
                form.setValue('address', cotizacion.address || '');
                form.setValue('email', cotizacion.email || '');
                form.setValue('ruc', cotizacion.ruc ? +cotizacion.ruc : 0);
                form.setValue('id', editMode);
            }
        }
    }

    useEffect(() => {
        if (!editMode) return;
        if (editMode) {
            checkProduct();
        }
    }, [editMode]);

    const { execute, status } = useAction(createCotizationAction, {
        onSuccess: ({ data }) => {
            if (data && data.ok) {
                toast.success(`${data.msg}`,
                    {
                        classNames: {
                            toast: 'text-white bg-green-400',
                            closeButton: 'bg-green-400 text-red-700'
                        },
                        closeButton: true,
                        position: 'top-right',
                        // duration: Infinity,
                        icon: <FaceSmileIcon className='animate-bounce' />,
                        duration: 1000,
                    },
                );
                window.location.replace('/dashboard');
            }
            if (data && !data.ok) {
                toast.error(`${data.msg}`,
                    {
                        classNames: {
                            toast: 'text-white bg-red-400',
                            closeButton: 'bg-red-400 text-red-700'
                        },
                        closeButton: true,
                        position: 'top-right',
                        // duration: Infinity,
                        icon: <FaceFrownIcon className='animate-bounce' />,
                        duration: 2000,
                    },
                );
            }
        },
        onError: ({ error }) => { }
    })

    function onSubmit(values) {

        // ✅ This will be type-safe and validated.
        execute(values);
        // console.log(values);
    }

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            console.log("Geolocation not supported");
        }
    }

    const success = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        form.setValue('location', [latitude, longitude]);
    }

    const error = (e) => {
        toast.error("No se pudo obtener su ubicación 🙀", {
            classNames: {
                toast: 'text-white bg-red-500',
                closeButton: 'bg-red-300 text-red-700'
            },
            closeButton: true,
            position: 'top-right',
            // duration: Infinity,
            icon: <BellAlertIcon className='animate-bounce' />,
            duration: 3000,
        },);
    }

    if (chargetProduct) {
        return (
            <p className='text-center text-xl text-lime-500'>Cargando...</p>
        )
    }

    return (
        <>
            <h1 className='text-3xl mb-4 text-lime-500 font-bold'>Nueva cotización</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-6">

                        <FormField
                            control={form.control}
                            name="nameShop"
                            render={({ field }) => (
                                <FormItem className='max-w-xl'>
                                    <FormLabel className='text-white'>Nombre Local <strong className='text-amber-500'>(*opcional)</strong> </FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="owner"
                            render={({ field }) => (
                                <FormItem className='max-w-xl'>
                                    <FormLabel className='text-white'>Nombre Dueño <strong className='text-amber-500'>(*opcional)</strong> </FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className='max-w-xl'>
                                    <FormLabel className='text-white'>Descripción</FormLabel>
                                    <FormControl>
                                        <Tiptap
                                            value={field.value}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem className='max-w-xl'>
                                    <FormLabel className='text-white'>Precio</FormLabel>
                                    <FormControl>
                                        <div className="flex items-center gap-2">
                                            <CurrencyDollarIcon
                                                className="bg-muted  rounded-md size-8 text-white"
                                            />
                                            <Input
                                                {...field}
                                                type="number"
                                                placeholder="Your price in Soles"
                                                step="0.01"
                                                min={0}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="quantity"
                            render={({ field }) => (
                                <FormItem className='max-w-xl'>
                                    <FormLabel className='text-white'>Cantidad</FormLabel>
                                    <FormControl>
                                        <div className="flex items-center gap-2">
                                            <ShoppingBagIcon
                                                className="bg-muted  rounded-md size-8 text-white"
                                            />
                                            <Input
                                                {...field}
                                                type="number"
                                                placeholder="Cantidad: p.e: 1"
                                                step="1"
                                                min={0}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem className='max-w-xl'>
                                    <FormLabel className='text-white'>Teléfono  </FormLabel>
                                    <FormControl>
                                        <div className="flex items-center gap-2">
                                            <DevicePhoneMobileIcon
                                                className="bg-muted  rounded-md size-8 text-white"
                                            />
                                            <Input type='tel' placeholder="987654321" {...field} />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className='max-w-xl'>
                                    <FormLabel className='text-white'>Email<strong className='text-amber-500'>(*opcional)</strong> </FormLabel>
                                    <FormControl>
                                        <Input type='email' placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="ruc"
                            render={({ field }) => (
                                <FormItem className='max-w-xl'>
                                    <FormLabel className='text-white'>Ruc <strong className='text-amber-500'>(*opcional)</strong> </FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem className='max-w-xl'>
                                    <FormLabel className='text-white'>Dirección <strong className='text-amber-500'>(*opcional)</strong> </FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <button
                            type='button'
                            className='bg-lime-400 px-2 py-1 rounded-md text-black flex justify-between group font-semibold'
                            onClick={getLocation}
                        >
                            <MapPinIcon className='size-6 mr-1' />
                            Posición
                        </button>


                        <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                                <FormItem className='max-w-xl'>
                                    <FormLabel className='text-white'>Coords: </FormLabel>
                                    <FormControl className='text-white'>
                                        <p>Lat: {form.getValues('location')[0]}, Long: {form.getValues('location')[1]}</p>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* <VariantImages /> */}

                        <Button
                            disabled={
                                status === "executing"
                            }
                            type="submit"
                            className={clsx(status === 'executing' ? "cursor-progress" : "cursor-pointer", "flex w-full justify-center rounded-md bg-amber-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 mt-10 max-w-2xl")}
                        >
                            {/* {editMode ? "Guardar Cambios" : " Crear cotización"} */}
                            Crear cotización
                        </Button>
                    </div>
                </form>
            </Form >
        </>
    )
}

export default FormOrder