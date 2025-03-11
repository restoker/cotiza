'use client';

import React, { useEffect, useState } from 'react'
import { CheckCircleIcon, CurrencyDollarIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema } from '@/types/product-schema';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAction } from 'next-safe-action/hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// import { z } from 'zod';
import VariantImages from './variant-images.jsx';
import Tiptap from './Tiptap.jsx';
import { createProductAction } from '@/server/actions/create-product';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';
import { getProductAction } from '@/server/actions/get-product';

const FormProduct = () => {

    const router = useRouter();
    const params = useSearchParams();
    const editMode = params.get('id');

    const [chargetProduct, setChargetProduct] = useState(false);

    const form = useForm({
        resolver: zodResolver(productSchema),
        defaultValues: {
            title: "",
            description: "",
            price: 0,
            image: [],
            quantity: 0,
        },
        mode: "onChange",
    });

    const checkProduct = async () => {
        if (editMode) {
            setChargetProduct(true);
            const { ok, data: product, msg } = await getProductAction(editMode);
            setChargetProduct(false);
            if (!ok) {
                toast.error(`${msg}`);
                router.push('/dashboard/products');
                return;
            }
            if (product) {
                form.setValue('title', product.title);
                form.setValue('description', product.description);
                form.setValue('price', product.price);
                form.setValue('quantity', product.quantity);
                form.setValue('image', product.productImages);
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

    const { execute, status } = useAction(createProductAction, {
        onSuccess: ({ data }) => {
            if (data) {
                if (data.ok) {
                    toast.success(`${data.msg}`,
                        {
                            classNames: {
                                toast: 'text-white bg-green-400',
                                closeButton: 'bg-green-400 text-red-700'
                            },
                            closeButton: true,
                            position: 'top-right',
                            icon: <CheckCircleIcon className='animate-bounce' />,
                            duration: 1000,
                        },
                    );
                    form.reset();
                }
                if (!data.ok) {
                    toast.error(`${data.msg}`,
                        {
                            classNames: {
                                toast: 'text-white bg-red-400',
                                closeButton: 'bg-red-400 text-red-700'
                            },
                            closeButton: true,
                            position: 'top-right',
                            icon: <CheckCircleIcon className='animate-bounce' />,
                            duration: 2000,
                        },
                    );
                }
            }
        }
    })


    function onSubmit(values) {
        if (form.getValues('image').length === 0) return form.setError('image', { type: 'required', message: 'La imagen es obligatoria' })
        execute(values);
    }

    if (chargetProduct) {
        return (
            <p className='flex justify-center items-center w-full text-center text-xl text-lime-50'>Cargando...</p>
        )
    }

    return (
        <Form {...form}>
            <h1 className='text-2xl text-gray-50 font-bold mb-5'>Nuevo Producto</h1>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-8">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className='max-w-xl'>
                                <FormLabel className='text-white'>Nombre producto</FormLabel>
                                <FormControl>
                                    <Input placeholder="Zapatillas addidas" {...field} />
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
                                            className="bg-muted rounded-md size-8 text-white"
                                        />
                                        <Input
                                            {...field}
                                            type="number"
                                            placeholder="Your price in USD"
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
                                            className="bg-muted rounded-md size-8 text-white"
                                        />
                                        <Input
                                            {...field}
                                            type="number"
                                            placeholder="Your price in USD"
                                            step="1"
                                            min={0}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <VariantImages />

                    <Button
                        className="max-w-2xl bg-amber-600 text-white font-bold"
                        disabled={
                            status === "executing" ||
                            !form.formState.isValid ||
                            !form.formState.isDirty
                        }
                        type="submit"
                    >
                        {editMode ? "Save Changes" : "Crear Producto"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default FormProduct