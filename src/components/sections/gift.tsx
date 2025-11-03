"use client";

import { memo } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Copy, Gift as GiftIcon } from "lucide-react";
import { FloralDivider } from "../floral-divider";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

interface GiftAccount {
  bank: string;
  name: string;
  number: string;
}

const accounts: GiftAccount[] = [
  {
    bank: "BNI",
    name: "Yusril Parhabil Lutfi",
    number: "0897951806",
  },
  {
    bank: "OVO",
    name: "Yusril Parhabil Lutfi",
    number: "081295673928",
  },
];

const GiftComponent = () => {
  const { toast } = useToast();
  const { ref, isVisible } = useScrollAnimation();

  const handleCopy = (text: string, bank: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Berhasil Disalin",
      description: `Nomor rekening ${bank} telah disalin ke clipboard.`,
    });
  };

  return (
    <section 
      id="gift" 
      ref={ref}
      className={cn(
        "w-full min-h-screen flex flex-col justify-center opacity-0 transition-opacity duration-1000 py-20 md:py-0",
        isVisible && "animate-fade-in-up opacity-100"
      )}
    >
      <FloralDivider className="mb-auto"/>
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-headline mb-4">Hadiah Pernikahan</h2>
        <p className="max-w-2xl mx-auto text-muted-foreground mb-12">
          Doa restu Anda adalah hadiah terindah bagi kami. Namun, jika Anda ingin memberikan tanda kasih, kami telah menyediakan beberapa opsi di bawah ini.
        </p>
        <Card className="max-w-2xl mx-auto shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-3 text-2xl">
              <GiftIcon className="w-6 h-6" />
              Kirim Hadiah
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {accounts.map((account) => (
              <div key={account.bank} className="rounded-lg border bg-card p-4 text-left">
                <p className="font-semibold text-lg">{account.bank}</p>
                <p className="text-muted-foreground">a.n. {account.name}</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-lg font-mono tracking-wider">{account.number}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(account.number, account.bank)}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Salin
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export const Gift = memo(GiftComponent);
