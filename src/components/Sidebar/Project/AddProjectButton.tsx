import Image from "next/image";
import { ComponentProps } from "react";

type ButtonProps = ComponentProps<'button'>;

export function AddProjectButton(props: ButtonProps) {
    return (
        <button className="flex items-center bg-gray rounded p-1 hover:brightness-90 text-white mt-2" {...props}>
            <Image width={36} height={36} className="mr-2 sm:w-6 sm:h-6 lg:w-8 lg:h-8" src="/addTask.svg" alt="Image of a plus sign" />
            <p className="font-serif sm:text-lg lg:text-xl">Adicionar Projeto</p>
        </button>
    );
}