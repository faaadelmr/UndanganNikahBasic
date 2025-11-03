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

  const handleOpenInvitation = () => {
    setIsInvitationOpen(true);
  };

  return (
    <>
      {!isInvitationOpen && <Opening guest="Tamu Undangan" onOpen={handleOpenInvitation} />}
      {isInvitationOpen && (
        <main className="flex flex-col items-center justify-center animate-fade-in-up">
          <Hero />
          <EventDetails />
          <Location />
          <Rsvp />
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
