"use client";
import type { ReactNode } from "react";
import { getQueryClient } from "../adapters/query-client";
import { QueryClientProvider } from "@tanstack/react-query";


const queryClient = getQueryClient();

export function QueryClientProviderWrapper({ children }:{ children: ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};