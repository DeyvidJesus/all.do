import Link from "next/link";

interface FilterItemProps {
    icon: string,
    name: string,
}

export function FilterItem({icon, name}: FilterItemProps) {
    let url;
    if (name === "Inbox") {
        url = '/';
    } else {
        url = `/tasks/${name}`;
    }

    return (
        <li className="border-b-2 rounded border-dark-blue mt-4">
            <Link className="flex items-center text-white font-serif text-xl cursor-pointer hover:underline hover:bg-dark-blue rounded px-1 py-2" href={url}>
            <img className="w-8 mr-4" src={icon} alt={`${name} icon`} />
            {name}
            </Link>
        </li>
    );
}