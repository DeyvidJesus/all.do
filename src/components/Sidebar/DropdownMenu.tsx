import { useDarkMode } from "@/context/useDarkMode";
import Image from "next/image";
import { ReactNode, useEffect, useRef, useState } from "react";
import { DarkModeToggle } from "../Utils/DarkModeToggle";

interface UserInfo {
    username: string,
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
                        <h2 className="sm:text-xl md:text-2xl lg:text-3xl font-serif font-semibold dark:text-white">{username}</h2>
                        <Image className="sm:w-5 sm:h-5" width={28} height={28} src={srcObj.downArrowSrc} alt="Down arrow to indicate there's a menu" />
                    </div>
                </div>
                <div className={`absolute sm:w-40 md:w-72 rounded lg:top-[4.5rem] lg:left-5 sm:left-2 sm:top-16 bg-royal-blue text-white md:p-2 dropdown-menu ${isDropdownOpen ? 'active' : 'inactive'}`}>
                    <ul>
                        <li className="flex justify-center">
                            <DarkModeToggle />
                        </li>
                        <li>
                            <a className="flex items-center hover:underline" href="">
                                <Image width={24} height={24} className="sm:w-5 sm:h-5 m-2" src="/settings.svg" alt="" />
                                <p className="sm:text-lg md:text-xl font-semibold font-serif">Settings</p>
                            </a>
                        </li>
                        <li>
                            <a className="flex items-center hover:underline" href="">
                                <Image width={24} height={24} className="sm:w-5 sm:h-5 m-2" src="/notifications.svg" alt="" />
                                <p className="sm:text-lg md:text-xl font-semibold font-serif">Notifications</p>
                            </a>
                        </li>
                        <li>
                            <a className="flex items-center hover:underline" href="">
                                <Image width={24} height={24} className="sm:w-5 sm:h-5 m-2" src="/logout.svg" alt="" />
                                <p className="sm:text-lg md:text-xl font-semibold font-serif">Logout</p>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            {children}
        </div>
    );
}