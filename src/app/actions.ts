"use server";

import { z } from "zod";

const rsvpSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  attending: z.enum(["yes", "no"]),
  guests: z.string().optional(),
});

const songSchema = z.object({
  suggesterName: z.string().min(2, "Name is too short"),
  song: z.string().min(3, "Song title is too short"),
});

export async function submitRsvp(prevState: any, formData: FormData) {
  const validatedFields = rsvpSchema.safeParse({
    name: formData.get("name"),
    attending: formData.get("attending"),
    guests: formData.get("guests"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please correct the errors below.",
    };
  }
  
  // Here you would typically save the data to a database.
  // For this example, we'll just log it.
  console.log("New RSVP:", validatedFields.data);

  return { message: "Thank you for your RSVP!", errors: null };
}

export async function suggestSong(prevState: any, formData: FormData) {
  const validatedFields = songSchema.safeParse({
    suggesterName: formData.get("suggesterName"),
    song: formData.get("song"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please correct the errors below.",
    };
  }

  // Here you would typically save the data to a database.
  // For this example, we'll just log it.
  console.log("New Song Suggestion:", validatedFields.data);
  
  return { message: "Thank you for the song suggestion!", errors: null };
}
