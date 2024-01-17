import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { projectData } from "./AddTaskForm";
import Image from "next/image";

interface UpdateProjectFormProps {
    name: string,
    id: string | undefined,
    description: string,
    deadline: string,
    status: boolean,
    project: string,
    closeModal: (e: React.SyntheticEvent) => void,
}

export function UpdateTaskForm({ closeModal, name, id, description, deadline, status, project }: UpdateProjectFormProps) {
    const { data: session } = useSession();
    const [projects, setProjects] = useState([]);
    const [checked, setChecked] = useState(status);
    const [formData, setFormData] = useState({
        id,
        name,
        description,
        deadline,
        status,
        project
    });

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(`/api/projects/getProjects?user_email=${session?.user?.email}`)
                const data = await response.json();
                setProjects(data);
            } catch (err) {
                console.log("Error while fetching projects data", err)
            }
        }

        fetchProjects();
    }, [])

    function handleChange(e: React.SyntheticEvent) {
        const { name, value } = e.target as HTMLInputElement;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    async function handleUpdateTask(e: React.SyntheticEvent) {
        e.preventDefault();

        try {
            await fetch('/api/tasks/updateTask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ formData }),
            });
        } catch (error) {
            console.error('Error updating status:', error);
        }

        window.location.reload();
    }

    function handleCheckboxChange() {
        setChecked(!checked);
    };

    return (
        <form className="w-2/3 h-[28rem] bg-light-gray px-8 py-4 rounded-lg flex flex-col items-center font-serif cursor-default dark:text-black" onSubmit={handleUpdateTask}>
            <span className="w-full flex justify-between">
                <h1 className="text-2xl font-bold">Atualizar Tarefa</h1>
                <button className="text-2xl font-bold" onClick={closeModal}>X</button>
            </span>
            <div className="flex flex-col justify-between w-full h-full my-4">
                <span className="w-full flex">
                    <label className="font-semibold text-lg" htmlFor="status">Task Status:</label>

                    <input className="sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full appearance-none border-solid border-gray border checked:bg-dark-blue checked:dark:bg-royal-blue cursor-pointer dark:border-white ml-4" type="checkbox" name="status" checked={checked} onChange={handleCheckboxChange} />

                    {checked && <Image className="sm:w-4 sm:h-4 md:w-6 md:h-6 absolute ml-1 cursor-pointer mt-8" src='/verified.svg' alt='' height={24} width={24} onClick={handleCheckboxChange} />}
                </span>

                <span className="w-full">
                    <label className="font-semibold text-lg" htmlFor="name">Task Name:</label>
                    <input className="p-1 w-full border-2 rounded border-gray" type="text" name="name" id="name" onChange={handleChange} defaultValue={name} />
                </span>

                <span className="w-full flex flex-col">
                    <label className="font-semibold text-lg" htmlFor="description">Task Description:</label>
                    <input className="p-1 w-full border-2 rounded border-gray" type="text" name="description" id="description" onChange={handleChange} defaultValue={description} />
                </span>

                <span className="w-full flex flex-col">
                    <label className="font-semibold text-lg" htmlFor="description">Task Deadline:</label>
                    <input className="p-1 w-full border-2 rounded border-gray" type="date" name="deadline" id="deadline" onChange={handleChange} />
                </span>

                <select className="rounded p-1" name="project" id="project" onChange={handleChange}>
                    <option value="caixa-de-entrada">Caixa de Entrada</option>
                    {projects.length > 0 && projects.map((project: projectData) => (
                        <option key={project._id} value={project.name.toLowerCase()}>
                            {project.name}
                        </option>
                    ))}
                </select>

                <span className="w-full">
                    <button className="w-full p-2 bg-dark-blue text-white rounded font-semibold hover:opacity-90 text-lg" type="submit">Update Task</button>
                </span>
            </div>
        </form>
    );
}