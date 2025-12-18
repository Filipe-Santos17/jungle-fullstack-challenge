import type { ColumnDef } from "@tanstack/react-table"
import type { iTasks } from '@/types/tasks';

const columns: ColumnDef<iTasks>[] = [
    {
        accessorKey: "titulo",
        header: "Título",
        cell: ({ row }) => (
            <p className="font-medium text-sm">{row.original.titulo}</p>
        ),
    },
    {
        accessorKey: "descricao",
        header: "Descrição",
        cell: ({ row }) => (
            <p className="text-xs text-muted-foreground line-clamp-2">
                {row.original.descricao}
            </p>
        ),
    },
    {
        accessorKey: "prazo",
        header: "Prazo",
        cell: ({ row }) => (
            <span className="text-xs">
                {new Date(row.original.prazo).toLocaleDateString()}
            </span>
        ),
    },
    {
        accessorKey: "prioridade",
        header: "Prioridade",
        cell: ({ row }) => (
            <span className="text-xs font-medium">
                {row.original.prioridade}
            </span>
        ),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <span className="text-xs text-muted-foreground">
                {row.original.status}
            </span>
        ),
    },
]

export default columns;