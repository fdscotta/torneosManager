"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { updateImageCloud } from "./cloudinary";
const { qualificationRound } = require("../configurationData.js");

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const FormSchema = z.object({
  id: z.string(),
  image: z
    .any()
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Esto no es una foto"
    ),
  name: z.string().min(1, {
    message: "Por favor complete el Nombre del Torneo.",
  }),
  date: z.coerce.date({
    errorMap: () => ({
      message: "Fecha incorrecta",
    }),
  }),
  t_type: z.string(),
  param_couple_per_group: z.string(),
  param_q_per_group: z.string(),
});

const CreateTournament = FormSchema.omit({
  id: true,
  image: true,
});
const UpdateTournament = FormSchema.omit({ id: true, image: true });

// This is temporary
export type State = {
  errors?: {
    name?: string[];
    image?: string[];
    date?: string[];
    type?: string[];
    param_q_per_group?: string[];
    param_couple_per_group?: string[];
  };
  message?: string | null;
};

export async function createTournament(prevState: State, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateTournament.safeParse({
    name: formData.get("name"),
    image: formData.get("image"),
    date: formData.get("date"),
    param_q_per_group: formData.get("param_q_per_group"),
    param_couple_per_group: formData.get("param_couple_per_group"),
    t_type: formData.get("t_type"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Complete los datos",
    };
  }

  const file = formData.get("image") as File;
  let imagePosted = "";

  if (file.size > 0) {
    imagePosted = await updateImageCloud(file);
  }

  const { name, date, param_q_per_group, param_couple_per_group, t_type } =
    validatedFields.data;

  const formatDate = date.toISOString();

  try {
    const result = await sql`
      INSERT INTO tournaments (
        name,
        status,
        type,
        date,
        image,
        param_q_per_group,
        param_couple_per_group
      )
      VALUES (
        ${name},
        0,
        ${t_type},
        ${formatDate},
        ${imagePosted},
        ${param_q_per_group},
        ${param_couple_per_group}
      )
    `;

    tournamentID = result.rows[0].id;
  } catch (error) {
    return {
      message: error + "Database Error: Error al crear torneo.",
    };
  }

  revalidatePath("/dashboard/tournaments");
  redirect("/dashboard/tournaments");
}

export async function updateTournament(
  id: string,
  prevState: State,
  formData: FormData
) {
  const file = formData.get("image") as File;
  let imagePosted = formData.get("currentImage");

  if (file.size > 0) {
    imagePosted = await updateImageCloud(file);
  }

  const validatedFields = UpdateTournament.safeParse({
    name: formData.get("name"),
    image: formData.get("image"),
    date: formData.get("date"),
    param_q_per_group: formData.get("param_q_per_group"),
    param_couple_per_group: formData.get("param_couple_per_group"),
    t_type: formData.get("t_type"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  console.log(validatedFields);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Algunos datos no son correctos",
    };
  }

  const { name, date, param_q_per_group, param_couple_per_group, t_type } =
    validatedFields.data;

  const formatDate = date.toISOString();

  try {
    await sql`
      UPDATE tournaments SET
      name = ${name},
      image = ${imagePosted?.toString()},
      date = ${formatDate},
      param_q_per_group = ${param_q_per_group},
      param_couple_per_group = ${param_couple_per_group},
      type = ${t_type}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: JSON.stringify(error) };
  }

  revalidatePath("/dashboard/tournaments");
  redirect("/dashboard/tournaments");
}

export async function deleteTournament(id: string) {
  // throw new Error('Failed to Delete Tournament');

  try {
    await sql`DELETE FROM tournaments WHERE id = ${id}`;
    revalidatePath("/dashboard/tournaments");
    return { message: "Borrar Torneo" };
  } catch (error) {
    return { message: "Database Error: Failed to Delete Tournament." };
  }
}

export async function closeTournament(id: string) {
  // throw new Error('Failed to Delete Tournament');

  try {
    await sql`UPDATE tournaments SET
      status  = 1
      WHERE id = ${id}`;
    revalidatePath("/dashboard/tournaments");
    return { message: "Torneo Cerrado" };
  } catch (error) {
    return { message: "Database Error: Failed to Update Tournament." };
  }
}

//  declareRounds(qualificationRound, tournamentID);

export async function declareRounds(dataRef: any, tournamentID: string) {
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
  dataRef.forEach(
    (item: {
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
      insertRound(row, tournamentID);
    }
  );
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
    console.log(result);
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: error + "Database Error: Error al crear round.",
    };
  }
}
