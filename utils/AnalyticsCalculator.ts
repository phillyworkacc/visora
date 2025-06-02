
export function formatTimeForAnalytics (seconds: number) {
   const mins = Math.floor(seconds / 60);
   const secs = seconds % 60;

   if (mins && secs) return `${mins}m ${secs}s`;
   if (mins) return `${mins}m`;
   return `${secs}s`;
}

export const WebsiteAnalyticsCalculator = {
   liveVisitors: (visitorsData: VisitorData[]) => {
      const liveVisitors = visitorsData.filter(visitor => visitor.live === true);
      return liveVisitors.length;
   },

   visitorsInPast30Days: (visitorsData: VisitorData[]) => {
      const currentTime = Date.now();
      const time30DaysAgo = currentTime - (30 * 24 * 60 * 60 * 1000);
      const visitorsWithinLast30Days = visitorsData.filter(visitor => visitor.sessions[visitor.sessions.length-1].timestamp >= time30DaysAgo);
      return visitorsWithinLast30Days.length;
   },

   growthInVisitorsInPast30Days: (visitorsData: VisitorData[]) => {
      const time30DaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
      const time60DaysAgo = Date.now() - (60 * 24 * 60 * 60 * 1000);

      const visitorsWithinLast30Days = visitorsData.filter(visitor => visitor.sessions[visitor.sessions.length-1].timestamp >= time30DaysAgo);
      const visitorsWithinLast60Days = visitorsData.filter(visitor => {
         return visitor.sessions[visitor.sessions.length-1].timestamp >= time60DaysAgo 
         && visitor.sessions[visitor.sessions.length-1].timestamp <= time30DaysAgo
      });
      const deltaMonths = visitorsWithinLast30Days.length - visitorsWithinLast60Days.length;

      return visitorsWithinLast60Days.length == 0 
         ? 100
         : Math.round((deltaMonths / visitorsWithinLast60Days.length) * 100)
   },

   bounceRate: (visitorsData: VisitorData[]) => {
      let totalSessions = 0;
      let bouncedSessions = 0;

      for (const visitor of visitorsData) {
         for (const session of visitor.sessions) {
            totalSessions++;
            if (session.pagesVisited <= 1) {
               bouncedSessions++;
            }
         }
      }

      if (totalSessions === 0) return 0;

      const bounceRate = (bouncedSessions / totalSessions) * 100;
      return Math.round(bounceRate);
   },

   averageSessionDuration: (visitorsData: VisitorData[]) => {
      const visitorSessionAverages = [];

      for (let i = 0; i < visitorsData.length; i++) {
         const visitor = visitorsData[i];
         const totalVisitorSessionDuration = visitor.sessions.reduce((sum, session) => sum + session.sessionDuration, 0);
         const averageVisitorSessionDuration = totalVisitorSessionDuration / visitor.sessions.length;
         visitorSessionAverages.push(averageVisitorSessionDuration);
      }

      const totalAverageSessionDurations = visitorSessionAverages.reduce((sum, averageVisitorSessionDuration) => sum + averageVisitorSessionDuration, 0);
      return Math.round(totalAverageSessionDurations / visitorSessionAverages.length);
   },

   deviceComparison: (visitorsData: VisitorData[]) => {
      const desktopUsers = visitorsData.filter(visitor => visitor.device.type === "desktop").length;
      const desktopPercent = ((desktopUsers / visitorsData.length) * 100).toFixed(1);
      return {
         desktop: desktopPercent,
         mobile: (100 - parseFloat(desktopPercent)).toFixed(1)
      }
   },

   osComparison: (visitorsData: VisitorData[]) => {
      const windowsUsers = visitorsData.filter(visitor => visitor.device.os.toLowerCase().includes("windows")).length;
      const windowsPercent = ((windowsUsers / visitorsData.length) * 100).toFixed(1);

      const macOsUsers = visitorsData.filter(visitor => visitor.device.os.toLowerCase().includes("mac")).length;
      const macOsPercent = ((macOsUsers / visitorsData.length) * 100).toFixed(1);

      const iOsUsers = visitorsData.filter(visitor => visitor.device.os.toLowerCase().includes("ios")).length;
      const iOsPercent = ((iOsUsers / visitorsData.length) * 100).toFixed(1);

      const linuxUsers = visitorsData.filter(visitor => visitor.device.os.toLowerCase().includes("linux")).length;
      const linuxPercent = ((linuxUsers / visitorsData.length) * 100).toFixed(1);

      const androidUsers = visitorsData.filter(visitor => visitor.device.os.toLowerCase().includes("android")).length;
      const androidPercent = ((androidUsers / visitorsData.length) * 100).toFixed(1);

      const unknownUsers = visitorsData.filter(visitor => visitor.device.os.toLowerCase().includes("unknown")).length;
      const unknownPercent = ((unknownUsers / visitorsData.length) * 100).toFixed(1);

      return {
         windowsPercent,
         macOsPercent,
         iOsPercent,
         linuxPercent,
         androidPercent,
         unknownPercent
      }
   },

   countryStats: (visitorsData: VisitorData[]) => {
      const availableCountries = [...new Set(visitorsData.map(visitor => visitor.location.country))]
      const availableCountryCodes = [...new Set(visitorsData.map(visitor => visitor.location.countryCode))]

      return availableCountries.map((availableCountry, index) => {
         const filterDataLocation = visitorsData.filter(visitor => visitor.location.country == availableCountry);
         const percent = ((filterDataLocation.length / visitorsData.length) * 100).toFixed(1);
         return {
            country: availableCountry,
            flagCode: availableCountryCodes[index],
            percent
         }
      })
   },

   utmSourceStats: (visitorsData: VisitorData[]) => {
      const utmFromEachVisitor: string[] = []

      for (let i = 0; i < visitorsData.length; i++) {
         const visitor = visitorsData[i];
         const availableUTMs = [...new Set(visitor.sessions.map(session => session.utmSource))]
         availableUTMs.forEach((availableUTM) => {
            utmFromEachVisitor.push(availableUTM);
         })
      }

      const availableUTMsOverall = [...new Set(utmFromEachVisitor.map((utm: string) => utm))]
      return availableUTMsOverall.map((utmOverall) => {
         const numberOfUtm = utmFromEachVisitor.filter(utm => utm == utmOverall).length;
         const percent = ((numberOfUtm / utmFromEachVisitor.length) * 100).toFixed(1);
         return {
            utmSource: utmOverall,
            percent
         }
      })
   },

   pageStats: (visitorsData: VisitorData[]) => {
      const individualPages: string[] = []

      for (const visitor of visitorsData) {
         visitor.pages.forEach((page) => {
            if (!individualPages.includes(page.url)) individualPages.push(page.url);
         })
      }

      const indPagesTotalVisits = Array.from({ length: individualPages.length }, (_, m) => 0);
      // loop through each visitor
      for (const visitor of visitorsData) {
         // loop through each page the visitor has visited and
         // add the number of times they've visited each page to the indPagesTotalVisits array
         for (const page of visitor.pages) {
            const index = individualPages.indexOf(page.url);
            indPagesTotalVisits[index] += page.visits;
         }
      }

      const fullTotal = indPagesTotalVisits.reduce((sum, num) => sum + num, 0);

      return individualPages.map((page, index) => {
         return {
            page: page,
            // visits: indPagesTotalVisits[index],
            percent: ((indPagesTotalVisits[index] / fullTotal) * 100).toFixed(1)
         }
      })
   }
}