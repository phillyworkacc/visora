export function getDeviceType(navgtr: Navigator): 'mobile' | 'desktop' {
   const ua = navgtr.userAgent;
   if (/Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)) {
      return 'mobile';
   } else {
      return 'desktop';
   }
}

export function isMobileDevice() {
   return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}