import Image from "next/image";
import { useState } from "react"

export function DarkModeToggle() {
    const [darkMode, setDarkMode] = useState(false)

    function toggleTheme(darkMode: boolean) {
        darkMode === true ? document.documentElement.classList.add("dark") : document.documentElement.classList.remove("dark");
        setDarkMode(darkMode);
    }

    return (
        <button onClick={() => toggleTheme(!darkMode)}>
            {darkMode === true ? <Image src='dark-mode-moon.svg' alt='' width={32} height={32}/> : <Image src='light-mode-sun.svg' alt='' width={32} height={32}/>}
        </button>
    )
}