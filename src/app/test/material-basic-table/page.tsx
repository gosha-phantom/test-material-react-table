import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient } from "@/shared/adapters/query-client";

import { getGroupedDocMaterialsForDocOrderQueryOptions } from "@/shared/queries/doc-materials";

import { TableDataWrapper } from "./components/tableDataWrapper";


export default async function Page() {

    const queryClient = getQueryClient();

    await queryClient.prefetchQuery({ 
        ...getGroupedDocMaterialsForDocOrderQueryOptions({ docOrderID: 54 }) 
    });


    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <TableDataWrapper />
        </HydrationBoundary>
    );
};