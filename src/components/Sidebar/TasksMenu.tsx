import { useState } from "react";
import { AddProjectButton } from "./Project/AddProjectButton";
import { FilterMenu } from "./FilterMenu";
import { AddProjectForm } from "./Project/AddProjectForm";

interface TasksMenuProps {
    isShrunk: boolean,
}

export function TasksMenu({ isShrunk }: TasksMenuProps) {
    const [isAddProjectFormVisible, setIsAddProjectFormVisible] = useState(false);

    function closeModal(e: React.SyntheticEvent) {
        if (e.target === e.currentTarget) {
            setIsAddProjectFormVisible(false);
        }
    }

    return (
        <>
            <div className={`flex flex-col ${isShrunk ? 'hidden' : 'sm:w-11/12 lg:w-10/12'} mb-10`}>
                <AddProjectButton onClick={() => setIsAddProjectFormVisible(!isAddProjectFormVisible)} />
                <FilterMenu />
            </div>

            {isAddProjectFormVisible &&
                <div className="absolute w-screen top-0 left-0 h-screen flex justify-center items-center bg-transparent-gray" onClick={closeModal}>
                    <AddProjectForm closeModal={closeModal} />
                </div>
            }
        </>
    );
}