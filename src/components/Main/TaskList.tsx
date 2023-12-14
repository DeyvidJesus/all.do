import { useRouter } from "next/router";

export function TaskList() {
    const router = useRouter();
    let { slug } = router.query;
    slug === undefined ? slug = '/' : slug;

    return (
        <div>

        </div>
    );
}