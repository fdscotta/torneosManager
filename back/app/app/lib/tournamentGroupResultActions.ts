'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// This is temporary
export type State = {
  errors?: {
    name?: string[];
    image?: string[];
    date?: string[];
  };
  message?: string | null;
};

export async function createGroupResult(
  tournamentID: string,
  group_id: string,
  prevState: State,
  formData: FormData
) {

  const couple1_id = formData.get('couple1_id')?.toString();
  const couple2_id = formData.get('couple2_id')?.toString();
  const winner = formData.get('winner') == null ? '' : formData.get('winner')?.toString();
  const set_1_c1 = formData.get('set_1_c1')?.toString();
  const set_2_c1 = formData.get('set_2_c1')?.toString();
  const set_3_c1 = formData.get('set_3_c1')?.toString();
  const set_1_c2 = formData.get('set_1_c2')?.toString();
  const set_2_c2 = formData.get('set_2_c2')?.toString();
  const set_3_c2 = formData.get('set_3_c2')?.toString();
  const match_date = formData.get('match_date') == '' ? null : formData.get('match_date')?.toString();

  // Insert data into the database
  try {
    const result = await sql`
      INSERT INTO group_results (
        group_id,
        couple1_id,
        couple2_id,
        winner,
        set_1_c1,
        set_2_c1,
        set_3_c1,
        set_1_c2,
        set_2_c2,
        set_3_c2,
        match_date
      )
      VALUES (
        ${group_id},
        ${couple1_id},
        ${couple2_id},
        ${winner},
        ${set_1_c1},
        ${set_2_c1},
        ${set_3_c1},
        ${set_1_c2},
        ${set_2_c2},
        ${set_3_c2},
        ${match_date}
      )
    `;

  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: error + 'Database Error: Error al crear pareja.',
    };
  }

  // Revalidate the cache for the vinyls page and redirect the user.
  revalidatePath(`/dashboard/tournaments/${tournamentID}/group-results`);
  redirect(`/dashboard/tournaments/${tournamentID}/group-results`);
}

export async function updateGroupResult(
  resultID: string,
  tournamentID: string,
  prevState: State,
  formData: FormData,
) {

  const couple1_id = formData.get('couple1_id')?.toString();
  const couple2_id = formData.get('couple2_id')?.toString();
  const winner = formData.get('winner')?.toString() == null ? '' : formData.get('winner')?.toString();
  const set_1_c1 = formData.get('set_1_c1')?.toString();
  const set_2_c1 = formData.get('set_2_c1')?.toString();
  const set_3_c1 = formData.get('set_3_c1')?.toString();
  const set_1_c2 = formData.get('set_1_c2')?.toString();
  const set_2_c2 = formData.get('set_2_c2')?.toString();
  const set_3_c2 = formData.get('set_3_c2')?.toString();
  const match_date = formData.get('match_date')?.toString() == '' ? null : formData.get('match_date')?.toString();

  try {
    await sql`
      UPDATE group_results SET
        couple1_id = ${couple1_id}
        couple2_id = ${couple2_id}
        winner = ${winner}
        set_1_c1 = ${set_1_c1}
        set_2_c1 = ${set_2_c1}
        set_3_c1 = ${set_3_c1}
        set_1_c2 = ${set_1_c2}
        set_2_c2 = ${set_2_c2}
        set_3_c2 = ${set_3_c2}
      WHERE id = ${resultID}
    `;
  } catch (error) {
    return { message: JSON.stringify(error) };
  }

  revalidatePath(`/dashboard/tournaments/${tournamentID}/group-results`);
  redirect(`/dashboard/tournaments/${tournamentID}/group-results`);
}

export async function deleteGroupResult(id: string) {
  try {
    await sql`DELETE FROM group_results WHERE id = ${id}`;
    revalidatePath(`/dashboard/tournaments/${id}/couples`);
    return { message: 'Borrar Resultado' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Couple.' };
  }
}