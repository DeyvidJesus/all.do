import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials';
import connect from '@/utils/database';

const options = {
  secret: process.env.NEXTAUTH_SECRET as string,
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
          const res = await fetch("http://localhost:3000/api/users/getUser", {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: { 
              Accept: "application/json",
              "Content-Type": "application/json" 
            }
          })

          const user = await res.json();

          if (res.ok && user) {
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
    error: '/',
  },
  callbacks: {
    async signIn({ user }: any) {
      const { db } = await connect();

      const existingUser = await db.collection('users').findOne({ email: user.email });

      if (!existingUser) {
        await db.collection('users').insertOne({
          name: user.name,
          email: user.email,
          password: "",
        });
      }

      return true;
    },
    async session({session, user, token}: any) {
      // Add the user data to the session
      session.token = token;
      return session;
    },
  },
};

export default NextAuth(options);