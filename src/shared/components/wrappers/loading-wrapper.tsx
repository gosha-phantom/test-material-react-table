import type { ReactNode } from "react";

import { cn } from "@/shared/utils/utils/class-name";


type SizesType = "sm" | "md" | "lg"; 

type Sizes = Record<SizesType, number>;

type LoadingType = {
    text?: string
    className?: string
    onlySpinner?: boolean
    size?: SizesType
    children?: ReactNode
};


const sizesArray: Sizes = {
    "sm": 4, "md": 6, "lg": 8
};


export const LoadingWrapper = (props: LoadingType) => {
    const { 
        text = "Пожалуйста, подождите. Идет загрузка данных...", 
        className, onlySpinner = false, size = "lg", children,
    } = props;

    return (
        <div className={cn("flex gap-2 md:gap-4 m-2 items-center", className)}>
            <output
                className={cn(
                    "inline-block animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] ",
                    `h-${sizesArray[size]} w-${sizesArray[size]}`
                )}
            />            
            {!onlySpinner && !children && (
                <p className="italic">{text}</p>
            )}
            {children && <>{children}</>}
        </div>
    );
};