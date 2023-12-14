import { TasksMenu } from "./TasksMenu";
import { Userinfo } from "./Userinfo";

let UserInfo = {
    username: "Deyvid",
    userImg: "userImg.svg",
}

export function Sidebar() {
    return (
        <aside className="flex flex-col items-center bg-light-blue w-1/4 h-screen">
            <Userinfo username={UserInfo.username} userImg={UserInfo.userImg}/>
            <TasksMenu />
        </aside>
    );
}