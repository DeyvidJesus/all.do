import Image from "next/image"
import { useState } from "react";
import { ConfirmationPopup } from "./ConfirmationPopup";
import { useSession } from "next-auth/react";

interface DeleteTaskProps {
    id: string,
}

export function DeleteTaskButton({ id }: DeleteTaskProps) {
    const { data:session } = useSession();
    const [isConfirmationVisible, setConfirmationVisible] = useState(false);

    const handleDeleteTask = () => {
        setConfirmationVisible(true);
    };

    async function handleConfirmDelete() {
        const user_email = session?.user?.email;

        try {
            await fetch('/api/tasks/deleteTask', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, user_email }),
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
            <button className="flex flex-col items-center text-red hover:brightness-75" onClick={handleDeleteTask}>
                <Image className="sm:w-6 sm:h-6 lg:w-8 lg:h-8" src={'/trash.svg'} width={32} height={32} alt='' />
                <h2 className={`sm:text-sm md:text-lg`}>Deletar</h2>
            </button>

            {isConfirmationVisible && (
                <ConfirmationPopup
                    message="Você tem certeza que gostaria de deletar esta tarefa?"
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            )}
        </div>
    );
}