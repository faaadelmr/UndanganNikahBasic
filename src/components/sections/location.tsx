import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Navigation } from "lucide-react";

export function Location() {
  const address = "Grand Ballroom, The Plaza Hotel, 123 Blossom Avenue, Garden City";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <section id="location" className="w-full py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-headline mb-4">Location</h2>
        <p className="max-w-2xl mx-auto text-muted-foreground mb-12">
          The ceremony and reception will be held at the same beautiful venue.
        </p>
        <Card className="max-w-4xl mx-auto overflow-hidden shadow-xl">
          <CardContent className="p-0">
            <div className="w-full h-64 md:h-96 bg-secondary flex items-center justify-center">
              <p className="text-muted-foreground">Map will be displayed here</p>
            </div>
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-start gap-3 text-left">
                  <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold">The Plaza Hotel</h3>
                    <p className="text-muted-foreground">123 Blossom Avenue, Garden City</p>
                  </div>
                </div>
                <Button asChild size="lg" className="mt-4 md:mt-0 w-full md:w-auto">
                  <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                    <Navigation className="mr-2 h-5 w-5" />
                    Get Directions
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
