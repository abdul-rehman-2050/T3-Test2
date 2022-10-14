import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { verify } from "argon2";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import { env } from "../../../env/server.mjs";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "../../../server/common/validation/auth";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.userId = user.id;
        token.email = user.email;
        token.username = user.username;
      }

      return token;
    },
   
  },
  jwt: {
    maxAge: 15 * 24 * 30 * 60, // 15 days
  },
  pages: {
    
    signIn: "/login",
    newUser: "/signup",
  },
  secret: "super-secret",


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

          const isValidPassword = await verify(result.password, password);

          if (!isValidPassword) return null;

          return { id: result.id, email, name: (result.firstname+" "+result.lastname) };
        } catch {
          return null;
        }
      },
    }),
  ],
};

export default NextAuth(authOptions);
