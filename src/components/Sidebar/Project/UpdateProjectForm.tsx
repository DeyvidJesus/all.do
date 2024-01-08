import React, { useState } from "react";
import { DeleteProjectButton } from "./DeleteProjectButton";

interface UpdateProjectFormProps {
    name: string,
    id: string | undefined,
    color: string | undefined,
    closeModal: (e: React.SyntheticEvent) => void,
}

export function UpdateProjectForm({ closeModal, name, color, id }: UpdateProjectFormProps) {
    const [formData, setFormData] = useState({
        id,
        name,
        color,
    });

    function handleChange(e: React.SyntheticEvent) {
        const { name, value } = e.target as HTMLInputElement;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    async function handleUpdateProject(e: React.SyntheticEvent) {
        e.preventDefault();

        try {
            await fetch('/api/projects/updateProject', {
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
        <form className="w-128 h-96 bg-light-gray px-8 py-4 rounded-lg flex flex-col items-center font-serif cursor-default dark:text-black" onSubmit={handleUpdateProject}>
            <span className="w-full flex justify-between">
                <h1 className="text-2xl font-bold">Update Project Form</h1>
                <button className="text-2xl font-bold" onClick={closeModal}>X</button>
            </span>
            <div className="flex flex-col justify-between w-full h-full my-4">
                <span className="w-full">
                    <label className="font-semibold text-lg" htmlFor="name">Project Name:</label>
                    <input className="p-1 w-full border-2 rounded border-gray" type="text" name="name" id="name" onChange={handleChange} defaultValue={name} />
                </span>

                <span className="w-full flex flex-col">
                    <label className="font-semibold text-lg" htmlFor="color">Project Color:</label>
                    <small className="text-gray">Select a color to represent your project.</small>
                    <input className="w-full border-2 rounded border-gray" type="color" name="color" id="color" onChange={handleChange} defaultValue={color} />
                </span>

                <span className="w-full">
                    <button className="w-full p-2 bg-dark-blue text-white rounded font-semibold hover:opacity-90 text-lg" type="submit">Update Project</button>
                </span>
            <DeleteProjectButton id={id} name={name}/>
            </div>
        </form>
    );
}