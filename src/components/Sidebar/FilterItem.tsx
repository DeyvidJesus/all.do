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
                <Image width={32} height={32} className="mr-4" src={icon} alt={`${name} icon`} />
                {name}
            </Link>
        </li>
    );
}