import { useEffect, useState } from "react";
import Image from "next/image";
import { AddTaskButton } from "../Sidebar/AddTaskButton";

interface TaskListProps {
    actualPage: string | string[],
}

export function TaskList({ actualPage }: TaskListProps) {
    const [search, setSearch] = useState('');

    useEffect(() => {
        async function FetchData() {
            const actualPageData = actualPage.toString().toLowerCase();
            let response = await fetch(`/api/getTasks?actualPage=${actualPageData}`);
            
            if (search !== '') {
                response = await fetch(`/api/getTasks?actualPage=${actualPageData}&search${search}`);
            }

            const data = await response.json();
            console.log(data);
        }

        FetchData();
    }, [])

    return (
        <div className="flex flex-col px-16 py-8 w-3/4">
            <div className="flex w-full bg-dark-blue p-2 rounded">
                <Image width={32} height={32} src="/search.svg" alt="" />
                <input type="text" name="search" id="search" placeholder="Search" className="ml-5 w-full rounded p-1 font-serif text-lg" value={search} onChange={(e) => {setSearch(e.target.value)}}/>
            </div>
            <h1 className="font-serif text-4xl font-semibold my-5">{actualPage}</h1>
            <AddTaskButton />

            
        </div>
    );
}