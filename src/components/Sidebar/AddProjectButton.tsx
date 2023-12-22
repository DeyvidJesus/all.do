import Image from "next/image";

export function AddProjectButton() {
    return (
        <button className="flex items-center bg-gray rounded p-1 hover:brightness-90 text-white mt-2">
            <Image width={36} height={36} className="mr-2 sm:w-6 sm:h-6 lg:w-8 lg:h-8" src="/addTask.svg" alt="Image of a plus sign" />
            <p className="font-serif sm:text-lg lg:text-xl">Add Project</p>
        </button>
    );
}