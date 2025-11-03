"use server";

import { z } from "zod";
import { getSheetsData, appendSheetData } from '../lib/google-sheets';

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const RANGE_NAME = 'Sheet1!A:D'; // Assuming columns are: Name, Attending, Message, CreatedAt

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
    if (!SPREADSHEET_ID) {
      throw new Error("Spreadsheet ID is not defined");
    }

    const newRsvp = {
      ...validatedFields.data,
      createdAt: new Date().toISOString(),
    };

    const values = [[newRsvp.name, newRsvp.attending, newRsvp.message || '', newRsvp.createdAt]];
    
    await appendSheetData(SPREADSHEET_ID, RANGE_NAME, values);
    
    return { message: "Terima kasih atas pesan dan doa Anda!", errors: null };
  } catch (error: any) {
    console.error("Error details: ", error);
    return {
      message: "Terjadi kesalahan saat mengirimkan pesan Anda. Silakan coba lagi.",
      errors: null,
    };
  }
}

// Fungsi untuk mendapatkan data RSVP
export async function getRsvps() {
  try {
    if (!SPREADSHEET_ID) {
      throw new Error("Spreadsheet ID is not defined");
    }
    const data = await getSheetsData(SPREADSHEET_ID, RANGE_NAME);
    if (!data) {
      return [];
    }
    // Assuming the first row is the header
    const rsvps = data.slice(1).map(row => ({
      name: row[0],
      attending: row[1],
      message: row[2],
      createdAt: row[3],
    }));
    return rsvps;
  } catch (error) {
    console.error("Error details: ", error);
    return [];
  }
}
