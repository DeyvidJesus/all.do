import Image from "next/image";
import Link from "next/link";
import CircleIcon from "../CircleIcon";
import { useState } from "react";
import { UpdateProjectForm } from "./Project/UpdateProjectForm";

interface FilterItemProps {
    id?: string,
    icon: string,
    name: string,
    color?: string,
}

export function FilterItem({ id, icon, name, color }: FilterItemProps) {
    const [isProjectFormVisible, setIsProjectFormVisible] = useState(false);

    function closeModal(e: React.SyntheticEvent) {
        if (e.target === e.currentTarget) {
            setIsProjectFormVisible(false);
        }
    }

    let url;
    url = `/tasks/${name}`;

    return (
        <li className="border-b-2 rounded border-royal-blue mt-4 dark:border-white">
            <Link className="flex items-center font-serif text-xl cursor-pointer hover:underline hover:bg-royal-blue rounded px-1 py-2 w-full justify-between" href={url}>
                <span className="flex">
                    {icon !== "" ? (
                        <Image width={36} height={36} className="sm:w-7 sm:h-7  lg:w-8 lg:h-8" src={icon} alt={`${name} icon`} />
                    ) : (
                        <CircleIcon color={color} />
                    )}
                    <p className="sm:text-lg lg:text-xl xl:text-2xl ml-4">{name}</p>
                </span>
                {icon === "" && (
                    <span onClick={() => setIsProjectFormVisible(!isProjectFormVisible)}>
                        <Image width={36} height={36} className="sm:w-7 sm:h-7 lg:w-8 lg:h-8 " src="/threeDots.svg" alt={`${name} icon`} />
                    </span>
                )}
            </Link>

            {isProjectFormVisible && (
                <div className="fixed w-full top-0 left-0 h-full flex justify-center items-center bg-transparent-gray" onClick={closeModal}>
                    <UpdateProjectForm closeModal={closeModal} id={id} name={name} color={color} />
                </div>
            )}
        </li>
    );
}