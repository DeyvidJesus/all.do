import { DropdownMenu } from "./DropdownMenu";
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
            <div>
                {children}
            </div>
        </DropdownMenu>
    );
}