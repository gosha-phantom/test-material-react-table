"use client";
import type { ReactNode } from "react";

import type { ActionState } from "@/shared/utils/actions/create-safe-action";

import { ErrorWrapper } from "./error-wrapper";
import { LoadingWrapper } from "./loading-wrapper";


type Props<InputType, OutputType> = {
    children: ReactNode
    data?: ActionState<InputType, OutputType>
    isPending: boolean
    isPendingText?: string
    isError: boolean
    error: Error | null
    messageForUser: string

};


export const QueryErrorClientWrapper =<InputType, OutputType> (props: Props<InputType, OutputType>) => {
    const { 
        children, messageForUser,
        data, isPending, isPendingText, isError, error, 
    } = props;


    if (isPending) return (<LoadingWrapper size="sm" text={isPendingText} />);
    if (isError) return (<ErrorWrapper>{error?.message}</ErrorWrapper>);
    if (data?.serverError) return (<ErrorWrapper>{data.serverError}</ErrorWrapper>);
    if (!data?.data || (data.data && Array.isArray(data.data) && data.data.length === 0)) return (
        <ErrorWrapper className="p-1">{messageForUser}</ErrorWrapper>
    );

    return children;
};