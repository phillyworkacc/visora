import { connectToDatabase } from "@/db/db";
import VisitorsDataDb from "@/db/visitordata";
import { NextRequest, NextResponse } from "next/server";

const getCORSHeaders = () => {
   const headers = new Headers();
   headers.set('Access-Control-Allow-Origin', '*');
   headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
   headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
   return headers;
};

export async function OPTIONS() {
   return new NextResponse(null, {
      status: 204,
      headers: getCORSHeaders(),
   });
}

export async function POST(req: NextRequest) {
   await connectToDatabase();
   const authorizer = "N+w9Wk=31"
   const authHeader = await req.headers.get("authorization")
   const body: RawVisitorUserTracker = await req.json();

   if (authHeader === authorizer) {
      // quick log of the body received from the api request
      console.log('Visora Web Tracker', body);

      // check if visitor exists and if not create a visitor
      const visitor: VisitorData | null = await VisitorsDataDb.findOne({
         visitorId: body.visitorId,
         websiteId: `website-${body.webIdentifier}-${body.websiteId}`
      });
      if (!visitor) {
         // create visitor data on the database
         await VisitorsDataDb.create({
            visitorId: body.visitorId,
            websiteId: `website-${body.webIdentifier}-${body.websiteId}`,
            sessions: [{
               sessionId: body.sessionId,
               timestamp: body.timestamp,
               sessionDuration: body.engagement.sessionDuration,
               interacted: body.engagement.interacted,
               utmSource: body.traffic.utmSource,
               utmCampaign: body.traffic.utmCampaign,
               pagesVisited: 1
            }],
            device: {
               type: body.device.type,
               os: body.device.os
            },
            pages: [{ ...body.page, visits: 1 }],
            location: {
               ip: body.location.ip,
               country: body.location.country,
               countryCode: body.location.countryCode,
               city: body.location.city,
               timezone: body.location.timezone
            },
            live: true
         } as VisitorData);

         return NextResponse.json(
            { message: "success" },
            { status: 200, headers: getCORSHeaders() }
         );
      }

      // if visitor already exists move on and update the visitor's on the database
      if (body.live === false) {
         // if user left the page/website (user has ended the session)
         // make update on the database 
         const updateDataBody: RawVisitorUserTrackerUpdate = body;
         const fullWebsiteId = `website-${updateDataBody.webIdentifier}-${updateDataBody.websiteId}`;

         // updating database
         const visitorUpdate: any | null = await VisitorsDataDb.findOne({ visitorId: updateDataBody.visitorId, websiteId: fullWebsiteId });
         if (visitorUpdate) {
            const sessionIndex = visitorUpdate.sessions.findIndex((session: VisitorSession) => session.sessionId === updateDataBody.sessionId);
            visitorUpdate.sessions[sessionIndex].interacted = updateDataBody.engagement.interacted;
            visitorUpdate.sessions[sessionIndex].sessionDuration = updateDataBody.engagement.sessionDuration;
            visitorUpdate.sessions[sessionIndex].timestamp = updateDataBody.timestamp;
            visitorUpdate.live = updateDataBody.live;
            await visitorUpdate.save();
         }
      } else {
         // user probably visited a new page or a previous page
         // make these changes on the database
         const fullWebsiteId = `website-${body.webIdentifier}-${body.websiteId}`;
         
         // check if user has visited the page they just visited
         const hasVisitorVisitedPagePreviously = visitor.pages.some(page => page.url === body.page.url);

         // updating database
         const visitorUpdate: any | null = await VisitorsDataDb.findOne({ visitorId: body.visitorId, websiteId: fullWebsiteId });

         // check whether user started a new session
         
         if (visitorUpdate) {
            const newSession = (visitorUpdate.sessions.filter((session: any) => session.sessionId == body.sessionId).length < 1);
            if (newSession) {
               visitorUpdate.sessions.push({
                  sessionId: body.sessionId,
                  timestamp: body.timestamp,
                  sessionDuration: body.engagement.sessionDuration,
                  interacted: body.engagement.interacted,
                  utmSource: body.traffic.utmSource,
                  utmCampaign: body.traffic.utmCampaign,
                  pagesVisited: 1
               })
            } else {
               const sessionIndex = visitor.sessions.findIndex(session => session.sessionId == body.sessionId);
   
               visitorUpdate.sessions[sessionIndex].sessionId = body.sessionId;
               visitorUpdate.sessions[sessionIndex].timestamp = body.timestamp;
               visitorUpdate.sessions[sessionIndex].sessionDuration = body.engagement.sessionDuration;
               visitorUpdate.sessions[sessionIndex].interacted = body.engagement.interacted;
               visitorUpdate.sessions[sessionIndex].utmSource = body.traffic.utmSource;
               visitorUpdate.sessions[sessionIndex].utmCampaign = body.traffic.utmCampaign;
               visitorUpdate.sessions[sessionIndex].pagesVisited = visitorUpdate.sessions[sessionIndex].pagesVisited + 1;
            }

            if (hasVisitorVisitedPagePreviously) {
               // since the user has visited the page before
               // we will add 1 visit to the page in the pages array
               const pageIndex = visitorUpdate.pages.findIndex((page: VisitorPageData) => page.url === body.page.url);
               visitorUpdate.pages[pageIndex].visits += 1
            } else {
               // since the user has NOT visited the page before
               // we will add a page object into the pages array
               visitorUpdate.pages.push({
                  url: body.page.url,
                  referrer: body.page.referrer,
                  entryPage: body.page.entryPage,
                  visits: 1
               })
            }
            visitorUpdate.live = body.live;
            await visitorUpdate.save();
         }
      }
      
      return NextResponse.json(
         { message: "success" },
         { status: 200, headers: getCORSHeaders() }
      );
   } else {
      return NextResponse.json(
         { message: "fail" },
         { status: 500, headers: getCORSHeaders() }
      );
   }
}