import React from "react";

interface ItemProps {
    name: string,
    description: string,
    deadline: string,
    status: string
}

export function TaskItem({ name, description, deadline, status }: ItemProps) {
    return (
        <li className="flex font-serif items-center">
            {status === 'done' ? <input type="checkbox" name="" id="" className="w-6 h-6 rounded-full appearance-none border-solid border-gray border checked:bg-dark-blue" checked /> : <input type="checkbox" name="" id="" className="w-6 h-6 rounded-full appearance-none border-solid border-gray border checked:bg-dark-blue"/>}
            <div>
                <h1>{name}</h1>
                <p>{description}</p>
            </div>
            <h2>{deadline}</h2>
        </li>
    );
}