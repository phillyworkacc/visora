'use client'
import Card from "@/components/Card/Card";
import { CustomIcon, CustomFlagIcon, DesktopIcon, MobileIcon } from "@/components/Icons/Icon";
import { getCountryFlag } from "@/utils/CountryFlagApi";
import { formatMilliseconds } from "@/utils/date";
import { faker } from "@faker-js/faker";
import { useState } from "react";

export default function VisitorUsers ({ visitorsData, seeAllVisitorsAction }: { visitorsData: VisitorData[], seeAllVisitorsAction: Function }) {
   const [visitorUsers, setVisitorUsers] = useState(visitorsData.map(visitor => ({
      avatar: `https://api.dicebear.com/8.x/adventurer/svg?seed=${visitor.visitorId}`,
      name: `${faker.person.firstName()} ${faker.person.lastName()}`,
      country: visitor.location.country,
      countryCode: visitor.location.countryCode,
      deviceType: visitor.device.type,
      visitedLast: visitor.sessions.findLast((v) => (v))?.timestamp!
   })));

   return (
      <Card padding="10px 20px">
         <div className="text-xs bold-600 pd-1">All Visitors</div>
         <div className="text-xxs full dfb column gap-10">
            {visitorUsers?.map((visitor, index) => (
               <Card key={index} padding="10px 15px" cursor>
                  <div className="text-xxs full dfb align-center gap-10">
                     <CustomIcon url={visitor.avatar} size={50} />
                     <div className="text-xs dfb align-center full gap-5 pd-05">
                        <div className="text-xs full dfb column">
                           <div className="text-xs bold-600 full">{visitor.name}</div>
                           <div className="text-xxxs grey-4 full">Visited last on {formatMilliseconds(visitor.visitedLast)}</div>
                        </div>
                        <CustomFlagIcon size={15} url={getCountryFlag(visitor.countryCode.toLowerCase())} />
                        {(visitor.deviceType == "desktop") ? (<DesktopIcon size={18} />) : (<MobileIcon size={18} />)}
                     </div>
                  </div>
               </Card>
            ))}
         </div>
         <div className="text-xs" style={{padding:"8px 0"}}>
            <button className="outline-black xxxs" onClick={() => seeAllVisitorsAction()}>See All Visitors</button>
         </div>
      </Card>
   )
}
