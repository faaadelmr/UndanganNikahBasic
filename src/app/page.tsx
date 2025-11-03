import { EventDetails } from "@/components/sections/event-details";
import { GuestBook } from "@/components/sections/guest-book";
import { Hero } from "@/components/sections/hero";
import { Location } from "@/components/sections/location";
import { Rsvp } from "@/components/sections/rsvp";
import { Gift } from "@/components/sections/gift";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center">
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
  );
}
