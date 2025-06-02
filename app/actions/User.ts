"use server"
import UsersDb from "@/db/user";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

export async function deleteUserAccount (): Promise<boolean> {
   try {
      const session = await getServerSession(authOptions);
      if (!session?.user) return false;

      const user: User | null = await UsersDb.findOne({ email: session.user.email });
      if (!user) return false;

      await UsersDb.deleteOne({ email: session.user.email, userid: user.userid });

      return true;
   } catch (e) {
      return false
   }
}

export async function getUserByEmail (email: string): Promise<User | false> {
   try {
      const user: User | null = await UsersDb.findOne({ email });
      if (!user) return false;
      return user;
   } catch (e) {
      return false
   }
}