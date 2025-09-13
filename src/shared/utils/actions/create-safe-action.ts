import type { z } from "zod";

export type InputErrors<T> = {
    [K in keyof T]: string[]
};

export type ActionState<TInput, TOutput> = {
    inputErrors?: InputErrors<TInput>
    serverError?: string | null
    data?: TOutput | null
};

export const createSafeAction = <TInput, TOutput>(
    schema: z.Schema<TInput>,
    handler: (validatedData: TInput) => Promise<ActionState<TInput, TOutput>>
) => {
    return async (data: TInput): Promise<ActionState<TInput, TOutput>> => {
        const validatedResult = schema.safeParse(data);
        if (!validatedResult.success) {
            return {
                inputErrors: validatedResult.error.flatten().fieldErrors as InputErrors<TInput>
            };
        };
        return handler(validatedResult.data);
    };
};