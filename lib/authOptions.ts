import { connectToDatabase } from "@/db/db";
import { NextAuthOptions } from "next-auth";
import UsersDb from "@/db/user";
import GoogleProvider from "next-auth/providers/google";
import crypto from "crypto"

export const authOptions: NextAuthOptions = {
   session: {
      strategy: "jwt"
   },
   providers: [
      GoogleProvider ({
         clientId: process.env.GOOGLE_CLIENT_ID as string,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
      })
   ],
   callbacks: {
      async signIn({ user, account, profile }) {
         await connectToDatabase();
         const existingUser = await UsersDb.findOne({ email: user.email });
         if (!existingUser) {
            let userId = crypto.randomUUID();
            await UsersDb.create({
               userid: userId,
               email: user.email,
               hasAccess: false,
               websites: []
            });
         }

         return true; // Allow sign in
      },
      jwt: async ({ user, token, trigger, session }) => {
         if (trigger == "update") {
            return {
               ...token,
               ...session.user
            }
         }
         return { ...token, ...user }
      }
   }
}