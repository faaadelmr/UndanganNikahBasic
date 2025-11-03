'use client';

import { useState } from 'react';
import { EventDetails } from "@/components/sections/event-details";
import { GuestBook } from "@/components/sections/guest-book";
import { Hero } from "@/components/sections/hero";
import { Location } from "@/components/sections/location";
import { Rsvp } from "@/components/sections/rsvp";
import { Gift } from "@/components/sections/gift";
import { Opening } from "@/components/sections/opening";

export default function Home() {
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);
  const guestName = "Tamu Undangan";

  const handleOpenInvitation = () => {
    setIsInvitationOpen(true);
     // Trigger audio play
    const audio = document.getElementById('background-audio') as HTMLAudioElement;
    if (audio) {
      audio.play().catch(error => {
        console.error("Audio play failed:", error);
      });
    }
  };

  return (
    <>
      {!isInvitationOpen && <Opening guest={guestName} onOpen={handleOpenInvitation} />}
      {isInvitationOpen && (
        <main className="flex flex-col items-center justify-center animate-fade-in-up">
          <Hero />
          <EventDetails />
          <Location />
          <Rsvp guestName={guestName} />
          <GuestBook />
          <Gift />
          <footer className="w-full py-8 text-center text-muted-foreground">
            <p>Hormat kami, Lidia & Abil</p>
          </footer>
        </main>
      )}
    </>
  );
}
