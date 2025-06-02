"use client"
import "./ProgressBar.css"
import { ReactNode } from "react";

type ProgressBarProps = {
   size: number;
   children: ReactNode
}

export default function ProgressBar({ size, children }: ProgressBarProps) {
   return (
      <div className="progress-bar">
         <div className="label">
            {children} <b>({size.toFixed(1)}%)</b>
         </div>
         { size > 0 ? <div className="progress" style={{ width: `${size}%` }}></div> : <></> }
      </div>
   )
}
