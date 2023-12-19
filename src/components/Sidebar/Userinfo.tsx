import { ShrinkButton } from "./ShrinkButton";
import { DropdownMenu } from "./DropdownMenu";
import { DarkModeToggle } from "../DarkModeToggle";

let UserInfo = {
    username: "Deyvid",
    userImg: "/userImg.svg",
}

export function Userinfo() {
    return (
        <DropdownMenu username={UserInfo.username} userImg={UserInfo.userImg}>
            <div>
                <DarkModeToggle />
            </div>
            <div>
                <ShrinkButton />
            </div>
        </DropdownMenu>
    );
}