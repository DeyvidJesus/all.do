import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials';
import connect from '@/utils/database';

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
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

          if (res == null) {
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
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      authorization: {
        params: {}
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID as string,
      clientSecret: process.env.FACEBOOK_SECRET as string,
      authorization: {
        params: {}
      }
    }),
  ],
  pages: {
    signIn: '/',
  },
  callbacks: {
    // async signIn({ user }: any) {
    //   const { db } = await connect();

    //   const existingUser = await db.collection('users').findOne({ email: user.email });

    //   if (!existingUser) {
    //     await db.collection('users').insertOne({
    //       name: user.name,
    //       email: user.email,
    //       password: "",
    //     });
    //   }

    //   return true;
    // },
    async jwt({ token, user }: any) {
			user && (token.user = user)
			return token
		},
		async session({ session, token }: any){
			session = token.user
			return session
		},
	  async redirect({url, baseUrl}) {
		  return baseUrl;
	  }
  },
});
