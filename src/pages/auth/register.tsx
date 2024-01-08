import { AuthLayout } from "@/components/Auth/AuthLayout";
import { GetServerSideProps } from "next";
import { getSession, signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Register() {
    return (
        <AuthLayout>
            <div className="w-2/3">
                <span className="flex items-center">
                    <Image src="/favicon.svg" alt="" width={40} height={40} />
                    <h1 className="text-3xl text-dark-blue ml-3 font-bold">All.do</h1>
                </span>
                <div>
                    <h2 className="text-3xl font-bold mt-2">Create your new account.</h2>
                    <h3 className="text-gray text-lg mb-2">Welcome! Select method to register:</h3>
                    <span className="flex justify-between">
                        <button className="w-1/2 flex justify-center items-center border-solid border-2 border-light-gray py-2 mr-2 hover:opacity-80"
                            onClick={() => signIn('github')}>
                            <Image src="/githubIcon.svg" alt="" width={36} height={36} />
                        </button>
                        <button className="w-1/2 flex justify-center items-center border-solid border-2 border-light-gray py-2 ml-2 hover:opacity-80"
                            onClick={() => signIn('facebook')}>
                            <Image src="/facebookIcon.svg" alt="" width={36} height={36} />
                        </button>
                    </span>
                </div>
                <span className="flex justify-between w-full items-center text-gray font-bold my-2">
                    <hr className="w-1/3 border-[1px]" />
                    <p>Or use your email</p>
                    <hr className="w-1/3 border-[1px]" />
                </span>
                <form action="" className="flex flex-col">
                    <label htmlFor="name" className="text-lg font-bold text-gray">Name:</label>
                    <input type="text" name="name" id="name" className="border-2 border-light-gray p-2 text-lg" />

                    <label htmlFor="email" className="text-lg font-bold text-gray">E-mail:</label>
                    <input type="email" name="email" id="email" className="border-2 border-light-gray p-2 text-lg" />

                    <label htmlFor="password" className="text-lg font-bold text-gray mt-2">Password:</label>
                    <input type="password" name="password" id="password" className="border-2 border-light-gray p-2 text-lg" />

                    <button type="submit" className="border-2 mt-4 border-light-gray bg-royal-blue p-2 text-white font-bold text-xl hover:opacity-90">Register</button>

                    <Link href="/auth/login" className="font-bold text-gray text-md self-center mt-2 hover:underline">Already have an account? <strong className="text-dark-blue">Log in!</strong></Link>
                </form>
            </div>
        </AuthLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
    const session = await getSession(context);

    console.log(session);

    if(session) {
        return {
            redirect: {
                destination: "/tasks/Inbox",
                permanent: false,
            }
        }
    }

    return {
        props: {
            user: 'Dev'
        }
    }
}