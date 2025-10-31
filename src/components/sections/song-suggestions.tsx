"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useRef } from "react";
import { suggestSong } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Music } from "lucide-react";
import { FloralDivider } from "../floral-divider";

const initialState = {
  message: "",
  errors: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full" size="lg">
      {pending ? "Submitting..." : "Suggest a Song"}
      <Music className="ml-2 h-4 w-4" />
    </Button>
  );
}

export function SongSuggestions() {
  const [state, formAction] = useFormState(suggestSong, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);


  useEffect(() => {
    if (state.message && !state.errors) {
      toast({
        title: "Suggestion Sent!",
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
    <section id="music" className="w-full py-16 md:py-24 bg-secondary/50">
      <FloralDivider className="mb-16 md:mb-24"/>
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl md:text-5xl">Song Suggestions</CardTitle>
            <CardDescription>Got a song that will get you on the dance floor? Let us know!</CardDescription>
          </CardHeader>
          <CardContent>
            <form ref={formRef} action={formAction} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="suggesterName">Your Name</Label>
                <Input id="suggesterName" name="suggesterName" placeholder="Your Name" required />
                {state.errors?.suggesterName && <p className="text-sm text-destructive">{state.errors.suggesterName[0]}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="song">Song Title & Artist</Label>
                <Input id="song" name="song" placeholder="e.g., 'Perfect' by Ed Sheeran" required />
                {state.errors?.song && <p className="text-sm text-destructive">{state.errors.song[0]}</p>}
              </div>

              <SubmitButton />
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
