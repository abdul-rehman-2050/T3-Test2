import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { verify } from "argon2";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import { env } from "../../../env/server.mjs";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "../../../server/common/validation/auth";
import type { NextAuthOptions } from 'next-auth'

export const authOptions:NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    
      async session({ session, token, user }:any) { 
        if(user){
          session.id = user.id;
        
        }
        if(token){
          session.token = token;
        }
        return session 
      },
    

    
    jwt: async ({ token, user }:any) => {
      if (user) {
        token.userId = user.id;
        token.email = user.email;
        token.name = user.name;
      }

      return token;
    },
   
  },
  
  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `strategy` should be set to 'jwt' if no database is used.
    strategy: 'jwt',

    // Seconds - How long until an idle session expires and is no longer valid.
     maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
     updateAge: 24 * 60 * 60, // 24 hours
  },

   // JSON Web tokens are only used for sessions if the `strategy: 'jwt'` session
  // option is set - or by default if no database is specified.
  // https://next-auth.js.org/configuration/options#jwt
  jwt: {
    // A secret to use for key generation (you should set this explicitly)
    secret: "process.env.SECRET",
    // Set to true to use encryption (default: false)
    // encryption: true,
    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    // encode: async ({ secret, token, maxAge }) => {},
    // decode: async ({ secret, token, maxAge }) => {},
  },

  pages: {
   // signIn: '/auth/signin',  // Displays signin buttons
    // signOut: '/auth/signout', // Displays form with sign out button
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
    signIn: "/login",
    newUser: "/signup",
  },
  
  debug: true,
  secret: "process.env.SECRET",


  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    // ...add more providers here
    Credentials({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await loginSchema.parseAsync(credentials);

          const result = await prisma.user.findFirst({
            where: { email },
          });

          if (!result) return null;
          console.log("user found, now password verifying")
          const isValidPassword = await verify(result.password, password);

          if (!isValidPassword) return null;
          console.log("password verified")

          return { id: result.id, email, name: (result.firstname+" "+result.lastname) };
        } catch {
          return null;
        }
      },
    }),
  ],
};

export default NextAuth(authOptions);
