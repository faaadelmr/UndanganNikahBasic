import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Heart } from "lucide-react";
import { FloralDivider } from "../floral-divider";

const events = [
  {
    icon: Heart,
    title: "Akad Nikah",
    date: "Minggu, 16 November 2025",
    time: "08:00 WIB - selesai",
    location: "Kediaman Mempelai Wanita",
    address: "Kp. Cihideung Kecil RT.01 RW.04 Desa Neglasari Kecamatan Dramaga Kabupaten Bogor",
  },
  {
    icon: Heart,
    title: "Resepsi",
    date: "Minggu, 16 November 2025",
    time: "19:00 WIB - selesai",
    location: "Kediaman Mempelai Wanita",
    address: "Kp. Cihideung Kecil RT.01 RW.04 Desa Neglasari Kecamatan Dramaga Kabupaten Bogor",
  },
];

export function EventDetails() {
  return (
    <section id="events" className="w-full py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-headline mb-4">Acara Pernikahan</h2>
        <p className="max-w-3xl mx-auto text-muted-foreground mb-12 px-4">
          Bismillahirrahmanirrahim. Assalamu’alaikum Wr. Wb. Dengan memohon Rahmat dan Ridho Allah SWT, kami bermaksud menyelenggarakan acara pernikahan putra-putri kami.
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
         <p className="max-w-3xl mx-auto text-muted-foreground mt-12 px-4">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kedua mempelai. Atas kehadiran dan doa restunya kami ucapkan terima kasih. Wassalamu’alaikum Wr. Wb.
        </p>
      </div>
      <FloralDivider className="mt-16 md:mt-24" />
    </section>
  );
}
