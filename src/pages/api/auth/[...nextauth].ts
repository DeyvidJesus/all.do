import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials';
import connect from '@/utils/database';

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;

        try {
          const { db } = await connect();
          const collection = db.collection("users");

          const res = await collection.findOne({ email, password });

          if (!res) {
            return null;
          }

          const user = await res.json();

          if (user) {
            return user;
          }

          return null;
        } catch (err) {
          console.log(err);
        }
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID as string,
      clientSecret: process.env.FACEBOOK_SECRET as string,
    }),
  ],
  pages: {
    signIn: '/',
  },
  callbacks: {
    async signIn({ user }: any) {
      const { name, email } = user;
      const password = ""
      const userData = {
        name, email, password
      }

      await fetch("https://all-do.vercel.app/pages/api/users/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userData })
      })

      return true;
    },
  },
});
