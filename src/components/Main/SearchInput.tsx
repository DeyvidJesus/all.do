import Image from "next/image";

export function SearchInput() {
    return (
        <form action="" method="get" className="flex w-full bg-dark-blue p-2 rounded">
            <button type="submit">
                <Image width={32} height={32} src="/search.svg" alt="" />
            </button>
            <input type="text" name="search" id="search" placeholder="Search" className="ml-5 w-full rounded p-1 font-serif text-lg" />
        </form>
    );
}