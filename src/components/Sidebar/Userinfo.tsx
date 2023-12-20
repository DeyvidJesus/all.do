import { ShrinkButton } from "./ShrinkButton";
import { DropdownMenu } from "./DropdownMenu";
import { DarkModeToggle } from "../DarkModeToggle";
import { ReactNode } from "react";

let UserInfo = {
    username: "Deyvid",
}

interface UserInfoProps {
    children: ReactNode;
    isShrunk: boolean
}

export function Userinfo({ children, isShrunk }: UserInfoProps) {
    return (
        <DropdownMenu isShrunk={isShrunk} username={UserInfo.username}>
            <div className={`${isShrunk ? 'hidden' : ''}`}>
                <DarkModeToggle />
            </div>
            <div>
                {children}
            </div>
        </DropdownMenu>
    );
}