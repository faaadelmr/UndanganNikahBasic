"use client";

import { useEffect, useState } from "react";
import { getRsvps } from "@/app/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FloralDivider } from "../floral-divider";
import { Badge } from "@/components/ui/badge";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

interface RsvpEntry {
  id: string;
  name: string;
  message?: string;
  attending: "yes" | "no";
  createdAt: string;
}

export function GuestBook() {
  const [rsvps, setRsvps] = useState<RsvpEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { ref, isVisible } = useScrollAnimation();

  useEffect(() => {
    async function fetchRsvps() {
      try {
        setIsLoading(true);
        const entries = await getRsvps();
        const processedEntries = entries.map((doc: any, index: number) => ({ id: `${index}-${doc.createdAt}`, ...doc }));
        setRsvps(processedEntries);
      } catch (error) {
        console.error("Failed to fetch RSVPs:", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchRsvps();
  }, []);

  return (
    <section 
      id="guestbook" 
      ref={ref}
      className={cn(
        "w-full py-16 md:py-24 bg-secondary/50 opacity-0 transition-opacity duration-1000",
        isVisible && "animate-fade-in-up opacity-100"
      )}
    >
      <FloralDivider className="mb-16 md:mb-24"/>
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-headline mb-4">Buku Tamu</h2>
        <p className="max-w-2xl mx-auto text-muted-foreground mb-12">
          Pesan dan doa dari sahabat dan keluarga.
        </p>
        <Card className="max-w-3xl mx-auto shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Ucapan & Doa</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-96 w-full">
              <div className="space-y-6 p-4">
                {isLoading ? (
                   <p className="text-muted-foreground">Memuat pesan...</p>
                ) : rsvps.length > 0 ? (
                  rsvps.map((rsvp) => (
                    <div key={rsvp.id} className="flex items-start gap-4 text-left">
                      <Avatar>
                        <AvatarFallback>
                          {rsvp.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                           <p className="font-semibold">{rsvp.name}</p>
                           <Badge variant={rsvp.attending === 'yes' ? 'secondary' : 'outline'}>
                             {rsvp.attending === 'yes' ? 'Hadir' : 'Tidak Hadir'}
                           </Badge>
                        </div>
                        {rsvp.message && (
                           <p className="text-sm text-muted-foreground break-words mt-1">
                             {rsvp.message}
                           </p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">
                    Belum ada ucapan. Jadilah yang pertama!
                  </p>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
