"use client"
import "@/styles/dashboard.css"
import Card from "@/components/Card/Card";
import ProgressBar from "@/components/ProgressBar/ProgressBar";
import LoadingWebsiteAnalytics from "./LoadingWebsite";
import Spacing from "@/components/Spacing/Spacing";
import { AndroidIcon, CustomFlagIcon, CustomIcon, DesktopIcon, IOSIcon, LinuxIcon, MacOSIcon, MobileIcon, WindowsIcon } from "@/components/Icons/Icon";
import { AiRecommendations } from "@/utils/AiRecommendations";
import { getCountryFlag } from "@/utils/CountryFlagApi";
import { ArrowDown, ArrowUp, CircleHelp, CircleUser, CodeXml, Copy, Info, LayoutDashboard, RefreshCcw, Sparkle, Trash2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useModal } from "@/components/Modal/ModalContext";
import { toast } from "sonner";
import { deleteUserWebsite, getVisitorDataForWebsite } from "@/app/actions/Website";
import { useSession } from "next-auth/react";
import { appUrl } from "@/utils/constants";
import { formatTimeForAnalytics, WebsiteAnalyticsCalculator } from "@/utils/AnalyticsCalculator";

type WebsiteAnalyticsProps = {
   websiteInfo: Website;
   websiteVisitorsData: VisitorData[];
}

