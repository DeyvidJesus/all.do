import { useState } from "react";

export function AddTaskForm() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        deadline: ''
    })

    function handleChange(e: any) {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    async function handleAddTask(e: any) {
        e.preventDefault();

        try {
            await fetch('/api/insertTask', {
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
        <div>
            <form className="w-96 h-72 bg-light-blue p-4 rounded-lg flex flex-col items-center justify-between font-serif" onSubmit={handleAddTask}>
                <span className="w-80">
                    <label className="font-semibold" htmlFor="name">Task Name:</label>
                    <input className="px-1 w-full border-2 rounded border-gray" type="text" name="name" id="name" onChange={handleChange} />
                </span>

                <span className="w-80">
                    <label className="font-semibold" htmlFor="description">Task Description:</label>
                    <input className="px-1 w-full border-2 rounded border-gray" type="text" name="description" id="description" onChange={handleChange} />
                </span>

                <span className="w-80">
                    <label className="font-semibold" htmlFor="deadline">Task Deadline:</label>
                    <input className="px-1 w-full border-2 rounded border-gray" type="date" name="deadline" id="deadline" onChange={handleChange} />
                </span>

                <span className="w-80">
                    <button className="w-full p-2 bg-dark-blue text-white rounded font-semibold hover:opacity-90" type="submit">Add Task</button>
                </span>
            </form>
        </div>
    );
}