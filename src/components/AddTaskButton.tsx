import Image from "next/image";

export function AddTaskButton() {
    return (
        <button className="flex items-center bg-royal-blue rounded p-1 hover:brightness-90 text-white">
            <Image width={36} height={36} className="mr-2 sm:w-7 sm:h-7 lg:w-8 lg:h-8" src="/addTask.svg" alt="Image of a plus sign" />
            <p className="font-serif sm:text-lg lg:text-xl">Add Task</p>
        </button>
    );
}