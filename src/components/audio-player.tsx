"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Play, Pause } from "lucide-react";

export function AudioPlayer() {
  // Ganti URL ini dengan URL file musik Anda
  const localSongUrl = "/bermuara.ogg";
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Efek untuk mencoba memulai musik secara otomatis
  useEffect(() => {
    const playPromise = audioRef.current?.play();
    if (playPromise !== undefined) {
      playPromise.then(_ => {
        // Autoplay berhasil
        setIsPlaying(true);
      }).catch(error => {
        // Autoplay gagal, user harus berinteraksi dulu
        console.log("Autoplay was prevented:", error);
        setIsPlaying(false);
      });
    }
  }, []);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <audio ref={audioRef} src={localSongUrl} loop />
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
