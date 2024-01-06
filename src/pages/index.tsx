import { AuthLayout } from "@/components/Auth/AuthLayout";
import Image from "next/image";
import Link from "next/link";
import { signIn } from 'next-auth/react'

export default function Login() {
    return (
        <AuthLayout>
            <div className="w-2/3">
                <span className="flex items-center">
                    <Image src="/favicon.svg" alt="" width={40} height={40} />
                    <h1 className="text-3xl font-bold text-dark-blue ml-3">All.do</h1>
                </span>
                <div>
                    <h2 className="text-3xl font-bold mt-2">Log in to your account.</h2>
                    <h3 className="text-gray text-lg mb-2">Welcome back! You can use social log in:</h3>
                    <span className="flex justify-between">
                        <button className="w-1/2 flex justify-center items-center border-solid border-2 border-light-gray py-2 mr-2 hover:opacity-80"
                            onClick={() => signIn('google')}
                        >
                            <Image src="/googleIcon.svg" alt="" width={40} height={40} />
                        </button>
                        <button className="w-1/2 flex justify-center items-center border-solid border-2 border-light-gray py-2 ml-2 hover:opacity-80"
                            onClick={() => signIn('facebook')}
                        >
                            <Image src="/facebookIcon.svg" alt="" width={40} height={40} />
                        </button>
                    </span>
                </div>
                <span className="flex justify-between w-full items-center text-gray font-bold my-2">
                    <hr className="w-1/3 border-[1px]" />
                    <p>Or use your email</p>
                    <hr className="w-1/3 border-[1px]" />
                </span>
                <form action="" className="flex flex-col">
                    <label htmlFor="email" className="text-lg font-bold text-gray">E-mail:</label>
                    <input type="email" name="email" id="email" className="border-2 border-light-gray p-2 text-lg" />

                    <label htmlFor="password" className="text-lg font-bold text-gray mt-2">Password:</label>
                    <input type="password" name="password" id="password" className="border-2 border-light-gray p-2 text-lg" />
                    <Link href="/auth/forgotpass" className="self-end text-dark-blue text-md my-2 font-bold hover:underline">Forgot password?</Link>

                    <button type="submit" className="border-2 border-light-gray bg-royal-blue p-2 text-white font-bold text-xl hover:opacity-90">Log in</button>

                    <Link href="/auth/register" className="font-bold text-gray text-md self-center mt-2 hover:underline">Don't have an account? <strong className="text-dark-blue">Create an account!</strong></Link>
                </form>
            </div>
        </AuthLayout>
    )
}