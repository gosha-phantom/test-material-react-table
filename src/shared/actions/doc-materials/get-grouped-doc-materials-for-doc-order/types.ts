import { z } from "zod";

import type { ActionState } from "@/shared/utils/actions/create-safe-action";


const ActivePosesOptionValues = ["active", "finished", "all"] as const;

export const GetGroupedDocMaterialsForDocOrderSchema = z.object({
    docOrderID: z.coerce.number(),
    hideExceptions: z.coerce.boolean().default(true).optional(),
    isActivePoses: z.enum(ActivePosesOptionValues).default("active").optional(),
    hideLaser: z.coerce.boolean().default(false).optional(),
});


type ActionOutputType = {
    docOrderID: number
    orderNo: number
    article: string | null
    matTitle: string
    measureTitle: string
    qty: number
    // isWrittenOff: boolean
    // isDisabled: boolean
};


export type InputType = z.infer<typeof GetGroupedDocMaterialsForDocOrderSchema>;
export type ReturnType = ActionState<InputType, ActionOutputType[]>;
export type GetGroupedDocMaterialsForDocOrderInputType = InputType
export type GetGroupedDocMaterialsForDocOrderOutputType = ActionOutputType