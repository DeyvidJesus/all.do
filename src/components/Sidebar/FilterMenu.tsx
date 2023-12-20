import { useDarkMode } from "@/context/useDarkMode";
import { FilterItem } from "./FilterItem";

export function FilterMenu() {
    const { darkMode } = useDarkMode();

    let srcObj = {
        inboxSrc: darkMode == true ? '/inbox.svg' : '/inboxDark.svg',
        todaySrc: darkMode == true ? '/today.svg' : '/todayDark.svg',
        upcomingSrc: darkMode == true ? '/upcoming.svg' : '/upcomingDark.svg',
        allSrc: darkMode == true ? '/allTasks.svg' : '/allTasksDark.svg',
    }

    return (
        <ul>
            <FilterItem icon={srcObj.inboxSrc} name="Inbox" />
            <FilterItem icon={srcObj.todaySrc} name="Today" />
            <FilterItem icon={srcObj.upcomingSrc} name="Upcoming" />
            <FilterItem icon={srcObj.allSrc} name="All" />
        </ul>
    );
}