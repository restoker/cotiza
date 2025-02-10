"use client"

import Image from "next/image"

import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
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
    const product = row.original

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"ghost"} className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem className="dark:focus:bg-primary focus:bg-primary/50 cursor-pointer">
                    <Link href={`/dashboard/add-product?id=${product.id}`}>
                        Edit Product
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                    // onClick={() => execute({ id: product.id })}
                    className="dark:focus:bg-destructive focus:bg-destructive/50 cursor-pointer"
                >
                    Delete Product
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
        accessorKey: "Titulo",
        header: "Titulo",
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
            const formatted = new Intl.NumberFormat("en-US", {
                currency: "USD",
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
            const cellTitle = row.getValue("Titulo");
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
