import { AuthLayout } from "@/components/Auth/AuthLayout";
import { GetServerSideProps } from "next";
import { getSession, signIn } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Register() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailInvalid, setEmailInvalid] = useState(false);

    const validateInputs = () => setEmailInvalid(true);

    const handleSignup = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        const credentials = {
            name,
            email,
            password,
        };

        const response = await fetch('../api/users/createUser', {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (data.success == false) {
            validateInputs();
            return;
        }

        router.push("/");
    };

    return (
        <>
            <Head>
                <title>All.do | Cadastro</title>
            </Head>
            <AuthLayout>
                <div className="w-2/3">
                    <span className="flex items-center">
                        <Image src="/favicon.svg" alt="" width={40} height={40} />
                        <h1 className="text-3xl text-dark-blue ml-3 font-bold" translate="no">All.do</h1>
                    </span>
                    <div>
                        <h2 className="text-3xl font-bold mt-2">Crie sua nova conta já.</h2>
                        <h3 className="text-gray text-lg mb-2">Bem-vindo! Escolha um método para se cadastrar:</h3>
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
                        <hr className="md:w-1/3 w-1/4 border-[1px]" />
                        <p className="text-sm sm:text-md ">Ou use o seu email</p>
                        <hr className="md:w-1/3 w-1/4 border-[1px]" />
                    </span>
                    <form className="flex flex-col" onSubmit={handleSignup}>
                        <label htmlFor="name" className="text-lg font-bold text-gray">Nome:</label>
                        <input type="text" name="name" id="name" className="border-2 border-light-gray p-2 text-lg" required value={name}
                            onChange={(e) => setName(e.target.value)} />

                        <label htmlFor="email" className="text-lg font-bold text-gray">E-mail:</label>
                        <input type="email" name="email" id="email" className="border-2 border-light-gray p-2 text-lg" required value={email}
                            onChange={(e) => setEmail(e.target.value)} />

                        <label htmlFor="password" className="text-lg font-bold text-gray mt-2">Senha:</label>
                        <input type="password" name="password" id="password" className="border-2 border-light-gray p-2 text-lg" required value={password}
                            onChange={(e) => setPassword(e.target.value)} />

                        <button type="submit" className="border-2 mt-4 border-light-gray bg-royal-blue p-2 text-white font-bold text-xl hover:opacity-90">Cadastrar!</button>

                        <Link href="/" className="font-bold text-gray text-md self-center mt-2 hover:underline">Já tem uma conta? <strong className="text-dark-blue">Faça login!</strong></Link>
                    </form>
                </div>
            </AuthLayout>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
    const session = await getSession(context);

    console.log(session);

    if (session) {
        return {
            redirect: {
                destination: "/app/Caixa-de-entrada",
                permanent: false,
            }
        }
    }

    return {
        props: {}
    }
}