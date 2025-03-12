"use client"

import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

const ActionCell = ({ row }) => {
    // const { status, execute } = useAction(deleteProduct, {
    //     onSuccess: (data) => {
    //         if (data?.error) {
    //             toast.error(data.error)
    //         }
    //         if (data?.success) {
    //             toast.success(data.success)
    //         }
    //     },
    //     onExecute: () => {
    //         toast.loading("Deleting Product")
    //     },
    // })
    const cotizacion = row.original;
    console.log(cotizacion);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"ghost"} className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem className="dark:focus:bg-primary focus:bg-primary/50 cursor-pointer">
                    <Link href={`/dashboard/cotizaciones/${cotizacion.id}?url=${cotizacion.imagen}`}>
                        Ver Cotización
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="dark:focus:bg-primary focus:bg-primary/50 cursor-pointer">
                    <Link href={`/dashboard/cotizaciones/addcotizacion?id=${cotizacion.id}`}>
                        Editar Cotización
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                    // onClick={() => execute({ id: product.id })}
                    className="dark:focus:bg-destructive focus:bg-destructive/50 cursor-pointer"
                >
                    Eliminar Cotización
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export const columns = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "producto",
        header: "Producto",
    },
    {
        accessorKey: "cantidad",
        header: "Cantidad",
    },
    {
        accessorKey: "precio",
        header: "Price",
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("precio"))
            const formatted = new Intl.NumberFormat("es-PE", {
                currency: "PEN",
                style: "currency",
            }).format(price)
            return <div className="font-medium text-xs">{formatted}</div>
        },
    },
    {
        accessorKey: "imagen",
        header: "Imagen",
        cell: ({ row }) => {
            const cellImage = row.getValue("imagen");
            const cellTitle = row.getValue("producto");
            return (
                <div className="">
                    <img
                        src={cellImage}
                        alt={cellTitle}
                        width={50}
                        height={50}
                        className="rounded-md"
                    />
                </div>
            )
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ActionCell,
    },

]
