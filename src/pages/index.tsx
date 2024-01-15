import { AuthLayout } from "@/components/Auth/AuthLayout";
import Image from "next/image";
import Link from "next/link";
import { getSession, signIn } from 'next-auth/react'
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Login() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [invalidCredentials, setInvalidCredentials] = useState(false);

    useEffect(() => {
        const error = router.query.error;

        if (error === "CredentialsSignin") {
            setInvalidCredentials(!invalidCredentials);
        }
    }, [])

    async function handleSubmit(e: any) {
        e.preventDefault();

        await signIn('credentials', {
            redirect: true,
            email,
            password,
        })
            .then((response) => {
                console.log(response);
                router.replace('/app/Inbox');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <Head>
                <title>All.do | Login</title>
            </Head>
            <AuthLayout>
                <div className="w-2/3">
                    <span className="flex items-center">
                        <Image src="/favicon.svg" alt="" width={40} height={40} />
                        <h1 className="text-3xl font-bold text-dark-blue ml-3" translate="no">All.do</h1>
                    </span>
                    <div>
                        <h2 className="text-3xl font-bold mt-2">Log in to your account.</h2>
                        <h3 className="text-gray text-lg mb-2">Welcome back! You can use social log in:</h3>
                        <span className="flex justify-between">
                            <button className="w-1/2 flex justify-center items-center border-solid border-2 border-light-gray py-2 mr-2 hover:opacity-80"
                                onClick={() => signIn('github')}
                            >
                                <Image src="/githubIcon.svg" alt="" width={40} height={40} />
                            </button>
                            <button className="w-1/2 flex justify-center items-center border-solid border-2 border-light-gray py-2 ml-2 hover:opacity-80"
                                onClick={() => signIn('facebook')}
                            >
                                <Image src="/facebookIcon.svg" alt="" width={40} height={40} />
                            </button>
                        </span>
                    </div>
                    <span className="flex justify-between w-full items-center text-gray font-bold my-2">
                        <hr className="md:w-1/3 w-1/4 border-[1px]" />
                        <p className="text-sm sm:text-md ">Or use your email</p>
                        <hr className="md:w-1/3 w-1/4 border-[1px]" />
                    </span>
                    <form className="flex flex-col" onSubmit={handleSubmit}>
                        {invalidCredentials == true && (
                            <div className="w-full rounded text-red text-2xl bg-red bg-opacity-30 text-center p-1">
                                <h2>Invalid credentials, please try again</h2>
                            </div>
                        )}

                        <label htmlFor="email" className="text-lg font-bold text-gray">E-mail:</label>
                        <input type="email" name="email" id="email" className="border-2 border-light-gray p-2 text-lg"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />

                        <label htmlFor="password" className="text-lg font-bold text-gray mt-2">Password:</label>
                        <input type="password" name="password" id="password" className="border-2 border-light-gray p-2 text-lg"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />

                        <button type="submit" className="border-2 border-light-gray bg-royal-blue p-2 text-white font-bold text-xl hover:opacity-90">Log in</button>

                        <Link href="/auth/register" className="font-bold text-gray text-md self-center mt-2 hover:underline">Don't have an account? <strong className="text-dark-blue">Create an account!</strong></Link>
                    </form>
                </div>
            </AuthLayout>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
    const session = await getSession(context);

    if (session) {
        return {
            redirect: {
                destination: "/app/Inbox",
                permanent: false,
            },
            props: {
                session
            }
        }
    }

    return {
        props: {}
    };
}