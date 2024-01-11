import { useDarkMode } from "@/context/useDarkMode";
import Image from "next/image";
import { ReactNode, useEffect, useRef, useState } from "react";
import { DarkModeToggle } from "../DarkModeToggle";
import { signOut } from "next-auth/react";
import Link from "next/link";

interface UserInfo {
    username: string | undefined | null,
    isShrunk: boolean,
    children: ReactNode,
}

export function DropdownMenu({ username, isShrunk, children }: UserInfo) {
    const { darkMode } = useDarkMode();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    let srcObj = {
        userImgSrc: darkMode == true ? '/userImg.svg' : '/userImgDark.svg',
        downArrowSrc: darkMode == true ? '/downArrow.svg' : '/downArrowDark.svg',
    }

    useEffect(() => {
        let handler = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        }
    }, []);

    return (
        <div ref={menuRef} className={`flex flex-row w-full justify-between items-center lg:px-5 py-3 sm:px-2`}>
            <div className={`${isShrunk ? 'hidden' : ''}`}>
                <div onClick={() => { setIsDropdownOpen(!isDropdownOpen); }} className="cursor-pointer sm:p-1 md:p-2 rounded hover:bg-royal-blue">
                    <div className="flex items-center justify-between w-auto cursor-pointer">
                        <h2 className="sm:text-md lg:text-xl font-serif font-semibold dark:text-white">{username}</h2>
                        <Image className="sm:w-5 sm:h-5" width={28} height={28} src={srcObj.downArrowSrc} alt="Down arrow to indicate there's a menu" />
                    </div>
                </div>
                <div className={`absolute sm:w-44 lg:w-72 rounded lg:top-[4.5rem] lg:left-5 sm:left-1 sm:top-16 bg-royal-blue text-white md:p-2 ${isDropdownOpen ? 'active' : 'inactive'}`}>
                    <ul>
                        <li className="flex justify-center">
                            <DarkModeToggle />
                        </li>
                        <li>
                            <button className="flex items-center hover:underline" onClick={() => signOut({redirect: true, callbackUrl: '/'})}>
                                <Image width={24} height={24} className="sm:w-5 sm:h-5 m-2" src="/logout.svg" alt="" />
                                <p className="sm:text-lg lg:text-xl font-semibold font-serif">Logout</p>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            {children}
        </div>
    );
}