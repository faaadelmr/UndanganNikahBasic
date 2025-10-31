"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { FloralDivider } from "../floral-divider";

export function Gallery() {
  const galleryImages = PlaceHolderImages.filter(img => img.id.startsWith('couple-'));

  return (
    <section id="gallery" className="w-full py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-headline mb-4">Our Moments</h2>
        <p className="max-w-2xl mx-auto text-muted-foreground mb-12">
          A glimpse into our journey together.
        </p>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {galleryImages.map((image) => (
              <CarouselItem key={image.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <div className="aspect-[3/4] relative overflow-hidden rounded-lg shadow-lg">
                    <Image
                      src={image.imageUrl}
                      alt={image.description}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      data-ai-hint={image.imageHint}
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
      <FloralDivider className="mt-16 md:mt-24"/>
    </section>
  );
}
