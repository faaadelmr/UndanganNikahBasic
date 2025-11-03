'use client';

import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Mail, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function Opening({ guest, onOpen }: { guest: string; onOpen: () => void; }) {
  const [isFading, setIsFading] = useState(false);
  const [isRendered, setIsRendered] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-bg');

  const handleOpen = () => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    // Simulate loading time, then fade out
    setTimeout(() => {
      setIsLoading(false);
      setIsFading(true);
      // Call the onOpen callback passed from the parent page
      if (onOpen) {
        onOpen();
      }
    }, 100); // Reduced delay to make it feel very fast
  };
  
  useEffect(() => {
    if (isFading) {
      // Unmount component after fade-out transition
      const fadeOutTimer = setTimeout(() => {
        setIsRendered(false);
      }, 1000); // This duration should match the fade-out animation
      return () => clearTimeout(fadeOutTimer);
    }
  }, [isFading]);

  useEffect(() => {
    // Prevent body scrolling when the opening component is visible
    if (isRendered) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Cleanup function to restore scrolling
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isRendered]);

  if (!isRendered) {
    return null;
  }

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center text-center text-primary-foreground transition-opacity duration-1000',
        isFading ? 'opacity-0' : 'opacity-100'
      )}
    >
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
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 p-8 flex flex-col items-center animate-fade-in-up">
        <p className="font-body text-lg mb-4">Undangan Pernikahan</p>
        <h1 className="font-headline text-5xl md:text-6xl mb-8">
          Lidia & Abil
        </h1>

        <div className="bg-foreground/10 p-6 rounded-lg backdrop-blur-sm max-w-sm w-full">
            <p className="text-sm text-primary-foreground/80 mb-2">Kepada Yth.</p>
            <p className="text-xl font-semibold capitalize">{guest}</p>
        </div>

        <Button onClick={handleOpen} className="mt-12" size="lg" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Mail className="mr-2 h-4 w-4" />
          )}
          {isLoading ? 'Membuka...' : 'Buka Undangan'}
        </Button>
      </div>
    </div>
  );
}
