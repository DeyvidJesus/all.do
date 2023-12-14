import { TaskList } from "@/components/Main/TaskList";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { useRouter } from "next/router";

export default function Page() {
    const router = useRouter();
    let { slug } = router.query;
    slug === undefined ? slug = '/' : slug;

    return (
        <main className="flex">
            <Sidebar />
            <TaskList actualPage={slug}/>
        </main>
    );
}