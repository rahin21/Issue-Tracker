import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/prisma";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt", // ✅ Now TypeScript recognizes this correctly
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          access_type: "offline",
          prompt: "consent",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (!profile?.email) {
        throw new Error("No email found");
      }

      await prisma.user.upsert({
        where: { email: profile.email ?? "" }, 
        update: {
          name: profile.name ?? "No Name", 
          avatar: (profile as any).image ?? "",
        },
        create: {
          email: profile.email ?? "", 
          name: profile.name ?? "No Name",
          avatar: (profile as any).image ?? "", 
          password: "defaultPassword", 
        },
      });
      

      return true;
    },
  },
};
