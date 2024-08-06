import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface T_options {
    readonly value: string;
    readonly text: string;
};

export interface I_SelectSingle {
    options: readonly T_options[];
    defaultValue?: string;
    placeholder?: string;
    className?: string;
    onValueChange?: (value: string) => void;
}

export function SelectSingle(props: I_SelectSingle) {
    const { options, defaultValue, placeholder, className, onValueChange } = props;

    return (
        <Select defaultValue={defaultValue} onValueChange={onValueChange}>
            <SelectTrigger className={className}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {
                        options.length
                            ?
                            options.map(({ value, text }) => <SelectItem key={value} value={value}>{text}</SelectItem>)
                            :
                            <SelectLabel>无内容</SelectLabel>
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
