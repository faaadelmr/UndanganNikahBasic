import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Navigation } from "lucide-react";

export function Location() {
  const address = "Dusun Krajan RT. 006 RW. 002, Desa Neglasari, Kec. Dramaga, Kab. Bogor";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <section id="location" className="w-full py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-headline mb-4">Lokasi Acara</h2>
        <p className="max-w-2xl mx-auto text-muted-foreground mb-12">
          Akad nikah dan resepsi akan diadakan di lokasi yang sama.
        </p>
        <Card className="max-w-4xl mx-auto overflow-hidden shadow-xl">
          <CardContent className="p-0">
            <div className="w-full h-64 md:h-96 bg-secondary flex items-center justify-center">
             <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.815915421531!2d106.7210183147708!3d-6.545163995267134!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c3a444ffffff%3A0x675e2b4a5fa5c2c3!2sDusun%20Krajan%2C%20Neglasari%2C%20Dramaga%2C%20Bogor%2C%20West%20Java%2016680!5e0!3m2!1sen!2sid!4v1678886400000!5m2!1sen!2sid"
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen={true}
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-start gap-3 text-left">
                  <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold">Kediaman Mempelai Wanita</h3>
                    <p className="text-muted-foreground">Dusun Krajan RT. 006 RW. 002, Desa Neglasari, Kec. Dramaga, Kab. Bogor</p>
                  </div>
                </div>
                <Button asChild size="lg" className="mt-4 md:mt-0 w-full md:w-auto">
                  <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                    <Navigation className="mr-2 h-5 w-5" />
                    Lihat Peta
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
