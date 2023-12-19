import { TasksMenu } from "./TasksMenu";
import { Userinfo } from "./Userinfo";

export function Sidebar() {
    return (
        <aside className="flex flex-col items-center bg-light-blue border-r-2 border-dark-blue w-1/4 h-screen font-semibold dark:text-white">
            <Userinfo />
            <TasksMenu />
        </aside>
    );
}