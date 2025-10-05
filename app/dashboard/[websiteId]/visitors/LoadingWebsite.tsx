"use client"
import "@/styles/dashboard.css"
import Card from "@/components/Card/Card";
import Spacing from "@/components/Spacing/Spacing";
import { CircleUser, CodeXml, LayoutDashboard, RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import Skeleton from "@/components/Skeleton/Skeleton";

export default function LoadingWebsiteAnalytics () {
   const router = useRouter();
   
   return (
      <div className="dashboard">
         <div className="user-account">
            <div className="welcoming">
               <div className="text-m bold-500 dfb align-center gap-10">
                  <Skeleton size={3} round />
                  <Skeleton size={3} />
               </div>
            </div>
            <div className="account">
               <button className="outline-black xxs" onClick={() => router.push("/account")}>
                  <CircleUser size={20} /> <span>Your Account</span>
               </button>
            </div>
         </div>
         
         <div className="content">
            <div className="horizontal-convertible gap-10">
               <button className="outline-black xxs" onClick={() => router.push("/dashboard")}>
                  <LayoutDashboard size={20} /> <span>Back to Dashboard</span>
               </button>
               <button className="outline-black xxs">
                  <RefreshCcw size={20} /> <span>Refresh Data</span>
               </button>
               <button className="outline-black xxs">
                  <CodeXml size={20} /> <span>Connect to Website</span>
               </button>
            </div>

            <div className="horizontal-convertible gap-10">
               <Card padding="0 15px">
                  <div className="text-xs bold-600 pd-1">Live Visitors</div>
                  <Skeleton size={5} full />
                  <Skeleton size={5} full />
                  <Spacing size={1} />
               </Card>
               <Card padding="0 15px">
                  <div className="text-xs bold-600 pd-1">Visitors (last 30 days)</div>
                  <Skeleton size={5} full />
                  <Skeleton size={5} full />
                  <Spacing size={1} />
               </Card>
               <Card padding="0 15px">
                  <div className="text-xs bold-600 pd-1">Average Session Duration</div>
                  <Skeleton size={5} full />
                  <Skeleton size={5} full />
                  <Spacing size={1} />
               </Card>
            </div>
            
            <div className="horizontal-convertible gap-10">
               <Card padding="0 15px">
                  <div className="text-xs bold-600 pd-1">Bounce Rate</div>
                  <Skeleton size={5} full />
                  <Skeleton size={5} full />
                  <Spacing size={1} />
               </Card>
               <Card padding="0 15px">
                  <div className="text-xs bold-600 pd-1">Device</div>
                  <Skeleton size={5} full />
                  <Skeleton size={5} full />
                  <Spacing size={1} />
               </Card>
            </div>

            <Spacing size={3} />
         </div>
      </div>
   )
}
