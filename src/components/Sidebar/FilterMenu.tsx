import { useDarkMode } from "@/context/useDarkMode";
import { FilterItem } from "./FilterItem";
import { useEffect, useState } from "react";
import { projectData } from "../Main/AddTaskForm";
import { useSession } from "next-auth/react";

export function FilterMenu() {
    const { data:session } = useSession();
    const { darkMode } = useDarkMode();

    let srcObj = {
        inboxSrc: darkMode == true ? '/inbox.svg' : '/inboxDark.svg',
        todaySrc: darkMode == true ? '/today.svg' : '/todayDark.svg',
        upcomingSrc: darkMode == true ? '/upcoming.svg' : '/upcomingDark.svg',
        allSrc: darkMode == true ? '/allTasks.svg' : '/allTasksDark.svg',
    }

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(`/api/projects/getProjects?user_email=${session?.user?.email}`);

                const data = await response.json();
                setProjects(data);
            } catch (err) {
                console.log("Error while fetching projects data", err)
            }
        }

        fetchProjects();
    }, [session, projects])

    return (
        <ul>
            <FilterItem icon={srcObj.inboxSrc} name="Inbox" />
            <FilterItem icon={srcObj.todaySrc} name="Today" />
            <FilterItem icon={srcObj.upcomingSrc} name="Upcoming" />
            <FilterItem icon={srcObj.allSrc} name="All" />
            {projects.length > 0 && projects.map((project: projectData) => (
                <FilterItem key={project._id} icon={""} id={project._id} name={project.name} color={project.color}/>
            ))}
        </ul>
    );
}