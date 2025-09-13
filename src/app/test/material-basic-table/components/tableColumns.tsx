/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useMemo } from "react";
import type { MRT_ColumnDef } from "material-react-table";

import type { 
    GetGroupedDocMaterialsForDocOrderOutputType, 
} from "@/shared/actions/doc-materials/get-grouped-doc-materials-for-doc-order/types";
import { maxSize } from "zod";


export const useTableColumns = () => {

    const columns: MRT_ColumnDef<GetGroupedDocMaterialsForDocOrderOutputType>[] = useMemo(() => [
        { // material article
            accessorKey: "article", 
            header: "Артикул",
            size: 200,
            maxSize: 400,
            // meta: { columnClassName: "max-w-24", filterInputClassName: "max-w-24" },
            // cell: ({ getValue }) => (<div className="text-center px-1">{getValue<string>()}</div>),
        }, 
        { // material title
            accessorKey: "matTitle", 
            header: "Название ТМЦ",
            size: 500,
            maxSize: 1000,
            // meta: { columnClassName: "max-w-16", filterInputClassName: "max-w-20" },
            // cell: ({ getValue }) => (<div className="text-start px-1">{getValue<string>()}</div>),
        }, 
        { // measure title
            accessorKey: "measureTitle", 
            header: "ЕИ",
            size: 100, 
            maxSize: 200,
            // meta: { columnClassName: "max-w-16", filterInputClassName: "max-w-20" },
            // cell: ({ getValue }) => (<div className="text-center px-1">{getValue<string>()}</div>),
        }, 
        { // measure title
            accessorKey: "qty", 
            header: "Кол-во",
            size: 150, 
            maxSize: 200,

            // meta: { columnClassName: "max-w-16", filterInputClassName: "max-w-20" },
            // cell: ({ getValue }) => (<div className="text-center px-1">{Math.round(getValue<number>() * 1000) / 1000}</div>),
            // footer: ({ table: { getRowModel }}) => {
            //     const sumQty = Math.floor(getRowModel().rows.reduce((acc, row) => (acc + row.original.qty), 0) * 1000) / 1000;
            //     return (<p className="text-center px-1">{sumQty}</p>);
            // },
        }, 
     // eslint-disable-next-line react-hooks/exhaustive-deps
    ], []);

    return { memoizedColumns: columns };
};
