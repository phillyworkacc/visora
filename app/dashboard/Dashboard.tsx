"use client"
import "@/styles/dashboard.css"
import Card from "@/components/Card/Card";
import Spacing from "@/components/Spacing/Spacing";
import Link from "next/link";
import { CirclePlus, CircleUser, Link2 } from "lucide-react";
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { CustomIcon } from "@/components/Icons/Icon";

export default function Dashboard({ websites }: { websites: Website[] }) {
   const { data: session } = useSession();
   const router = useRouter();
   
   return (
      <div className="dashboard">
         <div className="user-account">
            <div className="welcoming">
               <div className="text-m bold-500">Hello {session?.user?.name}</div>
            </div>
            <div className="account">
               <button className="outline-black xxs" onClick={() => router.push("/account")}>
                  <CircleUser size={20} /> <span>Your Account</span>
               </button>
            </div>
         </div>
         
         <div className="content">
            {websites.length > 0 && <div className="text-xs pd-1 dfb align-center">
               <button 
                  className="xxs"
                  onClick={() => router.push("/add-website")}
               ><CirclePlus size={17} /> Add Website</button>
            </div>}
            {websites.length > 0 ? <>
               {websites.map((website, index) => {
                  return <Card key={index} padding="15px 20px" cursor small onClick={() => router.push(`/dashboard/${website.websiteId}`)}>
                     <div className="text-xs bold-600 pd-05 dfb gap-10 align-center">
                        <CustomIcon url={website.favicon} size={18} />
                        {website.domain}
                     </div>
                     <Link href={`https://${website.domain}`} target="_blank" className="text-xxs grey-5 dfb align-center gap-5 visible-link fit pd-05">
                        <Link2 size={18} /> Visit Website
                     </Link>
                  </Card>
               })}
            
            </> : <>
               <div className="horizontal-convertible gap-10">
                  <Spacing size={2} />
                  <div className="text-s dfb column align-center justify-center gap-10">
                     <div className="text-sm bold-700 text-center">You have no websites</div>
                     <div className="text-xs text-center">Add your website to view analytics and visual data on how your website is performing</div>
                     <button 
                        className="xxs"
                        onClick={() => router.push("/add-website")}
                     ><CirclePlus size={17} /> Add Website</button>
                  </div>
               </div>
            </>}
            <Spacing size={3} />
         </div>
      </div>
   )
}
