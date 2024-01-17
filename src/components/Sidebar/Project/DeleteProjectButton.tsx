import Image from "next/image"
import { useState } from "react";
import { ConfirmationPopup } from "../../Main/ConfirmationPopup";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

interface DeleteProjectProps {
    id: string | undefined,
    name: string,
}

export function DeleteProjectButton({ id, name }: DeleteProjectProps) {
    const { data:session } = useSession();
    const [isConfirmationVisible, setConfirmationVisible] = useState(false);
    const router = useRouter();

    const handleDeleteTask = () => {
        setConfirmationVisible(true);
    };

    async function handleConfirmDelete() {
        const nameToLowerCase = name.toLowerCase();
        const user_email = session?.user?.email;

        try {
            await fetch('/api/projects/deleteProject', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, nameToLowerCase, user_email }),
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
                <h2 className={`sm:text-sm md:text-lg`}>Deletar</h2>
            </button>

            {isConfirmationVisible && (
                <ConfirmationPopup
                    message="Você tem certeza que quer deletar este projeto?"
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            )}
        </div>
    );
}
