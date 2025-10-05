declare module '*.css';

type User = {
   email: string;
   userid: string;
   websites: string[];
   hasAccess: boolean;
   createdAt: number;
}

type Website = {
   websiteId: string;
   userid: string;
   domain: string;
   favicon: string;
   createdAt: number;
}

type VisitorPageData = {
   url: string;
   referrer: string;
   entryPage: boolean;
   visits: number;
}

type VisitorSession = {
   sessionId: string;
   timestamp: number;
   sessionDuration: number;
   interacted: boolean;
   utmSource: string;
   utmCampaign: string;
   pagesVisited: number;
}

type VisitorData = {
   visitorId: string;
   websiteId: string,
   sessions: VisitorSession[];
   device: {
      type: 'mobile' | 'desktop';
      os: string;
   },
   pages: VisitorPageData[];
   location: {
      ip: string,
      country: string;
      countryCode: string;
      city: string;
      timezone: string;
   },
   live: boolean;
}

type RawVisitorUserTracker = {
   websiteId: string;
   webIdentifier: string;
   visitorId: string;
   sessionId: string;
   timestamp: number;
   device: {
      type: 'mobile' | 'desktop';
      os: string;
   },
   page: VisitorPageData;
   location: {
      ip: string,
      country: string;
      countryCode: string;
      city: string;
      timezone: string;
   },
   engagement: {
      sessionDuration: number;
      interacted: boolean;
   },
   traffic: {
      utmSource: string;
      utmCampaign: string;
   }
   live: boolean;
};

type RawVisitorUserTrackerUpdate = {
   websiteId: string;
   webIdentifier: string;
   visitorId: string;
   sessionId: string;
   timestamp: number;
   engagement: {
      sessionDuration: number;
      interacted: boolean;
   },
   live: boolean;
};