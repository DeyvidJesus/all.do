import Image from "next/image";

export function AddTaskButton() {
    return (
        <button className="flex items-center bg-dark-blue rounded p-1 hover:brightness-90 dark:text-white">
            <Image width={36} height={36} className="mr-2" src="/addTask.svg" alt="Image of a plus sign" />
            <p className="font-serif text-xl">Add Task</p>
        </button>
    );
}