import { useDarkMode } from "@/context/useDarkMode";
import Image from "next/image";

export function DarkModeToggle() {
    const { darkMode, toggleDarkMode } = useDarkMode();

    return (
        <button onClick={() => toggleDarkMode()}>
            {darkMode ? <Image src='/dark-mode-moon.svg' alt='' width={32} height={32}/> : <Image src='/light-mode-sun.svg' alt='' width={32} height={32}/>}
        </button>
    )
}