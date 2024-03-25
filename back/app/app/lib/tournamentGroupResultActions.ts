"use server";

import { QueryResult, sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
const {
  qualificationRoundLeague,
  qualificationRoundTournament678,
  qualificationRoundTournament91011,
  qualificationRoundTournament121314,
  qualificationRoundTournament141516,
  qualificationRoundTournament171819,
  qualificationRoundTournament202122,
  qualificationRoundTournament232426,
} = require("../configurationData.js");
import {
  getGroupsByTournament,
  getResultsByGroups,
  getTournamentAmountCouples,
  getTournamentById,
} from "./apiFunctions";
import {
  GroupResult,
  GroupResultsTable,
  GroupsSelect,
  Tournaments,
} from "./definitions";
import { setDrawsTournament } from "./tournamentsActions";

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
  const couple1_id = formData.get("couple1_id")?.toString();
  const couple2_id = formData.get("couple2_id")?.toString();
  const set_1_c1 = formData.get("set_1_c1")?.toString();
  const set_2_c1 = formData.get("set_2_c1")?.toString();
  const set_3_c1 = formData.get("set_3_c1")?.toString();
  const set_1_c2 = formData.get("set_1_c2")?.toString();
  const set_2_c2 = formData.get("set_2_c2")?.toString();
  const set_3_c2 = formData.get("set_3_c2")?.toString();
  const match_date =
    formData.get("match_date") == ""
      ? null
      : formData.get("match_date")?.toString();
  let winner = "";

  if (
    Number(set_1_c1) + Number(set_2_c1) + Number(set_3_c1) >
    Number(set_1_c2) + Number(set_2_c2) + Number(set_3_c2)
  ) {
    winner = "couple_1";
  } else {
    winner = "couple_2";
  }

  if (
    Number(set_1_c1) +
      Number(set_2_c1) +
      Number(set_3_c1) +
      Number(set_1_c2) +
      Number(set_2_c2) +
      Number(set_3_c2) ==
      0 ||
    Number(set_1_c1) +
      Number(set_2_c1) +
      Number(set_3_c1) +
      Number(set_1_c2) +
      Number(set_2_c2) +
      Number(set_3_c2) <
      12
  ) {
    winner = "";
  }

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
        match_date,
        tournament_id
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
        ${match_date},
        ${tournamentID}
      )
    `;
    declareRounds(tournamentID);
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: error + "Database Error: Error al crear pareja.",
    };
  }

  revalidatePath(`/dashboard/tournaments/${tournamentID}/group-results`);
  redirect(`/dashboard/tournaments/${tournamentID}/group-results`);
}

export async function updateGroupResult(
  resultID: string,
  tournamentID: string,
  prevState: State,
  formData: FormData
) {
  const couple1_id = formData.get("couple1_id")?.toString();
  const couple2_id = formData.get("couple2_id")?.toString();
  let winner = "";
  const set_1_c1 = formData.get("set_1_c1")?.toString() || "";
  const set_2_c1 = formData.get("set_2_c1")?.toString() || "";
  const set_3_c1 = formData.get("set_3_c1")?.toString() || "";
  const set_1_c2 = formData.get("set_1_c2")?.toString() || "";
  const set_2_c2 = formData.get("set_2_c2")?.toString() || "";
  const set_3_c2 = formData.get("set_3_c2")?.toString() || "";
  const group_id = formData.get("group_id")?.toString() || "";

  if (
    Number(set_1_c1) + Number(set_2_c1) + Number(set_3_c1) >
    Number(set_1_c2) + Number(set_2_c2) + Number(set_3_c2)
  ) {
    winner = "couple_1";
  } else {
    winner = "couple_2";
  }
  if (
    Number(set_1_c1) +
      Number(set_2_c1) +
      Number(set_3_c1) +
      Number(set_1_c2) +
      Number(set_2_c2) +
      Number(set_3_c2) ==
      0 ||
    Number(set_1_c1) +
      Number(set_2_c1) +
      Number(set_3_c1) +
      Number(set_1_c2) +
      Number(set_2_c2) +
      Number(set_3_c2) <
      12
  ) {
    winner = "";
  }

  const match_date =
    formData.get("match_date")?.toString() == ""
      ? null
      : formData.get("match_date")?.toString();

  try {
    await sql`
      UPDATE group_results SET
        couple1_id = ${couple1_id},
        couple2_id = ${couple2_id},
        winner = ${winner},
        set_1_c1 = ${set_1_c1},
        set_2_c1 = ${set_2_c1},
        set_3_c1 = ${set_3_c1},
        set_1_c2 = ${set_1_c2},
        set_2_c2 = ${set_2_c2},
        set_3_c2 = ${set_3_c2},
        match_date = ${match_date},
        group_id = ${group_id},
        tournament_id = ${tournamentID}
      WHERE id = ${resultID}
    `;
  } catch (error) {
    return { message: JSON.stringify(error) };
  }
  declareRounds(tournamentID);

  revalidatePath(`/dashboard/tournaments/${tournamentID}/group-results`);
  redirect(`/dashboard/tournaments/${tournamentID}/group-results`);
}

export async function deleteGroupResult(id: string) {
  try {
    await sql`DELETE FROM group_results WHERE id = ${id}`;
    revalidatePath(`/dashboard/tournaments/${id}/couples`);
    return { message: "Borrar Resultado" };
  } catch (error) {
    return { message: "Database Error: Failed to Delete Couple." };
  }
}

//  declareRounds(qualificationRound, tournamentID);

export async function declareRounds(tournamentID: string) {
  let row = {
    group_id: "",
    couple1_id: "",
    couple2_id: "",
    set_1_c1: "",
    set_2_c1: "",
    set_3_c1: "",
    set_1_c2: "",
    set_2_c2: "",
    set_3_c2: "",
    match_date: "",
    rel_to: "",
    tournament_id: "",
  };

  const tournament: any = await getTournamentById(tournamentID);
  let dataRef = null;

  if (!tournament.param_draw_set) {
    if (
      tournament.type == "torneo" ||
      (tournament.type == "liga" && tournament.param_q_per_group == "2")
    ) {
      const gAmount: number = await getTournamentAmountCouples(tournamentID);
      switch (gAmount) {
        case 2:
          dataRef = qualificationRoundTournament678;
          break;
        case 3:
          dataRef = qualificationRoundTournament91011;
          break;
        case 4:
          dataRef = qualificationRoundTournament121314;
          break;
        case 5:
          dataRef = qualificationRoundTournament141516;
          break;
        case 6:
          dataRef = qualificationRoundTournament171819;
          break;
        case 7:
          dataRef = qualificationRoundTournament202122;
          break;
        case 8:
          dataRef = qualificationRoundTournament232426;
          break;
      }
    } else {
      dataRef = qualificationRoundLeague;
    }
    await Promise.all(
      dataRef.map(
        async (item: {
          round: string;
          rel_from_1: string;
          rel_from_2: string;
          rel_to: string;
        }) => {
          row.group_id = item.round;
          row.couple1_id = item.rel_from_1;
          row.couple2_id = item.rel_from_2;
          row.rel_to = item.rel_to;
          row.tournament_id = tournamentID;
          await insertRound(row, tournamentID);
        }
      )
    );
    await setDrawsTournament(tournamentID);
  } else {
    await updateQRounds(tournamentID);
  }
}

export async function insertRound(round: any, tournamentID: string) {
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
        match_date,
        rel_to,
        tournament_id,
        rel_from_1,
        rel_from_2
      )
      VALUES (
        ${round.group_id},
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        null,
        ${round.rel_to},
        ${round.tournament_id},
        ${round.couple1_id},
        ${round.couple2_id}
      )
      `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: error + "Database Error: Error al crear round.",
    };
  }
}

