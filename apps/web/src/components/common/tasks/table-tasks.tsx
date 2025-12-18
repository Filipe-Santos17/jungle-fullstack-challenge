import { useState, useEffect } from "react"

import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

import columns from "./colums-table.js"
import ModalShowUpTask from "./modal-show-up-one-task.js"

import type { iTasks } from '@/types/tasks';

interface iDataTableTasks {
    data: iTasks[];
    handleChangePage: (page: number) => Promise<void>;
    isLoading: boolean;
    totalPages: number;
}

export default function DataTableTasks({
    data,
    handleChangePage,
    isLoading,
    totalPages
}: iDataTableTasks) {
    const [page, setPage] = useState(1)
    const [selectedTask, setSelectedTask] = useState<iTasks | null>(null)

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    function handleClickRowTable(task: iTasks) {
        setSelectedTask(task)
    }

    useEffect(() => {
        async function loadDataTable() {
            await handleChangePage(page)
        }

        loadDataTable()
    }, [page])

    return (
        <div className="space-y-4 px-4">
            <div className="rounded-md border max-h-[80vh]">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <>
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <TableRow key={index}>
                                        {columns.map((_, colIndex) => (
                                            <TableCell key={colIndex}>
                                                <div className="h-4 w-full animate-pulse rounded-md bg-muted" />
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </>
                        ) : table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    onClick={() => handleClickRowTable(row.original)}
                                    className="cursor-pointer"
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
                                <TableCell colSpan={columns.length}>
                                    Nenhum resultado
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                    Página {page} de {totalPages}
                </span>

                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={page === 1}
                        onClick={() => setPage((p) => p - 1)}
                    >
                        Anterior
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={page === totalPages}
                        onClick={() => setPage((p) => p + 1)}
                    >
                        Próxima
                    </Button>
                </div>
            </div>
            <ModalShowUpTask
                selectedTask={selectedTask}
                setSelectedTask={setSelectedTask}
            />
        </div>
    )
}
