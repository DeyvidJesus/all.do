import { FilterItem } from "./FilterItem";

export function FilterMenu() {
    return (
        <ul>
            <FilterItem icon="/inbox.svg" name="Inbox" />
            <FilterItem icon="/today.svg" name="Today" />
            <FilterItem icon="/upcoming.svg" name="Upcoming" />
            <FilterItem icon="/allTasks.svg" name="All" />
        </ul>
    );
}