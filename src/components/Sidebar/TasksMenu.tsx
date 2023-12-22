import { AddTaskButton } from "../AddTaskButton";
import { FilterMenu } from "./FilterMenu";

interface TasksMenuProps {
    isShrunk: boolean,
}

export function TasksMenu({isShrunk}: TasksMenuProps) {
    return (
        <div className={`flex flex-col ${isShrunk ? 'hidden' : 'sm:w-11/12 lg:w-10/12'} mb-10`}>
            <AddTaskButton />
            <FilterMenu />
        </div>
    );
}