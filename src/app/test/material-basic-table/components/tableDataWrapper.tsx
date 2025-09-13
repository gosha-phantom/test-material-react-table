"use client";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { MRT_Localization_RU } from "material-react-table/locales/ru";

import { useGetGroupedDocMaterialsForDocOrderQuery } from "@/shared/queries/doc-materials";

import { QueryErrorClientWrapper } from "@/shared/components/wrappers/query-error-client-wrapper";
import { useTableColumns } from "./tableColumns";


export function TableDataWrapper() {

    const { data: materials, isPending, isError, error } = useGetGroupedDocMaterialsForDocOrderQuery({
        docOrderID: 54, hideExceptions: true, isActivePoses: "active", hideLaser: false,
    });

    const { memoizedColumns } = useTableColumns();

    const table = useMaterialReactTable({
        data: materials?.data ?? [],
        columns: memoizedColumns,
        enableStickyHeader: true,
        enableStickyFooter: true,
        enablePagination: false,
        enableColumnResizing: true,
        columnResizeMode: "onChange",
        enableColumnOrdering: true,
        localization: MRT_Localization_RU
    });


    return (
        <QueryErrorClientWrapper
            data={materials}
            isPending={isPending}
            isPendingText="Пожалуйста, подождите. Идет загрузка данных и формирование таблицы."
            isError={isError}
            error={error}
            messageForUser="Список сгруппированных материалов пуст."
        >
            <MaterialReactTable table={table} />
        </QueryErrorClientWrapper>

    );
};