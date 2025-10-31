import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function Hero() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-bg');

  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center text-center text-primary-foreground overflow-hidden">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 p-4 flex flex-col items-center animate-fade-in-up">
        <p className="text-lg md:text-xl tracking-widest uppercase font-light">
          We are getting married
        </p>
        <h1 className="font-headline text-6xl md:text-8xl lg:text-9xl my-4">
          Olivia & Liam
        </h1>
        <p className="text-lg md:text-xl font-light">
          August 24, 2024
        </p>
      </div>
    </section>
  );
}