export async function updateQRounds(tournamentID: string) {
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

  totalResults.forEach(async (couple: GroupResultsTable, index: number) => {
    await updateDrawFromGroups(couple, index + 1, tournament);
  });
  await updateDraw("8", "4", tournament);
  await updateDraw("4", "2", tournament);
}

export async function updateDrawFromGroups(
  couple: GroupResultsTable,
  position: number,
  tournament: Tournaments
) {
  try {
    let drawRow: QueryResult<GroupResult>;
    let realPosition: string;
    if (tournament.param_q_per_group == "2") {
      realPosition = couple.group_id + couple.id;
    } else {
      realPosition = position.toString();
    }
    drawRow = await sql<GroupResult>`
        SELECT * FROM group_results
        WHERE rel_from_1 = ${realPosition} or rel_from_2  = ${realPosition}
        AND tournament_id = ${tournament.id}`;

    if (drawRow.rowCount == 1) {
      const couple1_id =
        drawRow.rows[0].rel_from_1 == realPosition ? couple.couple_id : "";
      const couple2_id =
        drawRow.rows[0].rel_from_2 == realPosition ? couple.couple_id : "";

      try {
        if (couple1_id == "") {
          await sql`
            UPDATE group_results SET
              couple2_id = ${couple2_id}
            WHERE id::text = ${drawRow.rows[0].id}
            AND tournament_id = ${couple.tournament_id}
          `;
        } else {
          await sql`
            UPDATE group_results SET
              couple1_id = ${couple1_id}
            WHERE id::text = ${drawRow.rows[0].id}
            AND tournament_id = ${couple.tournament_id}
          `;
        }
      } catch (error) {
        return { message: JSON.stringify(error) };
      }
    }
  } catch (error) {
    return { message: JSON.stringify(error) };
  }
}

