import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Heart } from "lucide-react";
import { FloralDivider } from "../floral-divider";

const events = [
  {
    icon: Heart,
    title: "Akad Nikah",
    date: "Saturday, August 24, 2024",
    time: "09:00 AM - 11:00 AM",
    location: "Grand Ballroom, The Plaza Hotel",
    address: "123 Blossom Avenue, Garden City",
  },
  {
    icon: Heart,
    title: "Resepsi",
    date: "Saturday, August 24, 2024",
    time: "07:00 PM - 10:00 PM",
    location: "Grand Ballroom, The Plaza Hotel",
    address: "123 Blossom Avenue, Garden City",
  },
];

export function EventDetails() {
  return (
    <section id="events" className="w-full py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-headline mb-4">The Wedding</h2>
        <p className="max-w-2xl mx-auto text-muted-foreground mb-12">
          We joyfully invite you to celebrate our union. Your presence is the greatest gift of all.
        </p>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {events.map((event) => (
            <Card key={event.title} className="text-left shadow-lg transform hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-3xl">
                  <event.icon className="w-8 h-8 text-primary" />
                  {event.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">{event.location}</p>
                    <p className="text-sm text-muted-foreground">{event.address}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <FloralDivider className="mt-16 md:mt-24" />
    </section>
  );
}
