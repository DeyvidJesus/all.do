import { useSession } from "next-auth/react";
import { DropdownMenu } from "./DropdownMenu";
import { ReactNode } from "react";

interface UserInfoProps {
    children: ReactNode;
    isShrunk: boolean;
}

export function Userinfo({ children, isShrunk }: UserInfoProps) {
    const { data: session } = useSession();
    let name = session?.user?.name || '';

    if (name.length > 10) {
        name = name.substring(0, 10) + '...';
    }

    return (
        <DropdownMenu isShrunk={isShrunk} username={name}>
            <div>
                {children}
            </div>
        </DropdownMenu>
    );
}