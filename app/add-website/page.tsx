import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AddWebsite from "./AddWebsite";
import UsersDb from "@/db/user";
import ThresholdWebsites from "./ThresholdWebsites";

export async function generateMetadata() {
   const session = await getServerSession(authOptions);
   return {
      title: `Add Website - ${session?.user?.name} - Visora`,
   };
}

export default async function AddWebsitePage () {
   const session = await getServerSession(authOptions);
   if (session?.user) {
      const user: User | null = await UsersDb.findOne({ email: session.user.email });
      if (!user) redirect("/account");
      if (!user.hasAccess) redirect("/pricing");
      if (user.websites.length == 5) {
         return <ThresholdWebsites />
      } else {
         return <AddWebsite />
      }
   } else {
      redirect("/login")
   }
}