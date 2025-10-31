"use client";

import { useEffect, useState } from "react";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "@/firebase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FloralDivider } from "../floral-divider";

interface RsvpEntry {
  id: string;
  name: string;
  message?: string;
  attending: "yes" | "no";
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
}

export function GuestBook() {
  const [rsvps, setRsvps] = useState<RsvpEntry[]>([]);

  useEffect(() => {
    if (!db) return;

    const q = query(
      collection(db, "rsvps"),
      orderBy("createdAt", "desc"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const entries: RsvpEntry[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        // Hanya tampilkan pesan dari tamu yang hadir
        if (data.attending === "yes" && data.message) {
          entries.push({ id: doc.id, ...data } as RsvpEntry);
        }
      });
      setRsvps(entries);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section id="guestbook" className="w-full py-16 md:py-24 bg-secondary/50">
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
                {rsvps.length > 0 ? (
                  rsvps.map((rsvp) => (
                    <div key={rsvp.id} className="flex items-start gap-4 text-left">
                      <Avatar>
                        <AvatarFallback>
                          {rsvp.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-semibold">{rsvp.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {rsvp.message}
                        </p>
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
