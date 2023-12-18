import Image from "next/image";
import { ComponentProps } from "react";

export type ButtonProps = ComponentProps<'button'>;

export function ShrinkButton(props :ButtonProps) {
    return (
        <button className="cursor-pointer" {...props}>
            <Image width={32} height={32} className="w-10" src="/shrink.svg" alt="Shrink Button" />
        </button>
    );
}