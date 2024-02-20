import { sql } from '@vercel/postgres';
import {
  Tournaments,
  User,
} from './definitions';
import { unstable_noStore as noStore } from 'next/cache';


export async function fetchActiveTournaments(tID : string) {
  noStore();
  try {
    const data = await sql<Tournaments>`
      SELECT *
      FROM tournaments
      WHERE status = 1
      LIMIT 5`;

    const activeTournaments = data.rows;
    return activeTournaments;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the active tournaments.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredTournaments(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const tournaments = await sql<Tournaments>`
      SELECT *
      FROM tournaments
      WHERE
        name::text ILIKE ${`%${query}%`}
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return tournaments.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch tournaments.');
  }
}

export async function fetchTournamentsPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM tournaments`;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of tournaments.');
  }
}

export async function fetchTournamentById(id: string) {
  noStore();
  try {
    const data = await sql<Tournaments>`
      SELECT *
      FROM tournaments
      WHERE id = ${id};
    `;

    const tournament = data.rows;

    return tournament[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch tournament.');
  }
}

export async function getUser(email: string) {
  try {
    const user = await sql`SELECT * from USERS where email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}