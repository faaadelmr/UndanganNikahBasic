import { EventDetails } from "@/components/sections/event-details";
import { Gallery } from "@/components/sections/gallery";
import { Hero } from "@/components/sections/hero";
import { Location } from "@/components/sections/location";
import { Rsvp } from "@/components/sections/rsvp";
import { SongSuggestions } from "@/components/sections/song-suggestions";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center">
      <Hero />
      <EventDetails />
      <Location />
      <Gallery />
      <Rsvp />
      <SongSuggestions />
      <footer className="w-full py-8 text-center text-muted-foreground">
        <p>Hormat kami, Lidia & Abil</p>
      </footer>
    </main>
  );
}
