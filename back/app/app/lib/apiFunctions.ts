import { sql } from '@vercel/postgres';
import {
  CouplesSelect,
  GroupResult,
  GroupsSelect,
} from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

export async function getCouplesByGroup(
  tournamentID: string,
  group_id: string
  ) {
  noStore();
  try {
    const couples = await sql<CouplesSelect>`SELECT a.id as id, CONCAT(a.player1, '/', a.player2) as couple, b.group_id as group_id
    FROM tournament_couples as a
    INNER JOIN group_couples as b ON a.id::text = b.couple_id
    WHERE a.tournament_id = ${tournamentID}
    AND b.group_id = ${group_id}`;

    return couples.rows;
  } catch (error) {
    return { message: 'Database Error: Failed to get couples.' };
  }
}

export async function getGroupsByTournament(
  tournamentID: string
  ) {
  noStore();
  try {
    const couples = await sql<GroupsSelect>`SELECT DISTINCT a.group_id FROM group_couples as a
    INNER JOIN tournament_couples as b ON b.id::text = a.couple_id
    WHERE b.tournament_id = ${tournamentID}`;

    return couples.rows;
  } catch (error) {
    return { message: 'Database Error: Failed to get groups.' };
  }
}

export async function getResultsByGroups(
  tournament_id: string,
  group_id: string
) {
  noStore();
  try {
    const data = await sql<GroupResultsTable>`
      SELECT *
        FROM tournament_results_view
        WHERE
        tournament_id = ${tournament_id}
        AND group_id = ${group_id};
    `;
    console.log(data)
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch tournament group results.');
  }
}