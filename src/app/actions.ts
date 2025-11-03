"use server";

import { z } from "zod";
import fs from "fs/promises";
import path from "path";

// Tentukan path ke file JSON
const rsvpFilePath = path.join(process.cwd(), 'data', 'rsvps.json');

// Fungsi untuk memastikan file dan direktori ada
async function ensureRsvpFile() {
  try {
    await fs.access(rsvpFilePath);
  } catch {
    await fs.mkdir(path.dirname(rsvpFilePath), { recursive: true });
    await fs.writeFile(rsvpFilePath, JSON.stringify([]));
  }
}

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
    await ensureRsvpFile();
    const fileContent = await fs.readFile(rsvpFilePath, 'utf8');
    const rsvps = JSON.parse(fileContent);

    const newRsvp = {
      ...validatedFields.data,
      createdAt: new Date().toISOString(),
    };
    
    rsvps.unshift(newRsvp); // Menambahkan ke awal array

    await fs.writeFile(rsvpFilePath, JSON.stringify(rsvps, null, 2));
    
    return { message: "Terima kasih atas pesan dan doa Anda!", errors: null };
  } catch (error: any) {
    console.error("Error writing to JSON file: ", error);
    return {
      message: "Terjadi kesalahan saat mengirimkan pesan Anda. Silakan coba lagi.",
      errors: null,
    };
  }
}

// Fungsi untuk mendapatkan data RSVP
export async function getRsvps() {
  try {
    await ensureRsvpFile();
    const fileContent = await fs.readFile(rsvpFilePath, 'utf8');
    const rsvps = JSON.parse(fileContent);
    return rsvps;
  } catch (error) {
    console.error("Error reading from JSON file: ", error);
    return [];
  }
}
