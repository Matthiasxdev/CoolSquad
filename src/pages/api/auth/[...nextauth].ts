
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from "@/lib/prisma";
import { Session, User } from "next-auth"
import { JWT } from "next-auth/jwt"
import Google from "next-auth/providers/google";


if (!process.env.NEXTAUTH_SECRET) {
  throw new Error("Please provide process.env.NEXTAUTH_SECRET");
}

if (!process.env.GOOGLE_ID || !process.env.GOOGLE_SECRET) {
    throw new Error(
      'Please define the GITHUB_ID and GITHUB_SECRET environment variables inside .env.local'
    );
  }

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  // pages: {
  //   signIn: "/signin",
  // },
  callbacks: { 
    
    session({ session, user }: {session: Session, user: User}) {
      if (session.user){
        session.user.role = user.role
      }
    return session
  }
    // async jwt({ token, user }: {token: JWT, user: User}) {
    //   /* Step 1: update the token based on the user object */
    //   if (user) {
    //     token.role = user.role;
    //   }
    //   return token;
    // },
    // session({ session, token}: {session: Session, token: JWT}) {
    //   /* Step 2: update the session.user based on the token object */
    //   if (token && session.user) {
    //     session.user.role = token.role;
    //   }
    //   return session;
    // },
}
}
export default NextAuth(authOptions)

