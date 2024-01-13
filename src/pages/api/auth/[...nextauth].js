import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials';
import connect from '@/utils/database';

const options = {
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

          const res = await collection.findOne({ email, password }) || null;

          if(res == null) {
            return null;
          }

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
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
  ],
  pages: {
    signIn: '/',
    error: '/',
  },
  callbacks: {
    async jwt ({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = profile.id;
      }
      return token;
    },
    async signIn({ user }) {
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
    async session({ session, token }) {
      session.token = token;
      return session;
    },
  },
};

export default NextAuth(options);