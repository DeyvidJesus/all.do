import { useEffect, useState } from "react";
import Image from "next/image";
import { AddTaskButton } from "./AddTaskButton";
import { TaskItem } from "./TaskItem";
import { useDarkMode } from "@/context/useDarkMode";
import { AddTaskForm } from "./AddTaskForm";
import { useSession } from "next-auth/react";

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
    project: string,
}

type ApiDataProps = Array<ItemProps>;

export function TaskList({ actualPage, isReady }: TaskListProps) {
    const { data:session } = useSession();
    const { darkMode } = useDarkMode();
    const [search, setSearch] = useState('');
    const [apiData, setApiData] = useState<ApiDataProps>([]);
    const [isAddTaskFormVisible, setIsAddTaskFormVisible] = useState(false);

    let src = darkMode == true ? '/searchDark.svg' : '/search.svg'

    useEffect(() => {
        async function FetchData() {
            if (!isReady) return;

            let actualPageData = actualPage.toString().toLowerCase();
            let url = `/api/tasks/getTasks?actualPage=${actualPageData}&user_email=${session?.user?.email}`;

            if (search !== '') {
                actualPageData = 'search';
                url = `/api/tasks/getTasks?actualPage=${actualPageData}&user_email=${session?.user?.email}&search=${search}`;
            }

            const response = await fetch(url);

            const data: ApiDataProps = await response.json();
            setApiData(data);
        }

        FetchData();
    }, [actualPage, search, isReady, apiData]);

    function closeModal(e: React.SyntheticEvent) {
        if (e.target === e.currentTarget) {
            setIsAddTaskFormVisible(false);
        }
    }

    return (
        <div className="flex flex-col sm:px-8 md:px-16 py-8 w-full min-h-screen h-full">
            <div className="flex items-center w-full bg-royal-blue p-2 rounded dark:bg-white">
                <Image className="sm:w-7 sm:h-7" width={32} height={32} src={src} alt="" />
                <input type="text" name="search" id="search" placeholder="Search" className="ml-5 w-full rounded p-1 font-serif text-lg" value={search} onChange={(e) => { setSearch(e.target.value) }} />
            </div>
            <h1 className="font-serif sm:text-2xl md:text-3xl lg:text-4xl font-semibold my-5 dark:text-white">{actualPage}</h1>
            <AddTaskButton onClick={() => setIsAddTaskFormVisible(!isAddTaskFormVisible)} />

            {isAddTaskFormVisible &&
                <div className="fixed w-full top-0 left-0 h-full flex justify-center items-center bg-transparent-gray scroll" onClick={closeModal}>
                    <AddTaskForm closeModal={closeModal}/>
                </div>
            }

            <ul className="w-full mt-3 divide-y-2 divide-royal-blue dark:divide-white">
                {apiData.map((item) => (
                    <TaskItem key={item._id} id={item._id} name={item.name} description={item.description} deadline={item.deadline} initialStatus={item.status} project={item.project}/>
                ))}
            </ul>

        </div>
    );
}