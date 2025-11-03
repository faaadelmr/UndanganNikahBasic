"use client";

import { memo } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Navigation } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const LocationComponent = () => {
  const { ref, isVisible } = useScrollAnimation();
  const address = "Kp. Cihideung Kecil RT.01 RW.04 Desa Neglasari Kecamatan Dramaga Kabupaten Bogor";
  const googleMapsUrl = "https://maps.app.goo.gl/qtkZQ1su1w1vkkAH8";
  const googleMapsEmbedUrl = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6328.595952289873!2d106.71927139446966!3d-6.546404391152571!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c4d2d128eb5d%3A0xb712295850afcbd1!2sJl.%20Cihideung%20Kecil%2C%20Neglasari%2C%20Kec.%20Dramaga%2C%20Kabupaten%20Bogor%2C%20Jawa%20Barat%2016680!5e0!3m2!1sen!2sid!4v1761919087804!5m2!1sen!2sid";

  return (
    <section 
      id="location" 
      ref={ref}
      className={cn(
        "w-full min-h-screen flex flex-col justify-center opacity-0 transition-opacity duration-1000 py-20 md:py-0",
        isVisible && "animate-fade-in-up opacity-100"
      )}
    >
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-headline mb-4">Lokasi Acara</h2>
        <p className="max-w-2xl mx-auto text-muted-foreground mb-12">
          Akad nikah dan resepsi akan diadakan di lokasi yang sama.
        </p>
        <Card className="max-w-4xl mx-auto overflow-hidden shadow-xl">
          <CardContent className="p-0">
            <div className="w-full h-64 md:h-96 bg-secondary flex items-center justify-center">
             <iframe 
                src={googleMapsEmbedUrl}
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
                    <p className="text-muted-foreground">{address}</p>
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
};

export const Location = memo(LocationComponent);
