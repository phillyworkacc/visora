'use client'
import "@/styles/dashboard.css"
import Card from "@/components/Card/Card";
import { CustomFlagIcon, CustomIcon, DesktopIcon, MobileIcon } from "@/components/Icons/Icon"
import { ArrowLeft, CircleUser } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatMilliseconds } from "@/utils/date";
import { getCountryFlag } from "@/utils/CountryFlagApi";
import { useState } from "react";
import { faker } from "@faker-js/faker";
import Selections from "@/components/Selections/Selections";
import Link from "next/link";
import { formatTimeForAnalytics } from "@/utils/AnalyticsCalculator";

type CustomVisitor = {
   visitorId: string;
   avatar: string;
   name: string;
   country: string;
   countryCode: string;
   deviceType: string;
   visitedLast: number;
   visitorInfo: VisitorData;
}

export default function Visitors ({ websiteInfo, websiteVisitors }: { websiteInfo: Website; websiteVisitors: VisitorData[] }) {
   const router = useRouter();
   const [certainUser, setCertainUser] = useState<number | null>(null);
   const [newWebsiteVisitors, setNewWebsiteVisitors] = useState<CustomVisitor[]>(websiteVisitors.map(visitor => ({
      visitorId: visitor.visitorId,
      avatar: `https://api.dicebear.com/8.x/adventurer/svg?seed=${visitor.visitorId}`,
      name: `${faker.person.firstName()} ${faker.person.lastName()}`,
      country: visitor.location.country,
      countryCode: visitor.location.countryCode || '',
      deviceType: visitor.device.type,
      visitedLast: visitor.sessions.findLast((v) => (v))?.timestamp!,
      visitorInfo: visitor
   })))

   return (
      <div className="dashboard">
         <div className="user-account">
            <div className="welcoming">
               <div className="text-m bold-500 dfb align-center gap-10">
                  <CustomIcon url={websiteInfo.favicon} size={30} round />
                  {websiteInfo.domain}
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
               <div className="text-xxs dfb align-center gap-8">
                  <div className="text-xxs fit" style={{whiteSpace:"nowrap"}}>
                     <div className="text-xxs mc">{websiteInfo.domain} Analytics</div>
                  </div>
                  <span>/</span>
                  <div className="text-xxs bold-600">Visitors</div>
               </div>
            </div>
            <div className="horizontal-convertible gap-10">
               <button className="outline-black xxs" onClick={() => router.push(`/dashboard/${websiteInfo.websiteId}`)}>
                  <ArrowLeft size={20} /> <span>Back to Website Analytics</span>
               </button>
            </div>
            
            <div className="horizontal-convertible gap-10">
               {(certainUser == null) ? (<>
                  <AllVisitors visitors={newWebsiteVisitors} chooseVisitor={(index) => setCertainUser(index)} />
               </>) : (<>
                  <VisitorJourney visitor={newWebsiteVisitors[certainUser]} goBackAction={() => setCertainUser(null)} />
               </>)}
            </div>
            <br /><br /><br /><br /><br />
         </div>
      </div>
   )
}

function VisitorJourney ({ visitor, goBackAction }: { visitor: CustomVisitor, goBackAction: Function }) {
   return (
      <Card padding="20px 25px">
         <div className="horizontal-convertible gap-10">
            <button className="outline-black xxs" onClick={() => goBackAction()}>
               <ArrowLeft size={20} /> <span>Back to All Visitors</span>
            </button>
         </div><br />

         <div className="text-m bold-600 pd-05">{visitor.name}</div>
         
         <div className="text-xs pd-05 dfb align-center gap-5 fit" style={{whiteSpace:"nowrap"}}>
            <CustomFlagIcon size={15} url={getCountryFlag(visitor.countryCode.toLowerCase())} />
            <span>{visitor.country}</span>
         </div>

         <div className="text-xs dfb align-center gap-5 fit" style={{whiteSpace:"nowrap"}}>
            {(visitor.deviceType == "desktop") ? (<DesktopIcon size={18} />) : (<MobileIcon size={18} />)}
            {(visitor.deviceType == "desktop") ? ('Desktop') : ('Mobile')}
         </div>
         
         <div className="text-xs pd-05 grey-4 full">Visited last on {formatMilliseconds(visitor.visitedLast)}</div><br />

         <div className="text-m bold-600 pd-1">Visitor Page History</div>
         <div className="text-s dfb column gap-10">
            {visitor.visitorInfo.pages.map((page, index) => (
               <Card padding="20px">
                  <div className="text-sm bold-600 full">Page</div>
                  <Link className="text-xs visible-link mc" href={page.url} target="_blank" key={index}>{page.url}</Link>
               </Card>
            ))}
         </div>

         <br /><br />

         <div className="text-m bold-600 pd-1">Visitor Sessions</div>
         <div className="text-s dfb column gap-10">
            {visitor.visitorInfo.sessions.map((session, index) => (
               <Card padding="20px">
                  <div className="text-sm bold-600 full">Session #{index+1}</div>
                  <div className="text-xxs">Session lasted for {formatTimeForAnalytics(session.sessionDuration)}</div>
                  <div className="text-xxs">Started session on {formatMilliseconds(session.timestamp)}</div>
                  <br />
                  <div className="text-xxs"><b>{visitor.name}</b> visited {session.pagesVisited} page(s) in this session</div>
                  <div className="text-xxs"><b>{visitor.name}</b> {session.interacted ? 'interacted' : 'did not interact'} with the website</div>
                  <br />
                  <div className="text-xxs"><b>UTMSource:</b> {session.utmSource}</div>
                  <div className="text-xxs"><b>UTMCampaign:</b> {session.utmCampaign}</div>
                  <br />
                  <div className="text-xxxs grey-4">[SessionId] {session.sessionId}</div>
               </Card>
            ))}
         </div>
         <br /><br />
      </Card>
   )
}

