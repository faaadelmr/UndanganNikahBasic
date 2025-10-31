"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useRef } from "react";
import { submitRsvp } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";
import { FloralDivider } from "../floral-divider";

const initialState = {
  message: "",
  errors: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full" size="lg">
      {pending ? "Sending..." : "Send RSVP"}
      <Send className="ml-2 h-4 w-4" />
    </Button>
  );
}

export function Rsvp() {
  const [state, formAction] = useFormState(submitRsvp, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message && !state.errors) {
      toast({
        title: "RSVP Submitted!",
        description: state.message,
      });
      formRef.current?.reset();
    } else if (state.message && state.errors) {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast]);

  return (
    <section id="rsvp" className="w-full py-16 md:py-24">
       <FloralDivider className="mb-16 md:mb-24"/>
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl md:text-5xl">RSVP</CardTitle>
            <CardDescription>Konfirmasi kehadiran Anda dan tinggalkan pesan.</CardDescription>
          </CardHeader>
          <CardContent>
            <form ref={formRef} action={formAction} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Anda</Label>
                <Input id="name" name="name" placeholder="John Doe" required />
                {state.errors?.name && <p className="text-sm text-destructive">{state.errors.name[0]}</p>}
              </div>
              
              <div className="space-y-2">
                <Label>Apakah Anda akan hadir?</Label>
                <RadioGroup name="attending" defaultValue="yes" className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="yes" />
                    <Label htmlFor="yes">Ya, saya akan datang!</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="no" />
                    <Label htmlFor="no">Maaf, tidak bisa datang</Label>
                  </div>
                </RadioGroup>
                 {state.errors?.attending && <p className="text-sm text-destructive">{state.errors.attending[0]}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Pesan & Doa</Label>
                <Textarea id="message" name="message" placeholder="Tuliskan pesan dan doa Anda di sini..." />
                {state.errors?.message && <p className="text-sm text-destructive">{state.errors.message[0]}</p>}
              </div>

              <SubmitButton />
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
