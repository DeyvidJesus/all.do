import { useEffect, useRef, useState } from "react";
import { ShrinkButton } from "./ShrinkButton";

interface UserInfo {
    username: string,
    userImg: string,
}

export function Userinfo({ username, userImg }: UserInfo) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

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
        <div ref={menuRef} className="flex flex-row w-full justify-between items-center px-5 py-3">
            <div onClick={() => { setIsDropdownOpen(!isDropdownOpen) }} className="cursor-pointer py-2 px-2 rounded hover:bg-dark-blue">
                <div className="flex items-end justify-between w-auto cursor-pointer">
                    <img className="w-10" src={userImg} alt="Image to represent user's profile" />
                    <h2 className="ml-3 text-3xl font-serif font-semibold text-white">{username}</h2>
                    <img className="w-8" src="downArrow.svg" alt="Down arrow to indicate there's a menu" />
                </div>
            </div>
            <div>
                <ShrinkButton />
            </div>

            <div
                className={`absolute w-48 rounded top-20 left-6 bg-dark-blue text-white p-2 dropdown-menu ${isDropdownOpen ? 'active' : 'inactive'}`}>
                <ul>
                    <li>
                        <a className="flex items-center hover:underline" href="">
                            <img className="w-6 m-2" src="settings.svg" alt="" />
                            <p className="text-xl font-semibold font-serif">Settings</p>
                        </a>
                    </li>
                    <li>
                        <a className="flex items-center hover:underline" href="">
                            <img className="w-6 m-2" src="notifications.svg" alt="" />
                            <p className="text-xl font-semibold font-serif">Notifications</p>
                        </a>
                    </li>
                    <li>
                        <a className="flex items-center hover:underline" href="">
                            <img className="w-6 m-2" src="logout.svg" alt="" />
                            <p className="text-xl font-semibold font-serif">Logout</p>
                        </a>
                    </li>
                </ul>
            </div>

        </div>
    );
}