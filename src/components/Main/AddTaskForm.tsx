import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

interface AddTaskFormProps {
    closeModal: (e: React.SyntheticEvent) => void
}

export interface projectData {
    name: string,
    color: string,
    _id: string,
}

export function AddTaskForm({ closeModal }: AddTaskFormProps) {
    const { data:session } = useSession();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        deadline: '',
        project: 'inbox',
        user_email: session?.user?.email,
    });

    const [projects, setProjects] = useState([]);

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

    async function handleAddTask(e: React.SyntheticEvent) {
        e.preventDefault();

        try {
            await fetch('/api/tasks/insertTask', {
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

    return (
        <form className="w-128 h-[28rem] bg-light-blue px-8 py-4 rounded-lg flex flex-col items-center font-serif" onSubmit={handleAddTask}>
            <span className="w-full flex justify-between">
                <h1 className="text-2xl font-bold">Add Task Form</h1>
                <button className="text-2xl font-bold" onClick={closeModal}>X</button>
            </span>
            <div className="flex flex-col justify-between w-full h-full my-4">
                <span className="w-full">
                    <label className="font-semibold text-lg" htmlFor="name">Task Name:</label>
                    <input className="p-1 w-full border-2 rounded border-gray" type="text" name="name" id="name" onChange={handleChange} />
                </span>

                <span className="w-full">
                    <label className="font-semibold text-lg" htmlFor="description">Task Description:</label>
                    <input className="p-1 w-full border-2 rounded border-gray" type="text" name="description" id="description" onChange={handleChange} />
                </span>

                <span className="w-full">
                    <label className="font-semibold text-lg" htmlFor="deadline">Task Deadline:</label>
                    <input className="p-1 w-full border-2 rounded border-gray" type="date" name="deadline" id="deadline" onChange={handleChange} />
                </span>

                <span className="w-full flex flex-col">
                    <label className="font-semibold text-lg" htmlFor="project">Task Project:</label>
                    <select className="rounded p-1" name="project" id="project" onChange={handleChange}>
                        <option value="inbox">Inbox</option>
                        {projects.length > 0 && projects.map((project: projectData) => (
                            <option key={project._id} value={project.name.toLowerCase()}>
                                {project.name}
                            </option>
                        ))}
                    </select>
                </span>

                <span className="w-full">
                    <button className="w-full p-2 bg-dark-blue text-white rounded font-semibold hover:opacity-90 text-lg" type="submit">Add Task</button>
                </span>
            </div>
        </form>
    );
}