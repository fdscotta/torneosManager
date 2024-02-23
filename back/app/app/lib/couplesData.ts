import { sql } from '@vercel/postgres';
import {
  Couple
} from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchTournamentCouples(id: string) {
  noStore();
  try {
    const data = await sql<Couple>`
      SELECT a.*
        FROM tournament_couples as a
        INNER JOIN tournaments as b ON a.tournament_id = b.id::text
      WHERE
        b.id::text= ${id}
    `;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch tournament couples.');
  }
}