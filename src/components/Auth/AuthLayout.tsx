import { ReactNode } from "react";
import Image from "next/image";

interface AuthLayoutProps {
    children: ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="flex h-screen">
            <div className="lg:w-1/2 font-serif flex justify-center items-center flex-col w-screen">
                {children}
            </div>
            <div className="lg:visible lg:flex w-1/2 bg-royal-blue flex-col items-center justify-evenly py-4 hidden invisible">
                <Image src="/authImage.svg" alt="" width={450} height={450} />
                <div className="flex flex-col items-center text-white font-serif text-2xl text-center">
                    <h2 className="font-bold">Efficiency Unleashed: <br /> Streamline Your Day with All.do</h2>
                    <p className="text-xl mt-2">Your Tasks, Your Way!</p>
                </div>
            </div>
        </div>
    )
}