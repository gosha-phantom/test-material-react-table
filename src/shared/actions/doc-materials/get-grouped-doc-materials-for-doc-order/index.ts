"use server";
import { Prisma } from "@prisma/client";

import { db } from "@/shared/adapters/prisma-adapter";
import { actionPrismaErrorHandler } from "@/shared/utils/actions/action-prisma-error-handler";
import { createSafeAction } from "@/shared/utils/actions/create-safe-action";

import { 
    type InputType, type ReturnType, 
    type GetGroupedDocMaterialsForDocOrderOutputType, 
    GetGroupedDocMaterialsForDocOrderSchema, 
} from "./types";


const handler = async (data: InputType): Promise<ReturnType> => {
    const { docOrderID, hideExceptions, isActivePoses, hideLaser } = data;
    let materials: GetGroupedDocMaterialsForDocOrderOutputType[];

    // console.log({ docOrderID, hideExceptions, isActivePoses });


    try {
        // throw new Error("error");
        materials = await db.$queryRaw<GetGroupedDocMaterialsForDocOrderOutputType[]>`
            SELECT docorder.ID AS docOrderID, workshoporder.orderNo, 
                If(matNewErpNo<>'',matNewErpNo,matErpNo) AS article, docorderlayoutmaterial.matTitle, docmaterialmeasure.title AS measureTitle, 
                Sum(If(coalesce(matLength, 0)>0,(matLength+docmaterialtype.add)*matQuantity,matQuantity)) AS qty 
            FROM docmaterialtype 
                INNER JOIN (docprojectlayout 
                    INNER JOIN (docmaterialmeasure 
                        INNER JOIN (workshoporder 
                            INNER JOIN ((docorder 
                                INNER JOIN docorderlayout ON docorder.ID = docorderlayout.docOrderID) 
                                INNER JOIN docorderlayoutmaterial ON docorderlayout.ID = docorderlayoutmaterial.docOrderLayoutID) 
                            ON workshoporder.ID = docorder.workshopOrderID) 
                        ON docmaterialmeasure.ID = docorderlayoutmaterial.docMaterialMeasureID) 
                    ON docprojectlayout.ID = docorderlayout.docProjectLayoutID) 
                ON docmaterialtype.ID = docorderlayoutmaterial.docMaterialTypeID 
            WHERE docorderlayout.docOrderID = ${docOrderID} AND Abs(docmaterialtype.toWriteOff) = 1 
                ${hideExceptions ? Prisma.sql`AND Abs(docorderlayoutmaterial.isDisabled) = 0` : Prisma.empty}
                ${isActivePoses === "active" ? Prisma.sql`AND Abs(docorderlayoutmaterial.isWrittenOff) = 0` : Prisma.empty}
                ${isActivePoses === "finished" ? Prisma.sql`AND Abs(docorderlayoutmaterial.isWrittenOff) = 1` : Prisma.empty}
                ${hideLaser ? Prisma.sql`AND docMaterialTypeID <> 6` : Prisma.empty}
            GROUP BY docorder.ID, workshoporder.orderNo, If(matNewErpNo<>'',matNewErpNo,matErpNo), docorderlayoutmaterial.matTitle, 
                docmaterialmeasure.title 
            ORDER BY docorderlayoutmaterial.matTitle`;

        // console.log(materials.length);
    } catch(err) {
        const defaultErrorText = "Ошибка при получении данных с сервера!";

        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            return actionPrismaErrorHandler({ err, defaultErrorText });
        } else {
            return { serverError: defaultErrorText };
        }
    };

    return { data: materials };
};


export const getGroupedDocMaterialsForDocOrder = createSafeAction(
    GetGroupedDocMaterialsForDocOrderSchema, handler
);