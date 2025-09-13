import type { Prisma } from "@prisma/client";


type ErrorHandlerType = {
    err: Prisma.PrismaClientKnownRequestError
    defaultErrorText: string
};


export const actionPrismaErrorHandler = (inputData: ErrorHandlerType) => {
    const { err, defaultErrorText } = inputData;

    switch (err.code) {
        case "P2000": return { serverError: "Слишком длинное значение для данного поля!" };
        case "P2002": return { serverError: "Дублирование данных в данном поле запрещено!" };
        case "P2003": return { serverError: "Имеются связанные строки в других таблицах!" };
        case "P2010": return { serverError: "Ошибка в SQL-запросе!" };
        default: return { serverError: defaultErrorText };
    }            
};