export async function updateDraw(
  roundFrom: string,
  roundTo: string,
  tournament: Tournaments
) {
  try {
    const drawRow = await sql<GroupResult>`
      SELECT * FROM group_results
      WHERE group_id = ${roundFrom}
      AND (winner IS NOT NULL AND winner <> '')
      AND tournament_id = ${tournament.id}
    `;

    if (drawRow.rowCount == 0) {
      await sql`
        UPDATE group_results SET
          couple1_id = '',
          couple2_id = ''
        WHERE group_id = '2'
        AND tournament_id = ${tournament.id}
      `;
      return true;
    }

    const drawToRow = await sql<GroupResult>`
      SELECT * FROM group_results
      WHERE group_id = ${roundTo}
      AND tournament_id = ${tournament.id}
    `;

    if (drawToRow.rowCount == 0) return true;

    drawRow.rows.map(async (item: GroupResult) => {
      let couple = "";
      let rowID = "";
      if (item.winner == "couple_1") {
        couple = item.couple1_id;
      } else {
        couple = item.couple2_id;
      }
      let foundRelTo = drawToRow.rows.filter(
        (i) => i.rel_from_1 === item.rel_to
      );
      if (foundRelTo.length > 0) {
        rowID = foundRelTo[0].id;
        try {
          await sql`
            UPDATE group_results SET
              couple1_id = ${couple}
            WHERE id::text = ${rowID}
            AND tournament_id = ${tournament.id}
          `;
        } catch (error) {
          return { message: JSON.stringify(error) };
        }
      } else {
        foundRelTo = drawToRow.rows.filter((i) => i.rel_from_2 === item.rel_to);
        rowID = foundRelTo[0].id;
        try {
          await sql`
            UPDATE group_results SET
              couple2_id = ${couple}
            WHERE id::text = ${rowID}
            AND tournament_id = ${tournament.id}
          `;
        } catch (error) {
          return { message: JSON.stringify(error) };
        }
      }
    });
  } catch (error) {
    return { message: JSON.stringify(error) };
  }
}
