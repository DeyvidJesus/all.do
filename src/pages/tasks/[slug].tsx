import { TaskList } from "@/components/Main/TaskList";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { useRouter } from "next/router";

function Page() {
    const router = useRouter();
    const { query, isReady } = router;
    const actualPage = isReady ? (query.slug || 'Inbox') : '/';

    return (
        <main className="flex dark:bg-dark-blue">
            <Sidebar />
            <TaskList actualPage={actualPage} isReady={isReady} />
        </main>
    );
} 

export default Page;