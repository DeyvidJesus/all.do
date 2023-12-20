import { useDarkMode } from "@/context/useDarkMode";
import Image from "next/image";
import { ComponentProps } from "react";

export type ButtonProps = ComponentProps<'button'>;

export function ShrinkButton(props :ButtonProps) {
    const { darkMode } = useDarkMode();

    let shrinkSrc = darkMode == true ? '/shrink.svg' : '/shrinkDark.svg';

    return (
        <button className="cursor-pointer" {...props}>
            <Image width={32} height={32} className="w-10" src={shrinkSrc} alt="Shrink Button" />
        </button>
    );
}