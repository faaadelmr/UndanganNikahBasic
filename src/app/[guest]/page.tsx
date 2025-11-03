'use client';
import { useState, useEffect, useCallback } from 'react';
import { EventDetails } from "@/components/sections/event-details";
import { GuestBook } from "@/components/sections/guest-book";
import { Hero } from "@/components/sections/hero";
import { Location } from "@/components/sections/location";
import { Rsvp } from "@/components/sections/rsvp";
import { Gift } from "@/components/sections/gift";
import { Opening } from "@/components/sections/opening";
import { getRsvps } from '@/app/actions';

interface RsvpEntry {
  id: string;
  name: string;
  message?: string;
  attending: "yes" | "no";
  createdAt: string;
}

export default function GuestPage({ params }: { params: { guest: string } }) {
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);
  const [rsvps, setRsvps] = useState<RsvpEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRsvps = useCallback(async () => {
    try {
      setIsLoading(true);
      const entries = await getRsvps();
      const processedEntries = entries
        .map((doc: any, index: number) => ({ id: `${index}-${doc.createdAt}`, ...doc }))
        .reverse();
      setRsvps(processedEntries);
    } catch (error) {
      console.error("Failed to fetch RSVPs:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isInvitationOpen) {
      fetchRsvps();
    }
  }, [isInvitationOpen, fetchRsvps]);
  
  const guestName = decodeURIComponent(params.guest || '').replace(/\+/g, ' ');

  const handleOpenInvitation = () => {
    setIsInvitationOpen(true);
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
          <Rsvp guestName={guestName} onRsvpSubmitted={fetchRsvps} />
          <GuestBook rsvps={rsvps} isLoading={isLoading} />
          <Gift />
          <footer className="w-full py-8 text-center text-muted-foreground">
            <p>Hormat kami, Lidia & Abil</p>
          </footer>
        </main>
      )}
    </>
  );
}
