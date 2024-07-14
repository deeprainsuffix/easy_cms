import * as React from 'react';
import { cn } from "@/lib/utils"

export function Container(props: React.HTMLAttributes<HTMLDivElement>) {
    const { className, children } = props;

    return (
        <div className={cn(
            'mpg-w-full mpg-h-16 mpg-border-8 mpg-border-dashed mpg-border-orange-700 mpg-bg-neutral-300 mpg-flex mpg-justify-center mpg-items-center',
            className
        )}>
            {children || <div className='mpg-h-1/2'>容器：待拖入其他组件</div>}
        </div>
    )
}