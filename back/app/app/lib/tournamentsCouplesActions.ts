'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  id: z.string(),
  player1: z.string().min(1,{
    message: 'Por favor complete el Nombre del Jugador 2.',
  }),
  player2: z.string().min(1,{
    message: 'Por favor complete el Nombre del Jugador 2.',
  }),
});

const CreateCouple = FormSchema.omit({ id: true });
const UpdateCouple = FormSchema.omit({ id: true });

// This is temporary
export type State = {
  errors?: {
    player1?: string[];
    player2?: string[];
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
    player1: formData.get('player1'),
    player2: formData.get('player2'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Complete los datos",
    };
  }

  // Prepare data for insertion into the database
  const {
    player1,
    player2
  } = validatedFields.data;

  // Insert data into the database
  try {
    await sql`
      INSERT INTO tournament_couples (
        player1,
        player2,
        tournament_id
      )
      VALUES (
        ${player1},
        ${player2},
        ${tournamentID}
      )
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: error + 'Database Error: Error al crear pareja.',
    };
  }
  // Revalidate the cache for the vinyls page and redirect the user.
  revalidatePath(`/dashboard/tournaments/${tournamentID}/couples`);
  redirect(`/dashboard/tournaments/${tournamentID}/couples`);
}

export async function updateCouple(
  coupleID: string,
  tournamentID: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateCouple.safeParse({
    player1: formData.get('player1'),
    player2: formData.get('player2')
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Algunos datos no son correctos',
    };
  }

  const {
    player1,
    player2
  } = validatedFields.data;

  try {
    await sql`
      UPDATE tournament_couples SET
      player1 = ${player1},
      player2 = ${player2}
      WHERE id = ${coupleID}
    `;
  } catch (error) {
    return { message: JSON.stringify(error) };
  }

  const group = formData.get('group')?.toString();

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
    revalidatePath(`/dashboard/tournaments/${id}/couples`);
    return { message: 'Borrar Pareja' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Couple.' };
  }
}