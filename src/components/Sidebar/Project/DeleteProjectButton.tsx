import Image from "next/image"
import { useState } from "react";
import { ConfirmationPopup } from "../../Main/ConfirmationPopup";
import { useRouter } from "next/router";

interface DeleteProjectProps {
    id: string | undefined,
}

export function DeleteProjectButton({ id }: DeleteProjectProps) {
    const [isConfirmationVisible, setConfirmationVisible] = useState(false);
    const router = useRouter();

    const handleDeleteTask = () => {
        setConfirmationVisible(true);
    };

    async function handleConfirmDelete() {
        try {
            await fetch('/api/projects/deleteProject', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });

            await router.push('/tasks/Inbox');
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
        <div className="self-center">
            <button type="button" className="flex flex-col items-center text-red ml-4 hover:brightness-75" onClick={handleDeleteTask}>
                <Image src={'/trash.svg'} width={24} height={24} alt='' />
                <h2 className={`sm:text-sm md:text-lg`}>Delete</h2>
            </button>

            {isConfirmationVisible && (
                <ConfirmationPopup
                    message="Are you sure you want to delete this project?"
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            )}
        </div>
    );
}
