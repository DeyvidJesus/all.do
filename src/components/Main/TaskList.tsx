import { useEffect, useState } from "react";
import Image from "next/image";
import { AddTaskButton } from "../Sidebar/AddTaskButton";
import { TaskItem } from "./TaskItem";

interface TaskListProps {
    actualPage: string | string[],
}

interface ItemProps {
    _id: string;
    name: string;
    description: string;
    deadline: string;
    status: string;
}

type ApiDataProps = Array<ItemProps>;

export function TaskList({ actualPage }: TaskListProps) {
    const [search, setSearch] = useState('');
    const [apiData, setApiData] = useState<ApiDataProps>([]);

    useEffect(() => {
        async function FetchData() {
            const actualPageData = actualPage.toString().toLowerCase();
            let url = `/api/getTasks?actualPage=${actualPageData}`

            if (search !== '') {
                url = `/api/getTasks?actualPage=${actualPageData}&search${search}`;
            }

            const response = await fetch(url);

            const data: ApiDataProps = await response.json();
            setApiData(data);
        }

        FetchData();
    }, [])

    return (
        <div className="flex flex-col px-16 py-8 w-3/4">
            <div className="flex w-full bg-dark-blue p-2 rounded">
                <Image width={32} height={32} src="/search.svg" alt="" />
                <input type="text" name="search" id="search" placeholder="Search" className="ml-5 w-full rounded p-1 font-serif text-lg" value={search} onChange={(e) => { setSearch(e.target.value) }} />
            </div>
            <h1 className="font-serif text-4xl font-semibold my-5">{actualPage}</h1>
            <AddTaskButton />

            <ul>
                {apiData.map((item) => (
                    <TaskItem key={item._id} name={item.name} description={item.description} deadline={item.deadline} status={item.status} />
                ))}
            </ul>
        </div>
    );
}