export function formatMilliseconds(ms: number, withoutTime?: boolean): string {
   const date = new Date(ms);

   const day = date.getDate();
   const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
   ];
   const month = monthNames[date.getMonth()];
   const year = date.getFullYear();

   let hours = date.getHours();
   const minutes = date.getMinutes();
   const timePeriod = hours >= 12 ? 'pm' : 'am';

   hours = hours % 12;
   if (hours === 0) hours = 12;

   const formattedMinutes = minutes.toString().padStart(2, '0');

   return withoutTime
      ? `${day} ${month} ${year}`
      : `${day} ${month} ${year}, ${hours}:${formattedMinutes} ${timePeriod}`
   }