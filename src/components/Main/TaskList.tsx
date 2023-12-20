import { useEffect, useState } from "react";
import Image from "next/image";
import { AddTaskButton } from "../AddTaskButton";
import { TaskItem } from "./TaskItem";
import { useDarkMode } from "@/context/useDarkMode";

interface TaskListProps {
    actualPage: string | string[],
    isReady: boolean
}

interface ItemProps {
    _id: string;
    name: string;
    description: string;
    deadline: string;
    status: string;
}

type ApiDataProps = Array<ItemProps>;

export function TaskList({ actualPage, isReady }: TaskListProps) {
    const { darkMode } = useDarkMode();
    const [search, setSearch] = useState('');
    const [apiData, setApiData] = useState<ApiDataProps>([]);

    let src = darkMode == true ? '/searchDark.svg' : '/search.svg'

    useEffect(() => {
        async function FetchData() {
            if (!isReady) return;

            let actualPageData = actualPage.toString().toLowerCase();
            let url = `/api/getTasks?actualPage=${actualPageData}`;

            if (search !== '') {
                actualPageData = 'search';
                url = `/api/getTasks?actualPage=${actualPageData}&search=${search}`;
            }

            const response = await fetch(url);

            const data: ApiDataProps = await response.json();
            setApiData(data);
        }

        FetchData();
    }, [actualPage, search, isReady])

    return (
        <div className="flex flex-col px-16 py-8 w-full">
            <div className="flex w-full bg-royal-blue p-2 rounded dark:bg-white">
                <Image width={32} height={32} src={src} alt="" />
                <input type="text" name="search" id="search" placeholder="Search" className="ml-5 w-full rounded p-1 font-serif text-lg" value={search} onChange={(e) => { setSearch(e.target.value) }} />
            </div>
            <h1 className="font-serif text-4xl font-semibold my-5 dark:text-white">{actualPage}</h1>
            <AddTaskButton />

            <ul className="w-full mt-3 divide-y-2 divide-royal-blue dark:divide-white">
                {apiData.map((item) => (
                    <TaskItem key={item._id} id={item._id} name={item.name} description={item.description} deadline={item.deadline} initialStatus={item.status} />
                ))}
            </ul>
        </div>
    );
}