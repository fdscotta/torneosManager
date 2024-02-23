import { sql } from '@vercel/postgres';
import {
  Couple
} from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchFilteredCouples(
  tournamentID: string,
  query: string
) {
  noStore();
  try {
    const data = await sql<Couple>`
      SELECT a.*, c.group_id
        FROM tournament_couples as a
        INNER JOIN tournaments as b ON a.tournament_id = b.id::text
        LEFT JOIN group_couples c ON a.id::text = c.couple_id
      WHERE
        b.id::text= ${tournamentID}
        AND (a.player1::text ILIKE ${`%${query}%`} OR a.player2::text ILIKE ${`%${query}%`})
    `;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch tournament couples.');
  }
}

export async function fetchCoupleById(id: string) {
  noStore();
  try {
    const data = await sql<Couple>`
      SELECT *
      FROM tournament_couples
      WHERE id::text = ${id};
    `;

    const couple = data.rows;

    return couple[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch couple.');
  }
}

export async function fetchCoupleGroup(id: string) {
  noStore();
  try {
    const data = await sql`
      SELECT
        group_id
      FROM group_couples
      WHERE couple_id = ${id};
    `;

    const couple = data.rows;

    return couple[0]?.group_id;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch couple.');
  }
}