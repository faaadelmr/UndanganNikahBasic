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
        <div className="mb-8">
          <p className="text-lg md:text-xl tracking-widest uppercase font-light">
            Lidia Dwi Putri
          </p>
          <p className="text-sm md:text-base text-primary-foreground/80">Putri ke-2 dari Bpk. Aris & Ibu Siti Khodijah</p>
        </div>
        <h1 className="font-headline text-6xl md:text-8xl lg:text-9xl my-4">
          &
        </h1>
        <div className="mt-8">
          <p className="text-lg md:text-xl tracking-widest uppercase font-light">
            Yusril Parhabil Lufi (Abil)
          </p>
          <p className="text-sm md:text-base text-primary-foreground/80">Putra Ke-2 dari Bpk. Edith Widaswara & Ibu Yuliyanti</p>
        </div>
        <p className="text-lg md:text-xl font-light mt-12">
          16 November 2025
        </p>
      </div>
    </section>
  );
}
