import { useSession } from "next-auth/react";
import React, { useState } from "react";

interface AddProjectFormProps {
    closeModal: (e: React.SyntheticEvent) => void
}

export function AddProjectForm({closeModal}: AddProjectFormProps) {
    const { data:session } = useSession();

    const [formData, setFormData] = useState({
        name: '',
        color: '#000',
        user_email: session?.user?.email,
    })

    function handleChange(e: React.SyntheticEvent) {
        const { name, value } = e.target as HTMLInputElement;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    async function handleAddProject(e: React.SyntheticEvent) {
        e.preventDefault();

        try {
            await fetch('/api/projects/insertProject', {
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
        <form className="w-2/3 h-[20rem] bg-light-gray px-8 py-4 rounded-lg flex flex-col items-center font-serif dark:text-black" onSubmit={handleAddProject}>
            <span className="w-full flex justify-between">
                <h1 className="text-2xl font-bold">Adicionar Projeto</h1>
                <button className="text-2xl font-bold" onClick={closeModal}>X</button>
            </span>
            <div className="flex flex-col justify-between w-full h-full my-4">
                <span className="w-full">
                    <label className="font-semibold text-lg" htmlFor="name">Nome do Projeto:</label>
                    <input className="p-1 w-full border-2 rounded border-gray" type="text" name="name" id="name" onChange={handleChange} required/>
                </span>

                <span className="w-full flex flex-col">
                    <label className="font-semibold text-lg" htmlFor="color">Cor do Projeto:</label>
                    <small className="text-gray">Selecione uma cor para representar seu projeto.</small>
                    <input className=" w-full border-2 rounded border-gray" type="color" name="color" id="color" onChange={handleChange} defaultValue={formData.color} required/>
                </span>

                <span className="w-full">
                    <button className="w-full p-2 bg-dark-blue text-white rounded font-semibold hover:opacity-90 text-lg" type="submit">Adicionar Projeto</button>
                </span>
            </div>
        </form>
    );
}