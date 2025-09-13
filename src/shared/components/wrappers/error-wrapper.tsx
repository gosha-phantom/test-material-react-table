import { cn } from "@/shared/utils/utils/class-name";


type ErrorWrapperType = {
    children: React.ReactNode
    className?: string
};


export const ErrorWrapper = (props: ErrorWrapperType) => {
    const { children, className } = props;

    return (
        <div className={cn("text-theme-red-primary text-lg", className)}>
            <i>{children}</i>
        </div>
    );
};