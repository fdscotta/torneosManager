'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createGroupResult(
  tournamentID: string,
  group_id: string,
  prevState: State,
  formData: FormData
) {

  const couple1_id = formData.get('couple1_id');
  const couple2_id = formData.get('couple2_id');
  const winner = formData.get('winner');
  const set_1_c1 = formData.get('set_1_c1');
  const set_2_c1 = formData.get('set_2_c1');
  const set_3_c1 = formData.get('set_3_c1');
  const set_1_c2 = formData.get('set_1_c2');
  const set_2_c2 = formData.get('set_2_c2');
  const set_3_c2 = formData.get('set_3_c2');
  const match_date = formData.get('match_date');

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

  const couple1_id = formData.get('couple1_id');
  const couple2_id = formData.get('couple2_id');
  const winner = formData.get('winner');
  const set_1_c1 = formData.get('set_1_c1');
  const set_2_c1 = formData.get('set_2_c1');
  const set_3_c1 = formData.get('set_3_c1');
  const set_1_c2 = formData.get('set_1_c2');
  const set_2_c2 = formData.get('set_2_c2');
  const set_3_c2 = formData.get('set_3_c2');
  const match_date = formData.get('match_date');

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