import { useState } from "react";
import { ShrinkButton } from "./ShrinkButton";
import { TasksMenu } from "./TasksMenu";
import { Userinfo } from "./Userinfo";

export function Sidebar() {
    const [isShrunk, setIsShrunk] = useState(false);

    const handleShrinkToggle = () => {
      setIsShrunk(!isShrunk);
    };

    return (
        <aside className={`flex flex-col items-center bg-white border-r-4 border-dark-blue w-1/3 h-screen font-semibold dark:text-white dark:bg-light-blue dark:border-white ${isShrunk ? 'w-28' : ''} transition-all ease-in-out delay-100`}>
            <Userinfo isShrunk={isShrunk}>
                <ShrinkButton onClick={handleShrinkToggle} />
            </Userinfo>
            <TasksMenu isShrunk={isShrunk}/>
        </aside>
    );
}