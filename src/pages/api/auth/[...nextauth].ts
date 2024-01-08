import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import FacebookProvider from 'next-auth/providers/facebook';
import connect from '@/utils/database';

const options = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID as string,
      clientSecret: process.env.FACEBOOK_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user }: any) {
      const { db } = await connect();

      const existingUser = await db.collection('users').findOne({ email: user.email });

      if (!existingUser) {
        await db.collection('users').insertOne({
          name: user.name,
          email: user.email,
          password: ""
        });
      }

      return true;
    },
  }
};

export default NextAuth(options);