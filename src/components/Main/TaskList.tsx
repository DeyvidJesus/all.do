import { SearchInput } from "./SearchInput"

interface TaskListProps {
    actualPage: string | string[],
}

export function TaskList({actualPage}: TaskListProps) {
    return (
        <div className="flex flex-col px-16 py-8 w-3/4">
            <SearchInput />
            <h1 className="font-serif text-4xl font-semibold my-5">{actualPage}</h1>
        </div>
    );
}