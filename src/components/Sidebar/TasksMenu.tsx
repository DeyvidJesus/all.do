import { AddTaskButton } from "../AddTaskButton";
import { FilterMenu } from "./FilterMenu";

interface TasksMenuProps {
    isShrunk: boolean,
}

export function TasksMenu({isShrunk}: TasksMenuProps) {
    return (
        <div className={`flex flex-col ${isShrunk ? 'hidden' : 'w-72'} mt-36`}>
            <AddTaskButton />
            <FilterMenu />
        </div>
    );
}