function AllVisitors ({ visitors, chooseVisitor }: { visitors: CustomVisitor[], chooseVisitor: (index: number) => void; }) {
   const [filterDeviceType, setFilterDeviceType] = useState<string | undefined>('')
   const [filterTime, setFilterTime] = useState<number | undefined>(0);

   const onSelectFilterTime = (string: string) => {
      if (string == "Last 7 days") {
         setFilterTime(Date.now() - (7 * 24 * 60 * 60 * 1000));
      } else if (string == "Last 24 Hours") {
         setFilterTime(Date.now() - (24 * 60 * 60 * 1000));
      } else {
         setFilterTime(undefined);
      }
   }

   const onSelectFilterDT = (string: string) => {
      if (string == "All") {
         setFilterDeviceType(undefined);
      } else {
         setFilterDeviceType(string.toLowerCase());
      }
   }

   return (
      <Card padding="10px 25px">
         <div className="text-m bold-600 pd-1">All Visitors</div>
         <div className="text-xs dfb align-center gap-10 full">
            <b style={{whiteSpace:"nowrap"}}>Device Type</b>
            <Selections
               selections={["Mobile", "Desktop", "All"]}
               onSelect={onSelectFilterDT}
               defaultStartOption={2}
            />
         </div>
         <div className="text-xs dfb align-center gap-10 full">
            <b style={{whiteSpace:"nowrap"}}>Timeline</b>
            <Selections
               selections={["Last 24 Hours", "Last 7 days", "All Time"]}
               onSelect={onSelectFilterTime}
               defaultStartOption={2}
            />
         </div><br />
         <div className="text-xxs full dfb column gap-10">
            {visitors
            .filter(v => (filterDeviceType ? v.deviceType == filterDeviceType : true))
            .filter(v => (filterTime ? v.visitedLast >= filterTime : true))
            .map((visitor, index) => (
               <Card key={index} padding="15px" cursor onClick={() => chooseVisitor(visitors.findIndex(v => (v.visitorId == visitor.visitorId)))}>
                  <div className="text-xxs full dfb gap-10">
                     <CustomIcon url={visitor.avatar} size={50} />
                     <div className="text-xs dfb align-center full gap-5 pd-05">
                        <div className="text-xs full dfb column">
                           <div className="text-s bold-600 full">{visitor.name}</div>
                           <div className="text-xxs pd-05 grey-4 dfb wrap full gap-10">
                              <div className="text-xxs dfb align-center gap-5 fit" style={{whiteSpace:"nowrap"}}>
                                 <CustomFlagIcon size={15} url={getCountryFlag(visitor.countryCode.toLowerCase())} />
                                 <span>{visitor.country}</span>
                              </div>
                              <div className="text-xxs dfb align-center gap-5 fit" style={{whiteSpace:"nowrap"}}>
                                 {(visitor.deviceType == "desktop") ? (<DesktopIcon size={18} />) : (<MobileIcon size={18} />)}
                                 {(visitor.deviceType == "desktop") ? ('Desktop') : ('Mobile')}
                              </div>
                           </div>
                           <div className="text-xxs grey-4 full">Visited last on {formatMilliseconds(visitor.visitedLast)}</div>
                        </div>
                     </div>
                  </div>
               </Card>
            ))}
            <br /><br />
         </div>
      </Card>
   )
}