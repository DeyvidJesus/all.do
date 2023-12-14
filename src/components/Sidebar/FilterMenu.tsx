import { FilterItem } from "./FilterItem";

export function FilterMenu() {
    return (
        <ul>
            <FilterItem icon="search.svg" name="Search" />
            <FilterItem icon="inbox.svg" name="Inbox" />
            <FilterItem icon="today.svg" name="Today" />
            <FilterItem icon="allTasks.svg" name="All" />
        </ul>
    );
}