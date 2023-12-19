import { AddTaskButton } from "../AddTaskButton";
import { FilterMenu } from "./FilterMenu";

export function TasksMenu() {
    return (
        <div className="flex flex-col w-72 mt-36">
            <AddTaskButton />
            <FilterMenu />
        </div>
    );
}