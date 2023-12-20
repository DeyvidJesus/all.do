import { TasksMenu } from "./TasksMenu";
import { Userinfo } from "./Userinfo";

export function Sidebar() {
    return (
        <aside className="flex flex-col items-center bg-white border-r-4 border-dark-blue w-1/4 h-screen font-semibold dark:text-white dark:bg-light-blue dark:border-white">
            <Userinfo />
            <TasksMenu />
        </aside>
    );
}