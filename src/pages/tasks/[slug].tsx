import { TaskList } from "@/components/Main/TaskList";
import { Sidebar } from "@/components/Sidebar/Sidebar";

export default function Page() {

    return (
        <main>
            <Sidebar />
            <TaskList />
        </main>
    );
}