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
        <aside className={`flex flex-col items-center bg-white border-r-4 border-dark-blue md:w-1/3 min-h-screen font-semibold dark:text-white dark:bg-light-blue dark:border-white ${isShrunk ? 'sm:!static sm:!w-16 md:!w-20' : ''} transition-all ease-in-out duration-700 sm:absolute sm:w-3/4 md:static`}>
            <Userinfo isShrunk={isShrunk}>
                <ShrinkButton onClick={handleShrinkToggle} />
            </Userinfo>
            <TasksMenu isShrunk={isShrunk}/>
        </aside>
    );
}