import { useDarkMode } from "@/context/useDarkMode";
import Image from "next/image";
import React, { useState } from "react";
import { DeleteTaskButton } from "./DeleteTaskButton";
import { parse, getDay } from 'date-fns';

interface ItemProps {
    id: string,
    name: string,
    description: string,
    deadline: string,
    initialStatus: string
}

export function TaskItem({ id, name, description, deadline, initialStatus }: ItemProps) {
    const { darkMode } = useDarkMode();
    const [status, setStatus] = useState(initialStatus);
    const [checked, setChecked] = useState(status === 'done');

    let calendarSrc = darkMode == true ? '/calendarDark.svg' : '/calendar.svg';

    function handleCheckboxChange() {
        const newChecked = !checked;
        setChecked(newChecked);

        const newStatus = newChecked ? 'done' : 'pending';
        setStatus(newStatus);

        updateBackendStatus(newStatus);
    };

    async function updateBackendStatus(newStatus: string) {
        try {
            await fetch('/api/updateStatus', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: id, newStatus }),
            });
        } catch (error) {
            console.error('Error updating status:', error);
        }
    }

    function getDayOfWeek(date: string) {
        const parsedDate = parse(date, 'MM/dd/yyyy', new Date());
        const dayIndex = getDay(parsedDate);
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return daysOfWeek[dayIndex];
    }

    const dayOfWeek = getDayOfWeek(deadline);

    return (
        <li className="flex font-serif items-center py-3 w-full dark:text-white">
            <input className="sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full appearance-none border-solid border-gray border checked:bg-dark-blue checked:dark:bg-royal-blue cursor-pointer dark:border-white" type="checkbox" checked={checked} onChange={handleCheckboxChange} />

            {checked && <Image className="sm:w-4 sm:h-4 md:w-6 md:h-6 absolute ml-1 cursor-pointer" src='/verified.svg' alt='' height={24} width={24} onClick={handleCheckboxChange} />}

            <div className="ml-4">
                <h1 className={`font-bold md:text-lg lg:text-xl ${checked ? 'line-through' : ''}`}>{name}</h1>
                <p className={`md:text-base lg:text-lg ${checked ? 'line-through' : ''}`}>{description}</p>
            </div>
            <div className="flex flex-col items-center ml-auto w-24">
                <Image className="sm:w-6 sm:h-6 md:w-8 md:h-8" src={calendarSrc} alt='' width={32} height={32} />
                <h2 className={`sm:text-sm md:text-lg ${checked ? 'line-through' : ''}`}>{dayOfWeek}</h2>
            </div>
            <div>
                <DeleteTaskButton id={id} />
            </div>
        </li>
    );
}