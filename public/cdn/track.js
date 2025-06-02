(function () {
   const visoraWebsiteId = document.currentScript.getAttribute('data-website-id');
   const visoraWebIdentifier = document.currentScript.getAttribute('data-web-identifier');
   if (!visoraWebsiteId || !visoraWebIdentifier) return;

   let getGeo = false;

   function getVisitorId() {
      let id = localStorage.getItem('visora_web_track_vid');
      if (!id) {
         id = crypto.randomUUID();
         localStorage.setItem('visora_web_track_vid', id);
         getGeo = true;
      }
      return id;
   }

   function getSessionId() {
      let id = sessionStorage.getItem('visora_web_track_sid');
      if (!id) {
         id = crypto.randomUUID();
         sessionStorage.setItem('visora_web_track_sid', id);
      }
      return id;
   }

   function getClientOS() {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;

      if (/windows phone/i.test(userAgent)) {
         return "Windows";
      }
      if (/win/i.test(userAgent)) {
         return "Windows";
      }
      if (/android/i.test(userAgent)) {
         return "Android";
      }
      if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
         return "iOS";
      }
      if (/Macintosh|MacIntel|MacPPC|Mac68K/.test(userAgent)) {
         return "MacOS";
      }
      if (/linux/i.test(userAgent)) {
         return "Linux";
      }

      return "Unknown";
   }

   async function getClientIP(gg) {
      if (gg) {
         try {
            const res = await fetch('https://api.ipify.org?format=json');
            const data = await res.json();
            return data.ip; // e.g., "123.45.67.89"
         } catch (err) {
            console.error('Failed to get IP address:', err);
            return 'x.x.x.x';
         }
      } else {
         return ''
      }
   }

   async function getClientGeoInfo(gg) {
      if (gg) {
         try {
            const res = await fetch('https://ipapi.co/json/');
            const data = await res.json();
            return {
               country: data.country_name,
               countryCode: data.country_code,
               city: data.city,
               timezone: data.timezone
            };
         } catch (err) {
            console.error('Failed to get geo info:', err);
            return null;
         }
      } else {
         return {
            country: '',
            countryCode: '',
            city: '',
            timezone: ''
         };
      }
   }

   function getUTM () {
      const params = new URLSearchParams(window.location.search);
      return {
         utmSource: params.get('utm_source') || 'None',
         utmCampaign: params.get('utm_campaign') || 'None'
      }
   }

   if (!sessionStorage.getItem('visora_web_track_session_start')) {
      sessionStorage.setItem('visora_web_track_session_start', Date.now());
   }

   let interacted = false;
   ['click', 'scroll', 'keydown'].forEach(evt =>
      window.addEventListener(evt, () => (interacted = true), { once: true })
   );

   window.addEventListener('beforeunload', async () => {
      const sessionStartTime = parseInt(`${sessionStorage.getItem('visora_web_track_session_start')}`);
      const endTime = Date.now();
      const sessionDuration = Math.round((endTime - sessionStartTime) / 1000); // seconds

      const data = {
         visitorId: localStorage.getItem('visora_web_track_vid'),
         sessionId: sessionStorage.getItem('visora_web_track_sid'),
         timestamp: endTime,
         live: false,
         engagement: {
            sessionDuration: sessionDuration,
            interacted: interacted
         }
      };

      await fetch('https://visora.vercel.app/api/user-track', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json', Authorization: "N+w9Wk=31" },
         body: JSON.stringify({
            websiteId: visoraWebsiteId, 
            webIdentifier: visoraWebIdentifier,
            ...data
         })
      });
   });

   async function sendAnalytics() {
      const vid = getVisitorId()
      const sid = getSessionId()
      const visitorIp = await getClientIP(getGeo);
      const clientGeoInfo = await getClientGeoInfo(getGeo);
      const data = {
         visitorId: vid,
         sessionId: sid,
         timestamp: Date.now(),
         device: {
            type: /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
            os: getClientOS()
         },
         page: {
            url: location.href,
            referrer: document.referrer,
            entryPage: performance.getEntriesByType("navigation")[0]?.type === "navigate"
         },
         location: {
            ip: visitorIp,
            country: clientGeoInfo.country,
            countryCode: clientGeoInfo.countryCode,
            city: clientGeoInfo.city,
            timezone: clientGeoInfo.timezone,
         },
         engagement: {
            sessionDuration: 0,
            interacted: false
         },
         traffic: {
            utmSource: getUTM().utmSource,
            utmCampaign: getUTM().utmCampaign
         },
         live: true
      };
      
      await fetch('https://visora.vercel.app/api/user-track', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json', Authorization: "N+w9Wk=31" },
         body: JSON.stringify({
            websiteId: visoraWebsiteId, 
            webIdentifier: visoraWebIdentifier,
            ...data
         })
      });
   }

   // Track immediately when DOM is ready
   document.addEventListener("DOMContentLoaded", sendAnalytics);
})();
