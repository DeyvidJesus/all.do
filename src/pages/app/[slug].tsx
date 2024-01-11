import { TaskList } from "@/components/Main/TaskList";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function Page() {
    const router = useRouter();
    const { query, isReady } = router;
    const actualPage = isReady ? (query.slug || 'Inbox') : '/';
    const title = `All.do | ${actualPage}`;
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkSessionStatus = () => {
            if (status === 'unauthenticated') {
                // The user is not authenticated
                setLoading(false);
                router.push("/");
            } else if (status === 'loading') {
                // Still loading, wait and check again
                setTimeout(checkSessionStatus, 500);
            } else {
                // User is authenticated
                setLoading(false);
            }
        };

        checkSessionStatus();

        return;
    }, [session, status]);

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <main className="flex dark:bg-dark-blue">
                <Sidebar />
                <TaskList actualPage={actualPage} isReady={isReady} />
            </main>
        </>
    );
}

export default Page;