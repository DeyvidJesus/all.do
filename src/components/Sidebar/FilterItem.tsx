import Image from "next/image";
import Link from "next/link";

interface FilterItemProps {
    icon: string,
    name: string,
}

export function FilterItem({ icon, name }: FilterItemProps) {
    let url;
    if (name === "Inbox") {
        url = '/';
    } else {
        url = `/tasks/${name}`;
    }

    return (
        <li className="border-b-2 rounded border-royal-blue mt-4 dark:border-white">
            <Link className="flex items-center font-serif text-xl cursor-pointer hover:underline hover:bg-royal-blue rounded px-1 py-2" href={url}>
                <Image width={36} height={36} className="sm:w-7 sm:h-7 mr-4 lg:w-8 lg:h-8" src={icon} alt={`${name} icon`} />
                <p className="sm:text-lg lg:text-xl xl:text-2xl">{name}</p>
            </Link>
        </li>
    );
}