import { sql } from '@vercel/postgres';
import {
  Couple, GroupResult
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

export async function fetchFilteredResultsLikeCouple(
  query: string
) {
  noStore();
  try {
    const data = await sql<GroupResult>`
      SELECT DISTINCT a.id, a.group_id, c.couple_name as couple1_id, d.couple_name as couple2_id, a.winner,
        a.set_1_c1, a.set_2_c1, a.set_3_c1, a.set_1_c2,
        a.set_2_c2, a.set_3_c2, a.match_date
        FROM group_results as a
        INNER JOIN tournament_couples as b ON a.couple1_id = b.id::text OR a.couple2_id = b.id::text
        LEFT JOIN couple_names_view as c ON a.couple1_id = c.id::text
        LEFT JOIN couple_names_view as d ON a.couple2_id = d.id::text
    `;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch group results.');
  }
}

export async function fetchFilteredResultsById(
  resultID: string
) {
  noStore();
  try {
    const data = await sql<GroupResult>`
      SELECT *
        FROM group_results
      WHERE
        id::text = ${resultID};
    `;
    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch tournament couples.');
  }
}