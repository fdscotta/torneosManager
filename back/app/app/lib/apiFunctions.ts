import { sql } from "@vercel/postgres";
import {
  CouplesSelect,
  GroupResultsTable,
  GroupsSelect,
  Tournaments,
} from "./definitions";
import { unstable_noStore as noStore } from "next/cache";

export async function getCouplesByGroups(
  tournamentID: string,
  group_id: string
) {
  noStore();
  if (group_id == "8" || group_id == "4" || group_id == "2") {
    try {
      const couples =
        await sql<CouplesSelect>`SELECT a.id as id, CONCAT(a.player1, '/', a.player2) as couple, b.group_id as group_id
      FROM tournament_couples as a
      INNER JOIN group_results as b ON a.id::text = b.couple1_id OR a.id::text = b.couple2_id
      WHERE a.tournament_id = ${tournamentID}
      AND b.group_id = ${group_id}
      ORDER BY b.rel_to`;

      return couples.rows;
    } catch (error) {
      return { message: "Database Error: Failed to get couples." };
    }
  } else {
    try {
      const couples =
        await sql<CouplesSelect>`SELECT a.id as id, CONCAT(a.player1, '/', a.player2) as couple, b.group_id as group_id
      FROM tournament_couples as a
      INNER JOIN group_couples as b ON a.id::text = b.couple_id
      WHERE a.tournament_id = ${tournamentID}
      AND b.group_id = ${group_id}`;

      return couples.rows;
    } catch (error) {
      return { message: "Database Error: Failed to get couples." };
    }
  }
}

export async function getCouplesBy8vos(tournamentID: string) {
  noStore();
  try {
    const couples = await sql<CouplesSelect>`
    WITH RankedResults AS (
        SELECT *,
              ROW_NUMBER() OVER (PARTITION BY group_id ORDER BY group_id ASC, sets_total DESC, total_games DESC, games_positive DESC) AS row_num
        FROM tournament_results_view
    )
    SELECT couple_id as id, CONCAT(group_id,'-',row_num,' ',couple_names) as couple, group_id
    FROM RankedResults
    WHERE row_num <= 4
    AND tournament_id = ${tournamentID}
    AND group_id NOT IN ('8','4','2','1')
    ORDER BY
        group_id ASC,
        sets_total DESC,
        total_games DESC,
        games_positive DESC`;

    return couples.rows;
  } catch (error) {
    return { message: "Database Error: Failed to get couples." };
  }
}

export async function getCouplesBy4tos(tournamentID: string, group_id: string) {
  noStore();
  try {
    const couples =
      await sql<CouplesSelect>`SELECT a.id as id, CONCAT(a.player1, '/', a.player2) as couple, b.group_id as group_id
    FROM tournament_couples as a
    INNER JOIN group_couples as b ON a.id::text = b.couple_id
    WHERE a.tournament_id = ${tournamentID}
    AND b.group_id = ${group_id}`;

    return couples.rows;
  } catch (error) {
    return { message: "Database Error: Failed to get couples." };
  }
}

export async function getCouplesBySemis(
  tournamentID: string,
  group_id: string
) {
  noStore();
  try {
    const couples =
      await sql<CouplesSelect>`SELECT a.id as id, CONCAT(a.player1, '/', a.player2) as couple, b.group_id as group_id
    FROM tournament_couples as a
    INNER JOIN group_couples as b ON a.id::text = b.couple_id
    WHERE a.tournament_id = ${tournamentID}
    AND b.group_id = ${group_id}`;

    return couples.rows;
  } catch (error) {
    return { message: "Database Error: Failed to get couples." };
  }
}

export async function getCouplesByFinal(
  tournamentID: string,
  group_id: string
) {
  noStore();
  try {
    const couples =
      await sql<CouplesSelect>`SELECT a.id as id, CONCAT(a.player1, '/', a.player2) as couple, b.group_id as group_id
    FROM tournament_couples as a
    INNER JOIN group_couples as b ON a.id::text = b.couple_id
    WHERE a.tournament_id = ${tournamentID}
    AND b.group_id = ${group_id}`;

    return couples.rows;
  } catch (error) {
    return { message: "Database Error: Failed to get couples." };
  }
}

export async function getGroupsByTournament(tournamentID: string) {
  noStore();
  try {
    const couples =
      await sql<GroupsSelect>`SELECT DISTINCT a.group_id FROM group_couples as a
    INNER JOIN tournament_couples as b ON b.id::text = a.couple_id
    WHERE b.tournament_id = ${tournamentID}`;

    return couples.rows;
  } catch (error) {
    return { message: "Database Error: Failed to get groups." };
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
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch tournament group results.");
  }
}

export async function getTournament(tournament_id: string) {
  noStore();
  try {
    const data = await sql<Tournaments>`
      SELECT *
        FROM tournaments
        WHERE
        id = ${tournament_id};
    `;
    return data.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch tournament group results.");
  }
}

export async function getTournamentAmountCouples(tournament_id: string) {
  noStore();
  try {
    const data = await sql`
      SELECT a.group_id as count FROM group_couples as a
      INNER JOIN tournament_couples as b ON b.id::text = a.couple_id
      WHERE tournament_id = ${tournament_id}
      GROUP BY a.group_id
      ORDER BY a.group_id ASC;
    `;
    return data.rowCount;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch getTournamentAmountCouples.");
  }
}
