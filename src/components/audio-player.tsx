"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Play, Pause } from "lucide-react";

export function AudioPlayer() {
  // Ganti URL ini dengan URL file musik Anda
  const localSongUrl = "/bermuara.ogg";
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      
      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);

      // Set initial state
      if (!audio.paused) {
        setIsPlaying(true);
      }
      
      return () => {
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
      }
    }
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  return (
    <>
      <audio id="background-audio" ref={audioRef} src={localSongUrl} loop />
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          size="icon"
          className="rounded-full w-12 h-12"
          onClick={togglePlayPause}
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </Button>
      </div>
    </>
  );
}
