"use server";

import { sql } from "@vercel/postgres";
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
  getTournament,
  getTournamentAmountCouples,
} from "./apiFunctions";
import { GroupResult, GroupResultsTable, GroupsSelect } from "./definitions";
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
  const winner =
    formData.get("winner") == null ? "" : formData.get("winner")?.toString();
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
  const winner =
    formData.get("winner")?.toString() == null
      ? ""
      : formData.get("winner")?.toString();
  const set_1_c1 = formData.get("set_1_c1")?.toString();
  const set_2_c1 = formData.get("set_2_c1")?.toString();
  const set_3_c1 = formData.get("set_3_c1")?.toString();
  const set_1_c2 = formData.get("set_1_c2")?.toString();
  const set_2_c2 = formData.get("set_2_c2")?.toString();
  const set_3_c2 = formData.get("set_3_c2")?.toString();
  const group_id = formData.get("group_id")?.toString();
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
        group_id = ${group_id}
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

  const tournament = await getTournament(tournamentID);
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
  const groups = await getGroupsByTournament(tournamentID);
  const qAmount = (await getTournament(tournamentID)).param_q_per_group;

  let totalResults: GroupResultsTable[] = [];
  let qCouples: GroupResultsTable[] = [];

  await Promise.all(
    groups.map(async (item: GroupsSelect) => {
      const resultsByGroups = await getResultsByGroups(
        tournamentID,
        item.group_id
      );

      qCouples = resultsByGroups.slice(0, parseInt(qAmount));

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
    await updateDraw8(couple, index + 1);
  });
}

export async function updateDraw8(couple: GroupResultsTable, position: number) {
  try {
    const drawRow = await sql<GroupResult>`
      SELECT * FROM group_results
      WHERE rel_from_1 = ${position.toString()} or rel_from_2  = ${position.toString()}
      AND tournament_id = ${couple.tournament_id};
    `;

    if (drawRow.rowCount == 1) {
      const couple1_id =
        drawRow.rows[0].rel_from_1 == position.toString()
          ? couple.couple_id
          : "";
      const couple2_id =
        drawRow.rows[0].rel_from_2 == position.toString()
          ? couple.couple_id
          : "";

      try {
        if (couple1_id == "") {
          await sql`
            UPDATE group_results SET
              couple2_id = ${couple2_id}
            WHERE id::text = ${drawRow.rows[0].id}
          `;
        } else {
          await sql`
            UPDATE group_results SET
              couple1_id = ${couple1_id}
            WHERE id::text = ${drawRow.rows[0].id}
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
