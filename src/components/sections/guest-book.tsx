"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FloralDivider } from "../floral-divider";
import { Badge } from "@/components/ui/badge";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface RsvpEntry {
  id: string;
  name: string;
  message?: string;
  attending: "yes" | "no";
  createdAt: string;
}

export function GuestBook({ rsvps, isLoading }: { rsvps: RsvpEntry[], isLoading: boolean }) {
  const [currentPage, setCurrentPage] = useState(1);
  const { ref, isVisible } = useScrollAnimation();

  const rsvpsPerPage = 5;

  // Pagination logic
  const indexOfLastRsvp = currentPage * rsvpsPerPage;
  const indexOfFirstRsvp = indexOfLastRsvp - rsvpsPerPage;
  const currentRsvps = rsvps.slice(indexOfFirstRsvp, indexOfLastRsvp);
  const totalPages = Math.ceil(rsvps.length / rsvpsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <section 
      id="guestbook" 
      ref={ref}
      className={cn(
        "w-full min-h-screen flex flex-col justify-center bg-secondary/50 opacity-0 transition-opacity duration-1000 py-20 md:py-0",
        isVisible && "animate-fade-in-up opacity-100"
      )}
    >
      <FloralDivider className="mb-auto"/>
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
                ) : currentRsvps.length > 0 ? (
                  currentRsvps.map((rsvp) => (
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
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-4">
                <Button onClick={handlePrevPage} disabled={currentPage === 1}>
                  Sebelumnya
                </Button>
                <span className="text-sm text-muted-foreground">
                  Halaman {currentPage} dari {totalPages}
                </span>
                <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
                  Berikutnya
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
