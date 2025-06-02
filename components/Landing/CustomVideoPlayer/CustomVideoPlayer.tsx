'use client'
import './CustomVideoPlayer.css';
import { Maximize, Pause, PictureInPicture2, PlayIcon, X } from 'lucide-react';
import { useRef, useState } from 'react'

export default function CustomVideoPlayer() {
   const videoRef = useRef<HTMLVideoElement | null>(null);
   const [isPlaying, setIsPlaying] = useState(false);
   const [progress, setProgress] = useState(0);
   const [playbackSpeed, setPlaybackSpeed] = useState(1);

   const togglePlay = (): void => {
      const video = videoRef.current;
      if (!video) return;

      if (video.paused) {
         video.play();
         setIsPlaying(true);
      } else {
         video.pause();
         setIsPlaying(false);
      }
   };

   const handleProgress = (): void => {
      const video = videoRef.current;
      if (!video || !video.duration) return;

      setProgress((video.currentTime / video.duration) * 100);
   };

   const handleSeek = (e: React.ChangeEvent<HTMLInputElement>): void => {
      const video = videoRef.current;
      if (!video || !video.duration) return;

      const newTime = (Number(e.target.value) / 100) * video.duration;
      video.currentTime = newTime;
      setProgress(Number(e.target.value));
   };

   const toggleFullscreen = (): void => {
      const video = videoRef.current;
      if (!video) return;

      if (video.requestFullscreen) {
         video.requestFullscreen();
      } else if ((video as any).webkitEnterFullscreen) {
         (video as any).webkitEnterFullscreen(); // Safari fallback
      }
   };

   const togglePiP = async (): Promise<void> => {
      const video = videoRef.current;
      if (!video) return;

      if (document.pictureInPictureElement) {
         await document.exitPictureInPicture();
      } else if (document.pictureInPictureEnabled && video.requestPictureInPicture) {
         await video.requestPictureInPicture();
      }
   };

   const changeSpeed = (): void => {
      const video = videoRef.current;
      if (!video) return;

      const speeds: number[] = [1, 1.25, 1.5, 2];
      const index = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
      const newSpeed = speeds[index];
      video.playbackRate = newSpeed;
      setPlaybackSpeed(newSpeed);
   };


   return (
      <div className="custom-player">
         <video
            ref={videoRef}
            src="./assets/demo-video.mp4"
            poster="./assets/demo-screenshot.png"
            muted
            onTimeUpdate={handleProgress}
            preload="metadata"
         />
         <div className="controls">
            <button onClick={togglePlay}>
               {isPlaying ? <Pause fill='#fff' size={17} /> : <PlayIcon fill='#fff' size={17} />}
            </button>
            <input
               type="range"
               min="0"
               max="100"
               value={progress}
               onChange={handleSeek}
            />
            <button onClick={toggleFullscreen}><Maximize size={17} /></button>
            <button onClick={togglePiP}><PictureInPicture2 size={17} /></button>
            <button onClick={changeSpeed}>{playbackSpeed} <X size={14} /></button>
         </div>
      </div>
   )
}
