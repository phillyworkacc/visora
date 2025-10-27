'use client'
import { getDeviceType } from '@/utils/device';
import { CSSProperties, useEffect, useState } from 'react';
import { CartesianGrid, XAxis, YAxis, Tooltip, AreaChart, Area, ResponsiveContainer } from 'recharts';

type ChartProps = {
   data: any;
   yDataKey: string;
   xDataKey: string;
}

export default function Chart({ data, yDataKey, xDataKey }: ChartProps) {
   const [width, setWidth] = useState(500)
   const [height, setHeight] = useState(250)

   useEffect(() => {
      if (getDeviceType(navigator) == "mobile") {
         setHeight(200)
         setWidth(300)
      } else {
         setHeight(250)
         setWidth(550)
      }
   }, [])

   return (
      <ResponsiveContainer width={"100%"} height={height}>         
         <AreaChart width={width} height={height} data={data} margin={{ left: -10, right: 10 }}>
            <defs>
               <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#b752ff" stopOpacity={0.45} />
                  <stop offset="95%" stopColor="#b752ff" stopOpacity={0.05} />
               </linearGradient>
            </defs>

            <XAxis dataKey={xDataKey} padding={{ left: 15 }} tick={{ fontSize: '0.9rem' }} />
            <YAxis
               tick={{ fill: "#a3a3a3b9", fontSize: 12 }}
               tickLine={false}
               axisLine={false}
               width={35}
            />

            <Area 
               type="monotone" 
               dataKey={yDataKey} 
               stroke="#b752ff" 
               fill="url(#colorValue)" 
               strokeWidth={getDeviceType(navigator) == "desktop" ? 1.5 : 1}
               dot={false}
               activeDot={{
                  r: 6,
                  stroke: "#fff",
                  strokeWidth: 1,
                  fill: "#b752ffc2",
               }}
            />
            
            {/* <CartesianGrid verticalValues={data.flatMap((dt: any) => dt.value)} /> */}
            <CartesianGrid 
               verticalValues={data.flatMap((dt: any) => dt.value)}
               strokeDasharray="4 4"
               vertical={false}
               stroke="#a3a3a3ff"
               opacity={0.85}
            />
            
            {/* <Tooltip cursor={{
               strokeWidth: 0.5,
               stroke: "#ececec"
            }} /> */}
            <Tooltip 
               content={<CustomTooltip 
                  width={width} 
                  xAxisKey={xDataKey}
                  yAxisKey={yDataKey}
                  isMobile={(getDeviceType(navigator) == "mobile")}
               />}
               cursor={{ strokeWidth: 0.5, stroke: "#e6e6e6" }}
               wrapperStyle={{ marginLeft: 20, marginTop: -20 }}
            />
         </AreaChart>
      </ResponsiveContainer>
   )
}

function CustomTooltip ({ active, payload, coordinate, width, xAxisKey, yAxisKey, isMobile }: any) {
   if (!active || !payload?.length) return null;
   
   const { x, y } = coordinate;

   const tooltipStyles: CSSProperties = {
      background: "rgba(255, 255, 255, 0.65)",
      backdropFilter: "blur(10px)",
      padding: "18px",
      borderRadius: "15px",
      width: "200px",
      boxShadow: "0 1px 5px rgba(0, 0, 0, 0.097)",
      position: "absolute",
      left: x > (width*0.60) ? x - 260 : x + 30, // 👈 add offset from cursor
      top: y > 90 ? 25 : y - 10,
      pointerEvents: "none",
      transition: "all 0.15s ease-out", // 👈 smooth slide
      transform: "translateY(0)"
   }

   if (isMobile) return <></>;
   const views: any = payload[0].payload;

   return (
      <div className="box h-fit" style={tooltipStyles}>
         <div className="text-xxxs grey-4 full mb-05">Page Visits ({views[xAxisKey]})</div>
         <div className="text-m bold-700 full mb-05">{views[yAxisKey]}</div>
      </div>
   )
}
