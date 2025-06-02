import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Dashboard from "./Dashboard";
import UsersDb from "@/db/user";
import WebsitesDb from "@/db/websites";
import { connectToDatabase } from "@/db/db";

export async function generateMetadata() {
   const session = await getServerSession(authOptions);
   return {
      title: `Dashboard - ${session?.user?.name! || 'Visora'}`,
   };
}

export default async function DashboardPage () {
   await connectToDatabase();
   const session = await getServerSession(authOptions);
   const user: User | null = await UsersDb.findOne({ email: session?.user?.email });
   
   if (session?.user && user) {
      const websites: Website[] | null = await WebsitesDb.find({ userid: user.userid });
      return <Dashboard websites={JSON.parse(JSON.stringify(websites)) || []} />
   } else {
      redirect("/login")
   }
}