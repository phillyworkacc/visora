"use client"
import { appUrl } from "@/utils/constants";
import "./Icon.css"
import Image from "next/image";

type IconProps = {
   size: number;
}

type CustomIconProps = {
   size: number;
   url: string;
   round?: boolean;
}

export function VisoraLogo({ size }: IconProps) {
   return (
      <div className='icon' style={{
         width: `${size}px`, height: `${size}px`
      }}>
         <Image src={appUrl + "/assets/logo/white-background-logo.png"} alt="logo" width={size} height={size} />
      </div>
   )
}

export function VisoraRawLogo({ size }: IconProps) {
   return (
      <svg width={`${Math.round(size * 1.84848484)}`} height={`${size}`} viewBox="0 0 366 198" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M6.83551 189.624L150.797 72.735L207.794 133.175L345.529 20.277" stroke="#6A0DAD" strokeWidth="20"/>
         <path d="M347.615 75.2426L288.892 7.69024L364.711 1.08101L347.615 75.2426Z" fill="#6A0DAD" stroke="#6A0DAD"/>
         <path d="M176 30C219.174 30 257.764 39.2065 285.197 53.6045C313.098 68.2484 327 86.7405 327 104.5C327 122.26 313.098 140.752 285.197 155.396C257.764 169.793 219.174 179 176 179C132.826 179 94.2355 169.793 66.8027 155.396C38.9015 140.752 25 122.26 25 104.5C25 86.7405 38.9015 68.2484 66.8027 53.6045C94.2355 39.2065 132.826 30 176 30Z" stroke="#6A0DAD" strokeWidth="20"/>
      </svg>
   )
}

export function GoogleIcon({ size }: IconProps) {
   return (
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width={size} height={size} viewBox="0 0 48 48">
         <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
      </svg>
   )
}

export function GithubIcon ({ size }: IconProps) {
   return (
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width={size} height={size} viewBox="0 0 30 30">
         <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
      </svg>
   )
}

export function AndroidIcon({ size }: IconProps) {
   return <div className="icon" style={{ width: `${size}px`, height: `${size}px` }}>
      <img src={appUrl + '/icons/android.png'} alt="icon" />
   </div>
}

export function LinuxIcon({ size }: IconProps) {
   return <div className="icon" style={{ width: `${size}px`, height: `${size}px` }}>
      <img src={appUrl + '/icons/linux.png'} alt="icon" />
   </div>
}

export function WindowsIcon({ size }: IconProps) {
   return <div className="icon" style={{ width: `${size}px`, height: `${size}px` }}>
      <img src={appUrl + '/icons/windows.png'} alt="icon" />
   </div>
}

export function IOSIcon({ size }: IconProps) {
   return <div className="icon" style={{ width: `${size}px`, height: `${size}px` }}>
      <img src={appUrl + '/icons/ios.png'} alt="icon" />
   </div>
}

export function MacOSIcon({ size }: IconProps) {
   return <div className="icon" style={{ width: `${size}px`, height: `${size}px` }}>
      <img src={appUrl + '/icons/macos.png'} alt="icon" />
   </div>
}

export function DesktopIcon({ size }: IconProps) {
   return <div className="icon" style={{ width: `${size}px`, height: `${size}px` }}>
      <img src={appUrl + '/icons/desktop.png'} alt="icon" />
   </div>
}

export function MobileIcon({ size }: IconProps) {
   return <div className="icon" style={{ width: `${size}px`, height: `${size}px` }}>
      <img src={appUrl + '/icons/mobile.png'} alt="icon" />
   </div>
}

export function CustomIcon({ size, url, round }: CustomIconProps) {
   return <div className={`icon ${round ? 'round' : ''}`} style={{ width: `${size}px`, height: `${size}px` }}>
      <img src={url} alt="icon" width={size} height={size} />
   </div>
}

export function CustomAvatarIcon({ size, url, round }: CustomIconProps) {
   return <div className={`icon ${round ? 'round' : ''}`} style={{ width: `${size}px`, height: `${size}px` }}>
      <Image src={url} alt="icon" width={size} height={size} />
   </div>
}

export function CustomFlagIcon({ size, url }: CustomIconProps) {
   return <div className="icon" style={{ width: `${Math.round(size*1.333333)}px`, height: `${size}px` }}>
      <Image 
         src={url} 
         alt="icon" 
         style={{ borderRadius: '4px' }} 
         width={size} 
         height={size}
         onError={(e: any) => (e.target.src = '/assets/unknown-flag.png')}
      />
   </div>
}