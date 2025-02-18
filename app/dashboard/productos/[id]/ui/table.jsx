'use client';
import React, { useState } from 'react'
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const TableOfCotizaciones = ({ columns, data }) => {
    // <Table className="mt-4 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
    //     <TableHead>
    //         <TableRow>
    //             <TableHeader>Order number</TableHeader>
    //             <TableHeader>Ganancia</TableHeader>
    //             <TableHeader>Cantidad</TableHeader>
    //             <TableHeader className="text-right">Precio</TableHeader>
    //         </TableRow>
    //     </TableHead>
    //     <TableBody>
    //         {
    //             cotizaciones.map((cotz) => (
    //                 <TableRow key={cotz.id} href={`/dashboard/orders/${cotz.id}?url=${url}`} title={`Order #${cotz.id}`}>
    //                     <TableCell>{cotz.id.split('-')[0]}</TableCell>
    //                     <TableCell className="text-zinc-500">{cotz.price}</TableCell>
    //                     <TableCell>{cotz.quantity}</TableCell>
    //                     <TableCell className="text-right">{formatPrice(cotz.price)}</TableCell>
    //                 </TableRow>
    //             ))
    //         }
    //     </TableBody>
    // </Table>

    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([])
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnFiltersChange: setColumnFilters,
        state: {
            sorting,
            columnFilters,
        },
    });

    return (
        <>
            <div className="rounded-md">
                <Card>
                    <CardHeader>
                        <CardTitle className='text-white font-bold'>Cotizaciones del producto</CardTitle>
                        <CardDescription className='text-white font-semibold'>
                            Verificá, Eliminá o editá tus cotizaciones 💯
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {/* <div> */}
                        {/* <div>
                            <Input
                                placeholder="Filtrar Cotización"
                                value={
                                    (table.getColumn("Titulo")?.getFilterValue()) ?? ""
                                }
                                onChange={(event) =>
                                    table.getColumn("Titulo")?.setFilterValue(event.target.value)
                                }
                            />
                        </div> */}
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                            return (
                                                <TableHead key={header.id}>
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                </TableHead>
                                            )
                                        })}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            data-state={row.getIsSelected() && "selected"}
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={columns.length}
                                            className="h-24 text-center"
                                        >
                                            No hay resultados.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        <div className="flex items-center justify-end gap-4 pt-4">
                            <Button
                                disabled={!table.getCanPreviousPage()}
                                onClick={() => table.previousPage()}
                                variant="outline"
                            >
                                <ChevronLeftIcon className="w-4 h-4 text-white" />
                                <span className='text-white'>Previous Page</span>
                            </Button>
                            <Button
                                disabled={!table.getCanNextPage()}
                                onClick={() => table.nextPage()}
                                variant="outline"
                            >
                                <span className='text-white'>Next page</span>
                                <ChevronRightIcon className="w-4 h-4 text-white" />
                            </Button>
                        </div>
                        {/* </div> */}
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default TableOfCotizaciones;