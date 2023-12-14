interface FilterItemProps {
    icon: string,
    name: string,
}

export function FilterItem({icon, name}: FilterItemProps) {
    return (
        <li className="border-b-2 rounded border-dark-blue mt-4">
            <a className="flex items-center text-white font-serif text-xl cursor-pointer hover:underline hover:bg-dark-blue rounded px-1 py-2" href="">
            <img className="w-8 mr-4" src={icon} alt={`${name} icon`} />
            {name}
            </a>
        </li>
    );
}