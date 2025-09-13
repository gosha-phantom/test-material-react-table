import { queryOptions, useQuery } from "@tanstack/react-query";

import { 
    getGroupedDocMaterialsForDocOrder, 
} from "@/shared/actions/doc-materials/get-grouped-doc-materials-for-doc-order";
import type { 
    GetGroupedDocMaterialsForDocOrderInputType, 
} from "@/shared/actions/doc-materials/get-grouped-doc-materials-for-doc-order/types";


type Props = GetGroupedDocMaterialsForDocOrderInputType;

const baseKey = "getGroupedDocMaterialsForDocOrder"; 


export const getGroupedDocMaterialsForDocOrderQueryOptions = (props: Props) => {
    return queryOptions({
        queryKey: [baseKey, props],
        queryFn: () => getGroupedDocMaterialsForDocOrder(props),
        staleTime: 0,
    });
};

export function useGetGroupedDocMaterialsForDocOrderQuery(props: Props) {
    return useQuery({ 
        ...getGroupedDocMaterialsForDocOrderQueryOptions(props)
    });
};
