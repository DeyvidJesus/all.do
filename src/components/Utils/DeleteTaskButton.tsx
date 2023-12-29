import Image from "next/image"
import { useState } from "react";
import { ConfirmationPopup } from "./ConfirmationPopup";

interface DeleteTaskProps {
    id: string,
}

export function DeleteTaskButton({ id }: DeleteTaskProps) {
    const [isConfirmationVisible, setConfirmationVisible] = useState(false);

    const handleDeleteTask = () => {
        setConfirmationVisible(true);
    };

    async function handleConfirmDelete() {
        try {
            await fetch('/api/deleteTask', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });

            window.location.reload();
        } catch (error) {
            console.error('Error updating status:', error);
        } finally {
            setConfirmationVisible(false);
        }
    }

    const handleCancelDelete = () => {
        setConfirmationVisible(false);
    };

    return (
        <div>
            <button className="flex flex-col items-center text-red ml-4 hover:brightness-75" onClick={handleDeleteTask}>
                <Image className="sm:w-6 sm:h-6 md:w-8 md:h-8" src={'/trash.svg'} width={32} height={32} alt='' />
                <h2 className={`sm:text-sm md:text-lg`}>Delete</h2>
            </button>

            {isConfirmationVisible && (
                <ConfirmationPopup
                    message="Are you sure you want to delete this task?"
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            )}
        </div>
    );
}