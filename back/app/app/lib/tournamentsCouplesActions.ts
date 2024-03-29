"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { updateImageCloud } from "./cloudinary";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const FormSchema = z.object({
  id: z.string(),
  player1: z.string().min(1, {
    message: "Por favor complete el Nombre del Jugador 2.",
  }),
  player2: z.string().min(1, {
    message: "Por favor complete el Nombre del Jugador 2.",
  }),
  couple_pic: z
    .any()
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Esto no es una foto"
    ),
});

const CreateCouple = FormSchema.omit({ id: true, couple_pic: true });
const UpdateCouple = FormSchema.omit({ id: true, couple_pic: true });

// This is temporary
export type State = {
  errors?: {
    player1?: string[];
    player2?: string[];
    couple_pic?: string[];
  };
  message?: string | null;
};

export async function createCouple(
  tournamentID: string,
  prevState: State,
  formData: FormData
) {
  // Validate form fields using Zod
  const validatedFields = CreateCouple.safeParse({
    player1: formData.get("player1"),
    player2: formData.get("player2"),
    couple_pic: formData.get("couple_pic"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Complete los datos",
    };
  }

  const file = formData.get("couple_pic") as File;
  let imagePosted = "";

  if (file.size > 0) {
    imagePosted = await updateImageCloud(file);
  }

  // Prepare data for insertion into the database
  const { player1, player2 } = validatedFields.data;

  let couple_id = "";
  // Insert data into the database

  try {
    const result = await sql`
      INSERT INTO tournament_couples (
        player1,
        player2,
        tournament_id,
        couple_pic
      )
      VALUES (
        ${player1},
        ${player2},
        ${tournamentID},
        ${imagePosted}
      )
      RETURNING id
    `;

    couple_id = result.rows[0].id;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: error + "Database Error: Error al crear pareja.",
    };
  }

  const group = formData.get("group")?.toString();

  try {
    await sql`
      INSERT INTO group_couples (
        group_id,
        couple_id
        ) VALUES (
          ${group},
          ${couple_id}
        ) ON CONFLICT(couple_id)
      DO UPDATE SET
          group_id = EXCLUDED.group_id
      WHERE group_couples.couple_id = EXCLUDED.couple_id;
    `;
  } catch (error) {
    return { message: JSON.stringify(error) };
  }

  revalidatePath(`/dashboard/tournaments/${tournamentID}/couples`);
  redirect(`/dashboard/tournaments/${tournamentID}/couples`);
}

export async function updateCouple(
  coupleID: string,
  tournamentID: string,
  prevState: State,
  formData: FormData
) {
  const file = formData.get("couple_pic") as File;
  let imagePosted = formData.get("currentImage");

  if (file.size > 0) {
    imagePosted = await updateImageCloud(file);
  }

  const validatedFields = UpdateCouple.safeParse({
    player1: formData.get("player1"),
    player2: formData.get("player2"),
    couple_pic: formData.get("couple_pic"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Algunos datos no son correctos",
    };
  }

  const { player1, player2 } = validatedFields.data;

  try {
    await sql`
      UPDATE tournament_couples SET
      player1 = ${player1},
      player2 = ${player2},
      couple_pic = ${imagePosted?.toString()}
      WHERE id = ${coupleID}
    `;
  } catch (error) {
    return { message: JSON.stringify(error) };
  }

  const group = formData.get("group")?.toString();

  try {
    await sql`
      INSERT INTO group_couples (
        group_id,
        couple_id
        ) VALUES (
          ${group},
          ${coupleID}
        ) ON CONFLICT(couple_id)
      DO UPDATE SET
          group_id = EXCLUDED.group_id
      WHERE group_couples.couple_id = EXCLUDED.couple_id;
    `;
  } catch (error) {
    return { message: JSON.stringify(error) };
  }

  revalidatePath(`/dashboard/tournaments/${tournamentID}/couples`);
  redirect(`/dashboard/tournaments/${tournamentID}/couples`);
}

export async function deleteCouple(id: string) {
  try {
    await sql`DELETE FROM tournament_couples WHERE id = ${id}`;
    await sql`DELETE FROM group_couple WHERE couple=id = ${id}`;
    revalidatePath(`/dashboard/tournaments/${id}/couples`);
    return { message: "Borrar Pareja" };
  } catch (error) {
    return { message: "Database Error: Failed to Delete Couple." };
  }
}