export default function WebsiteAnalytics ({ websiteInfo, websiteVisitorsData }: WebsiteAnalyticsProps) {
   const { data: session, status } = useSession();   
   const { showModal, close } = useModal();
   const router = useRouter();

   const [visitorsData, setVisitorsData] = useState<VisitorData[] | null>(websiteVisitorsData || null);

   const liveVisitors = WebsiteAnalyticsCalculator.liveVisitors(websiteVisitorsData);
   const bounceRate = WebsiteAnalyticsCalculator.bounceRate(websiteVisitorsData);
   const averageSessionDuration = WebsiteAnalyticsCalculator.averageSessionDuration(websiteVisitorsData);
   const visitorsInPast30Days = WebsiteAnalyticsCalculator.visitorsInPast30Days(websiteVisitorsData);
   const growthInPast30Days = WebsiteAnalyticsCalculator.growthInVisitorsInPast30Days(websiteVisitorsData);

   const deviceComparison = WebsiteAnalyticsCalculator.deviceComparison(websiteVisitorsData);
   const osComparison = WebsiteAnalyticsCalculator.osComparison(websiteVisitorsData);

   const deleteWebsiteButton = async () => {
      const response = await deleteUserWebsite(websiteInfo.websiteId);
      if (response) {
         toast.success("Successfully deactivated website");
         router.push("/dashboard");
      } else {
         toast.error("Failed to deactivate website");
      }
      close();
   }

   const decideGrowthUI = (growth: number) => {
      if (growth > 0) {
         return <div className="text-xxs dfb align-center gap-5 pd-2 bold-700 success">
            <ArrowUp size={18} strokeWidth={4} color="#14c100" /> {growth}% more than the last 30 days
         </div>
      } else if (growth < 0) {
         return <div className="text-xxs dfb align-center gap-5 pd-2 bold-700 error">
            <ArrowDown size={18} strokeWidth={4} color="#ff2d2d" /> {growth}% more than the last 30 days
         </div>
      } else {
         return <div className="text-s pd-05">
            <Spacing size={2} />
         </div>;
      }
   }

   const liveVisitorHelp = () => {
      showModal({
         title: "Live Visitors",
         content: <>
            <div className="text-xs">This shows the number of people currently browsing your website — in real-time.</div>
            <div className="text-xs">It helps you understand peak times, monitor live campaign performance, and see immediate reactions to content or changes.</div>
         </>
      })
   }

   const bounceRateHelp = () => {
      showModal({
         title: "Bounce Rate",
         content: <>
            <div className="text-xs">This shows the percentage of visitors who leave your site after viewing only one page.</div>
            <div className="text-xs">A longer session usually means users are engaged and finding value. Short durations may signal confusing UX, weak content, or slow loading times.</div>
         </>
      })
   }

   const avgSessionDurationHelp = () => {
      showModal({
         title: "Average Session Duration",
         content: <>
            <div className="text-xs">This is the average amount of time users spend on your site during a single visit.</div>
            <div className="text-xs">A longer session usually means users are engaged and finding value. Short durations may signal confusing UX, weak content, or slow loading times.</div>
         </>
      })
   }

   const handleReload = () => {
      router.refresh();
   };

   if (status == "loading" || visitorsData == null) {
      return <LoadingWebsiteAnalytics />;
   }
   
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
               <button className="outline-black xxs" onClick={() => router.push("/dashboard")}>
                  <LayoutDashboard size={20} /> <span>Back to Dashboard</span>
               </button>
               
               <button className="outline-black xxs" onClick={handleReload}>
                  <RefreshCcw size={20} /> <span>Refresh Data</span>
               </button>
               
               <button className="outline-black xxs" onClick={() => showModal({
                  title: `Connect to ${websiteInfo.domain}`,
                  content: <>
                     <div className="text-xxs grey-5">Put this embed code in the {"<head>"} tag of your website page to connect visora to your website.</div>
                     <div className="text-s pd-1">
                        <button className="unclick grey xxs text-left">{`
                           <script
                              defer
                              data-web-identifier="${session?.user?.email?.substring(0,4)}"
                              data-party="visora"
                              data-website-id="${websiteInfo.websiteId.split(`${session?.user?.email?.substring(0,4)}-`)[1]}"
                              src="${appUrl}/cdn/track.js"
                           ></script>
                        `}</button>
                     </div>
                     <button className="xxxs" onClick={() => {
                        try {
                           navigator.clipboard.writeText(`<script defer data-web-identifier="${session?.user?.email?.substring(0,4)}" data-party="visora" data-website-id="${websiteInfo.websiteId.split(`${session?.user?.email?.substring(0,4)}-`)[1]}" src="${appUrl}/cdn/track.js"></script>`)
                           toast.success("Copied !")
                        } catch (e) { }
                     }}>
                        <Copy size={15} /> Copy to clipboard
                     </button>
                  </>
               })}>
                  <CodeXml size={20} /> <span>Connect to Website</span>
               </button>
            </div>

            <div className="horizontal-convertible gap-10">
               <Card padding="0 15px">
                  <div className="text-xs bold-600 pd-1">Visitors (last 30 days)</div>
                  <div className="text-xxl bold-800">{visitorsInPast30Days}</div>
                  {decideGrowthUI(growthInPast30Days)}
               </Card>
               <Card padding="0 15px">
                  <div className="text-xs bold-600 pd-1">Average Session Duration</div>
                  <div className="text-xxl bold-800">{formatTimeForAnalytics(averageSessionDuration)}</div>
                  <div 
                     className="text-xxs grey-5 dfb align-center gap-5 pd-2 visible-link fit"
                     onClick={avgSessionDurationHelp}  
                  ><Info size={18} /> Learn More</div>
               </Card>
            </div>
            
            <div className="horizontal-convertible gap-10">
               <Card padding="0 15px">
                  <div className="text-xs bold-600 pd-1">Bounce Rate</div>
                  <div className="text-xxl bold-800">{bounceRate}%</div>
                  <div 
                     className="text-xxs grey-5 dfb align-center gap-5 pd-2 visible-link fit"
                     onClick={bounceRateHelp}
                  ><Info size={18} /> Learn More</div>
               </Card>
               <Card padding="0 15px">
                  <div className="text-xs bold-600 pd-1">Device</div>
                  <div className="list">
                     <ProgressBar size={parseFloat(deviceComparison.desktop)}><DesktopIcon size={18} /> Desktop</ProgressBar>
                     <ProgressBar size={parseFloat(deviceComparison.mobile)}><MobileIcon size={18} /> Mobile</ProgressBar>
                  </div><br />
               </Card>
            </div>

            <div className="horizontal-convertible gap-10">
               <Card padding="0 15px">
                  <div className="text-xs bold-600 pd-1">Device</div>
                  <div className="list">
                     <ProgressBar size={parseFloat(osComparison.windowsPercent)}><WindowsIcon size={18} /> Windows</ProgressBar>
                     <ProgressBar size={parseFloat(osComparison.macOsPercent)}><MacOSIcon size={18} /> MacOS</ProgressBar>
                     <ProgressBar size={parseFloat(osComparison.androidPercent)}><AndroidIcon size={18} /> Android</ProgressBar>
                     <ProgressBar size={parseFloat(osComparison.iOsPercent)}><IOSIcon size={18} /> iOS</ProgressBar>
                     <ProgressBar size={parseFloat(osComparison.linuxPercent)}><LinuxIcon size={18} /> Linux</ProgressBar>
                     <ProgressBar size={parseFloat(osComparison.unknownPercent)}><CircleHelp size={18} /> Unknown</ProgressBar>
                  </div><br />
               </Card>
            </div>

            <div className="horizontal-convertible gap-10">
               <Card padding="0 15px">
                  <div className="text-s bold-600 pd-15">Country Statistics</div>
                  <div className="list">
                     {WebsiteAnalyticsCalculator.countryStats(visitorsData).map((countryStat, index) => {
                        return <ProgressBar key={index} size={parseFloat(countryStat.percent)}>
                           <CustomFlagIcon size={20} url={getCountryFlag(countryStat.flagCode.toLowerCase())} />
                           {countryStat.country}
                        </ProgressBar>
                     })}
                  </div>
                  <br />
               </Card>
            </div>

            <div className="horizontal-convertible gap-10">
               <Card padding="0 15px">
                  <div className="text-s bold-600 pd-15">Page Views</div>
                  <div className="list">
                     {WebsiteAnalyticsCalculator.pageStats(visitorsData).map((pageStat, index) => {
                        return <ProgressBar key={index} size={parseFloat(pageStat.percent)}>
                           {pageStat.page.split(websiteInfo.domain)[1]}
                        </ProgressBar>
                     })}
                  </div>
                  <br />
               </Card>
            </div>
            
            <div className="horizontal-convertible gap-10">
               <Card padding="0 15px">
                  <div className="text-s bold-600 pd-15">UTM Sources</div>
                  <div className="list">
                     {WebsiteAnalyticsCalculator.utmSourceStats(visitorsData).map((utmSourceStat, index) => {
                        return <ProgressBar key={index} size={parseFloat(utmSourceStat.percent)}>
                           {utmSourceStat.utmSource}
                        </ProgressBar>
                     })}
                  </div>
                  <br />
               </Card>
            </div>

            <Spacing size={1} />
            
            <div className="horizontal-convertible gap-10">
               <Card padding="0 15px">
                  <div className="text-s bold-600 pd-15 dfb align-center gap-7">
                     Recommendations <div className="text-xxs fit grey-4">(powered by AI)</div> <Sparkle size={18} fill="#6A0DAD" color="#6A0DAD" />
                  </div>
                  <div className="list gap-10">
                     {AiRecommendations.currentVisitors(liveVisitors)?.title && <>
                        <Card padding="10px">
                           <div className="text-xs bold-600">{AiRecommendations.currentVisitors(liveVisitors)?.title}</div>
                           <div className="text-xxs grey-5 pd-05">{AiRecommendations.currentVisitors(liveVisitors)?.text}</div>
                           <div className="text-xxs grey-5 pd-05">
                              <button 
                                 className="xxxs"
                                 onClick={() =>
                                    showModal({
                                       title: AiRecommendations.currentVisitors(liveVisitors)?.title,
                                       content: (<>
                                          <div className="text-xxs">{AiRecommendations.currentVisitors(liveVisitors)?.text}</div><br />
                                          <div className="text-xxs bold-500">Apply the following to help:</div>
                                          <>{AiRecommendations.currentVisitors(liveVisitors)?.help.map((tip, index) => {
                                             return <div className="text-xxs" key={index}>- {tip}</div>
                                          })}</>
                                       </>)
                                    })
                                 }
                              >{AiRecommendations.currentVisitors(liveVisitors)?.action}</button>
                           </div>
                        </Card>
                     </>}

                     <Card padding="10px">
                        <div className="text-xs bold-600">{AiRecommendations.bounceRate(bounceRate).title}</div>
                        <div className="text-xxs grey-5 pd-05">{AiRecommendations.bounceRate(bounceRate).text}</div>
                        <div className="text-xxs grey-5 pd-05">
                           <button 
                              className="xxxs"
                              onClick={() =>
                                 showModal({
                                    title: AiRecommendations.bounceRate(bounceRate).title,
                                    content: (<>
                                       <div className="text-xxs">{AiRecommendations.bounceRate(bounceRate).text}</div><br />
                                       <div className="text-xxs bold-500">Apply the following to help:</div>
                                       <>{AiRecommendations.bounceRate(bounceRate).help.map((tip, index) => {
                                          return <div className="text-xxs" key={index}>- {tip}</div>
                                       })}</>
                                    </>)
                                 })
                              }
                           >{AiRecommendations.bounceRate(bounceRate).action}</button>
                        </div>
                     </Card>
                     
                     <Card padding="10px">
                        <div className="text-xs bold-600">{AiRecommendations.averageSessionDuration(averageSessionDuration).title}</div>
                        <div className="text-xxs grey-5 pd-05">{AiRecommendations.averageSessionDuration(averageSessionDuration).text}</div>
                        <div className="text-xxs grey-5 pd-05">
                           <button 
                              className="xxxs"
                              onClick={() =>
                                 showModal({
                                    title: AiRecommendations.averageSessionDuration(averageSessionDuration).title,
                                    content: (<>
                                       <div className="text-xxs">{AiRecommendations.averageSessionDuration(averageSessionDuration).text}</div><br />
                                       <div className="text-xxs bold-500">Apply the following to help:</div>
                                       <>{AiRecommendations.averageSessionDuration(averageSessionDuration).help.map((tip, index) => {
                                          return <div className="text-xxs" key={index}>- {tip}</div>
                                       })}</>
                                    </>)
                                 })
                              }
                           >{AiRecommendations.averageSessionDuration(averageSessionDuration).action}</button>
                        </div>
                     </Card>
                     
                     <Card padding="10px">
                        <div className="text-xs bold-600">{AiRecommendations.growthOfVisitorsLast30Days(visitorsInPast30Days).title}</div>
                        <div className="text-xxs grey-5 pd-05">{AiRecommendations.growthOfVisitorsLast30Days(visitorsInPast30Days).text}</div>
                        <div className="text-xxs grey-5 pd-05">
                           <button 
                              className="xxxs"
                              onClick={() =>
                                 showModal({
                                    title: AiRecommendations.growthOfVisitorsLast30Days(visitorsInPast30Days).title,
                                    content: (<>
                                       <div className="text-xxs">{AiRecommendations.growthOfVisitorsLast30Days(visitorsInPast30Days).text}</div><br />
                                       <div className="text-xxs bold-500">Apply the following to help:</div>
                                       <>{AiRecommendations.growthOfVisitorsLast30Days(visitorsInPast30Days).help.map((tip, index) => {
                                          return <div className="text-xxs" key={index}>- {tip}</div>
                                       })}</>
                                    </>)
                                 })
                              }
                           >{AiRecommendations.growthOfVisitorsLast30Days(visitorsInPast30Days).action}</button>
                        </div>
                     </Card>
                  </div>
                  
                  <Spacing size={1} />
               </Card>
            </div>
            
            <Spacing size={1} />

            <div className="horizontal-convertible gap-10">
               <Card padding="20px 15px">
                  <div className="text-s bold-600">Website Settings</div>
                  <div className="text-xxs">Manage your website analytics below. Your website has been connected to Visora since {websiteInfo.createdAt}</div>
                  <br />
                  <div className="text-xs bold-600">Delete</div>
                  <div className="text-xxs">Click below to deactivate your website on visora, <b>this action cannot be reversed</b></div>
                  <div className="text-s pd-1">
                     <button 
                        className="xxs delete"
                        onClick={() => showModal({
                           title: `Delete ${websiteInfo.domain}`,
                           content: <>
                              <div className="text-xs grey-5">This will deactivate Visora from {websiteInfo.domain}</div>
                              <div className="text-s pd-1">
                                 <button className="full delete xxs" onClick={deleteWebsiteButton}>
                                    <Trash2 size={15} /> Deactivate {websiteInfo.domain}
                                 </button>
                              </div>
                           </>
                        })}
                     ><Trash2 size={16} /> Delete</button>
                  </div>
               </Card>
            </div>

            <Spacing size={3} />

         </div>
      </div>
   )
}
