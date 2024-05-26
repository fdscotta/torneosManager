import { sql } from "@vercel/postgres";
import {
  CouplesSelect,
  GroupResultsTable,
  GroupsSelect,
  MatchesDetails,
  Tournaments,
} from "./definitions";
import { unstable_noStore as noStore } from "next/cache";

export async function getCouplesByGroups(
  tournamentID: string,
  group_id: string
) {
  noStore();
  if (
    group_id == "8" ||
    group_id == "4" ||
    group_id == "2" ||
    group_id == "1"
  ) {
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
    const couples = await sql`SELECT
        a.id,
        a.group_id,
        c.couple_name as couple1_id,
        d.couple_name as couple2_id,
        a.set_1_c1,
        a.set_1_c2,
        a.set_2_c1,
        a.set_2_c2,
        a.set_3_c1,
        a.set_3_c2,
        a.winner,
        a.rel_to,
        a.rel_from_1,
        a.rel_from_2,
        e.couple_pic as couple1_pic,
        f.couple_pic as couple2_pic,
        a.match_date
      FROM group_results as a
      LEFT JOIN couple_names_view as c ON a.couple1_id = c.id::text
      LEFT JOIN couple_names_view as d ON a.couple2_id = d.id::text
      LEFT JOIN tournament_couples e ON a.couple1_id = e.id::text
      LEFT JOIN tournament_couples f ON a.couple2_id = f.id::text
      WHERE a.tournament_id = ${tournamentID}
      AND a.group_id = '8'
      ORDER BY a.rel_to`;

    return couples.rows;
  } catch (error) {
    return { message: "Database Error: Failed to get couples." };
  }
}

export async function getCouplesBy4tos(tournamentID: string) {
  noStore();
  try {
    const couples = await sql`SELECT
      a.id,
      a.group_id,
      c.couple_name as couple1_id,
      d.couple_name as couple2_id,
      a.set_1_c1,
      a.set_1_c2,
      a.set_2_c1,
      a.set_2_c2,
      a.set_3_c1,
      a.set_3_c2,
      a.winner,
      a.rel_to,
      a.rel_from_1,
      a.rel_from_2,
      e.couple_pic as couple1_pic,
      f.couple_pic as couple2_pic,
      a.match_date
    FROM group_results as a
    LEFT JOIN couple_names_view as c ON a.couple1_id = c.id::text
    LEFT JOIN couple_names_view as d ON a.couple2_id = d.id::text
    LEFT JOIN tournament_couples e ON a.couple1_id = e.id::text
    LEFT JOIN tournament_couples f ON a.couple2_id = f.id::text
    WHERE a.tournament_id = ${tournamentID}
    AND a.group_id = '4'
    ORDER BY a.rel_to`;

    return couples.rows;
  } catch (error) {
    return { message: "Database Error: Failed to get couples." };
  }
}

export async function getCouplesBySemis(tournamentID: string) {
  noStore();
  try {
    const couples = await sql`SELECT
        a.id,
        a.group_id,
        c.couple_name as couple1_id,
        d.couple_name as couple2_id,
        a.set_1_c1,
        a.set_1_c2,
        a.set_2_c1,
        a.set_2_c2,
        a.set_3_c1,
        a.set_3_c2,
        a.winner,
        a.rel_to,
        a.rel_from_1,
        a.rel_from_2,
        e.couple_pic as couple1_pic,
        f.couple_pic as couple2_pic,
        a.match_date
      FROM group_results as a
      LEFT JOIN couple_names_view as c ON a.couple1_id = c.id::text
      LEFT JOIN couple_names_view as d ON a.couple2_id = d.id::text
      LEFT JOIN tournament_couples e ON a.couple1_id = e.id::text
      LEFT JOIN tournament_couples f ON a.couple2_id = f.id::text
      WHERE a.tournament_id = ${tournamentID}
      AND a.group_id = '2'
      ORDER BY a.rel_to`;
    return couples.rows;
  } catch (error) {
    return { message: "Database Error: Failed to get couples." };
  }
}

export async function getCouplesByFinal(tournamentID: string) {
  noStore();
  try {
    const couples = await sql`SELECT
        a.id,
        a.group_id,
        c.couple_name as couple1_id,
        d.couple_name as couple2_id,
        a.set_1_c1,
        a.set_1_c2,
        a.set_2_c1,
        a.set_2_c2,
        a.set_3_c1,
        a.set_3_c2,
        a.winner,
        a.rel_to,
        a.rel_from_1,
        a.rel_from_2,
        e.couple_pic as couple1_pic,
        f.couple_pic as couple2_pic,
        a.match_date
      FROM group_results as a
      LEFT JOIN couple_names_view as c ON a.couple1_id = c.id::text
      LEFT JOIN couple_names_view as d ON a.couple2_id = d.id::text
      LEFT JOIN tournament_couples e ON a.couple1_id = e.id::text
      LEFT JOIN tournament_couples f ON a.couple2_id = f.id::text
      WHERE a.tournament_id = ${tournamentID}
      AND a.group_id = '1'`;

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

export async function getMatchesByGroups(
  tournament_id: string,
  group_id: string
) {
  noStore();
  try {
    const data = await sql<MatchesDetails>`
      SELECT
        a.id,
        a.group_id,
        b.couple_name as couple1_name,
        c.couple_name as couple2_name,
        a.set_1_c1,
        a.set_2_c1,
        a.set_3_c1,
        a.set_1_c2,
        a.set_2_c2,
        a.set_3_c2,
        a.winner,
        a.rel_to,
        a.rel_from_1,
        a.rel_from_2,
        a.match_date
      FROM group_results as a
      LEFT JOIN couple_names_view as b ON a.couple1_id = b.id::text
      LEFT JOIN couple_names_view as c ON a.couple2_id = c.id::text
      WHERE
        tournament_id = ${tournament_id}
        AND group_id = ${group_id}
      ORDER BY a.match_date DESC
    `;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch tournament group results.");
  }
}

export async function getTournaments() {
  noStore();
  try {
    const data = await sql`
      SELECT *
        FROM tournaments
      ORDER BY date DESC;
    `;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch tournament.");
  }
}

export async function getTournamentById(tournamentID: string) {
  noStore();
  try {
    const tournament = await sql<Tournaments>`SELECT * FROM tournaments
    WHERE id::text = ${tournamentID}`;

    return tournament.rows[0];
  } catch (error) {
    return { message: "Database Error: Failed to get tournament." };
  }
}

export async function getTournamentAmountGroups(tournament_id: string) {
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
    throw new Error("Failed to fetch getTournamentAmountGroups.");
  }
}

export async function getCouplesGlobalQ(tournamentID: string) {
  const groups: any = await getGroupsByTournament(tournamentID);
  const tournament: any = await getTournamentById(tournamentID);

  let totalResults: GroupResultsTable[] = [];
  let qCouples: GroupResultsTable[] = [];

  await Promise.all(
    groups.map(async (item: GroupsSelect) => {
      const resultsByGroups = await getResultsByGroups(
        tournamentID,
        item.group_id
      );

      qCouples = resultsByGroups.slice(
        0,
        parseInt(tournament.param_q_per_group)
      );

      qCouples.forEach((couple: GroupResultsTable, index: number) => {
        couple.id = (index + 1).toString();
        totalResults.push(couple);
      });
    })
  );
  totalResults.sort((a, b) => {
    if (a.id < b.id) {
      return -1;
    }
    if (a.id > b.id) {
      return 1;
    }
    if (a.group_id < b.group_id) {
      return -1;
    }
    if (a.group_id > b.group_id) {
      return 1;
    }
    return 0;
  });

  return totalResults;
}
