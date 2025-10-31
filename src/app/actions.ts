"use server";

import { z } from "zod";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getFirestore } from "firebase-admin/firestore";
import { adminApp } from "@/firebase/server";

const rsvpSchema = z.object({
  name: z.string().min(2, "Nama terlalu pendek"),
  attending: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Silakan pilih kehadiran Anda." }),
  }),
  message: z.string().optional(),
});

export async function submitRsvp(prevState: any, formData: FormData) {
  const validatedFields = rsvpSchema.safeParse({
    name: formData.get("name"),
    attending: formData.get("attending"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Harap perbaiki kesalahan di bawah ini.",
    };
  }
  
  try {
    const db = getFirestore(adminApp);
    await addDoc(collection(db, "rsvps"), {
      ...validatedFields.data,
      createdAt: serverTimestamp(),
    });
    return { message: "Terima kasih atas konfirmasi Anda!", errors: null };
  } catch (error) {
    console.error("Error writing to Firestore: ", error);
    return {
      message: "Terjadi kesalahan saat mengirimkan RSVP Anda. Silakan coba lagi.",
      errors: null,
    };
  }
}
