"use client"

import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

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
    const product = row.original;

    console.log(product);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"ghost"} className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem className="dark:focus:bg-primary focus:bg-primary/50 cursor-pointer">
                    <Link href={`/dashboard/cotizaciones/${product.id}`}>
                        Ver cotización
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="dark:focus:bg-primary focus:bg-primary/50 cursor-pointer">
                    <Link href={`/dashboard/cotizaciones/addcotizacion?id=${product.id}&idProduct=${product.productoId}`}>
                        Editar cotización
                    </Link>
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
        accessorKey: "cantidad",
        header: "Cantidad",
    },
    {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("price"))
            const formatted = new Intl.NumberFormat("es-PE", {
                currency: "PEN",
                style: "currency",
            }).format(price)
            return <div className="font-medium text-xs">{formatted}</div>
        },
    },
    {
        accessorKey: "redito",
        header: "Ganancia/Perdida",
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("redito"));
            const formatted = new Intl.NumberFormat("es-PE", {
                currency: "PEN",
                style: "currency",
            }).format(price)
            return <div className="font-medium text-xs">{formatted}</div>
        },
        sortDescFirst: true,
    },
    {
        id: "actions",
        header: "Actions",
        cell: ActionCell,
    },
]