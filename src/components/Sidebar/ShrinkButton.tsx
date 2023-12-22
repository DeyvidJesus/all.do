import { useDarkMode } from "@/context/useDarkMode";
import Image from "next/image";
import { ComponentProps } from "react";

export type ButtonProps = ComponentProps<'button'>;

export function ShrinkButton(props :ButtonProps) {
    const { darkMode } = useDarkMode();

    let shrinkSrc = darkMode == true ? '/shrink.svg' : '/shrinkDark.svg';

    return (
        <button className="cursor-pointer" {...props}>
            <Image className="sm:w-8 sm:h-8 xl:w-10 xl:h-10" width={36} height={36} src={shrinkSrc} alt="Shrink Button"/>
        </button>
    );
}