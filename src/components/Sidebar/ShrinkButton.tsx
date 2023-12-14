import { ComponentProps } from "react";

export type ButtonProps = ComponentProps<'button'>;

export function ShrinkButton(props :ButtonProps) {
    return (
        <button className="cursor-pointer" {...props}>
            <img className="w-10" src="/shrink.svg" alt="Shrink Button" />
        </button>
    );
}