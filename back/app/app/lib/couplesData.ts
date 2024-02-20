import { sql } from '@vercel/postgres';
import {
  Tournaments,
  User,
} from './definitions';
import { unstable_noStore as noStore } from 'next/cache';


const ITEMS_PER_PAGE = 6;
export async function fetchFilteredTournamentsCouples(
  query: string,
  currentPage: number,
  tournamentID: string,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const tournaments = await sql<Tournaments>`
      SELECT *
        FROM couples as a
        INNER JOIN tournaments as b ON a.tournament_id = b.id
      WHERE
        a.name::text ILIKE ${`%${query}%`}
        AND b.id = ${tournamentID}
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return tournaments.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch tournaments.');
  }
}

export async function fetchTournamentsCouplesPages(
    query: string,
    tournamentID: string,
) {
  noStore();
  try {
    const count = await sql`
      SELECT COUNT(*)
        FROM couples as a
        INNER JOIN tournaments as b ON a.tournament_id = b.id
      WHERE
        a.name::text ILIKE ${`%${query}%`}
        AND b.id = ${tournamentID}
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of tournaments.');
  }
}

export async function fetchTournamentCoupleById(id: string) {
  noStore();
  try {
    const data = await sql<Tournaments>`
      SELECT *
        FROM couples as a
        INNER JOIN tournaments as b ON a.tournament_id = b.id
      WHERE
        b.id = ${id}
    `;

    const tournament = data.rows;

    return tournament[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch tournament.');
  }
}