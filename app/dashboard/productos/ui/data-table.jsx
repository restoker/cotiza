'use client';

import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const DataTable = ({ columns, data }) => {
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
    })

    return (
        <div className="rounded-md">
            <Card>
                <CardHeader>
                    <CardTitle className='text-white font-bold'>Tus Productos</CardTitle>
                    <CardDescription className='text-white font-semibold'>
                        Actualiza, Elimina o edita tus productos 💯
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {/* <div> */}
                    <div>
                        <Input
                            placeholder="Filter Products"
                            value={
                                (table.getColumn("Titulo")?.getFilterValue()) ?? ""
                            }
                            onChange={(event) =>
                                table.getColumn("Titulo")?.setFilterValue(event.target.value)
                            }
                        />
                    </div>
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
    )
}

export default DataTable