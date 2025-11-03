"use server";

import { z } from "zod";

// Data akan disimpan di memori server, akan hilang saat server restart.
const rsvps: any[] = [];

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
    const newRsvp = {
      ...validatedFields.data,
      createdAt: new Date(),
    };
    rsvps.unshift(newRsvp); // Menambahkan ke awal array
    
    // Untuk simulasi, kita bisa mengembalikan data yang ada
    // console.log("Current RSVPs:", rsvps);
    
    return { message: "Terima kasih atas pesan dan doa Anda!", errors: null };
  } catch (error: any) {
    console.error("Error writing to local storage: ", error);
    return {
      message: "Terjadi kesalahan saat mengirimkan pesan Anda. Silakan coba lagi.",
      errors: null,
    };
  }
}

// Fungsi baru untuk mendapatkan data RSVP
export async function getRsvps() {
  // Mengembalikan salinan array agar tidak termutasi dari luar
  return JSON.parse(JSON.stringify(rsvps));
}
