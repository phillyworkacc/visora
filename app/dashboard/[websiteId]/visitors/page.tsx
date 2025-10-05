import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getVisitorDataForWebsite } from "@/app/actions/Website";
import { connectToDatabase } from "@/db/db";
import WebsitesDb from "@/db/websites";
import UsersDb from "@/db/user";
import Visitors from "./Visitors";

type WebsitePageProps = {
   params: Promise<{
      websiteId: string;
   }>
}

export async function generateMetadata({ params }: WebsitePageProps) {
   const session = await getServerSession(authOptions);
   const { websiteId } = await params;

   const user: User | null = await UsersDb.findOne({ email: session?.user?.email })
   const websiteInfo: Website | null = await WebsitesDb.findOne({ websiteId: websiteId, userId: user?.userid });

   return {
      title: `${websiteInfo?.domain || 'Website'} ${user ? `- ${session?.user?.name} ` : ''} - Visora`,
   };
}

export default async function WebsiteDashboardPage ({ params }: WebsitePageProps) {
   await connectToDatabase();
   const session = await getServerSession(authOptions);
   const { websiteId } = await params;

   const user: User | null = await UsersDb.findOne({ email: session?.user?.email })
   if (!user) redirect("/account");
   if (!user.hasAccess) redirect("/pricing");

   const websiteInfo: Website | null = await WebsitesDb.findOne({ websiteId: websiteId, userId: user?.userid });

   if (session?.user) {
      if (websiteInfo == null) {
         return <>That website doesn't exist</>
      } else {
         const websiteVisitorsData = await getVisitorDataForWebsite(websiteInfo.websiteId);
         return <Visitors 
            websiteInfo={JSON.parse(JSON.stringify(websiteInfo))}
            websiteVisitors={JSON.parse(JSON.stringify(websiteVisitorsData))}
         />
      }
   } else {
      redirect("/login")
   }
}