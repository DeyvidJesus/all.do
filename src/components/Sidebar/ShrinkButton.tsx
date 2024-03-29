import { useDarkMode } from "@/context/useDarkMode";
import Image from "next/image";
import { ComponentProps } from "react";

type ButtonProps = ComponentProps<'button'>;

export function ShrinkButton(props :ButtonProps) {
    const { darkMode } = useDarkMode();

    let shrinkSrc = darkMode == true ? '/shrink.svg' : '/shrinkDark.svg';

    return (
        <button {...props}>
            <Image className="sm:w-6 sm:h-6 xl:w-10 xl:h-10" width={36} height={36} src={shrinkSrc} alt="Shrink Button"/>
        </button>
    );
}