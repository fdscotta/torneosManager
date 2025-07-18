"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { updateImageCloud } from "./cloudinary";
import { auth, getUser } from "@/auth";
import { roleImageMap } from "./utils";

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
  };
  message?: string | null;
};

export async function createTournament(prevState: State, formData: FormData) {
  const session = await auth();
  const sessionEmail = session?.user?.email || "";
  const user = await getUser(sessionEmail);

  // Validate form fields using Zod
  const validatedFields = CreateTournament.safeParse({
    name: formData.get("name"),
    image: formData.get("image"),
    date: formData.get("date"),
    param_q_per_group: formData.get("param_q_per_group"),
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

  imagePosted = user?.role ? roleImageMap[user.role] ?? "" : "";

  const { name, date, param_q_per_group, t_type } = validatedFields.data;

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
        tournament_type
      )
      VALUES (
        ${name},
        0,
        ${t_type},
        ${formatDate},
        ${imagePosted},
        ${param_q_per_group},
        ${user?.role}
      )
    `;
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
    t_type: formData.get("t_type"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Algunos datos no son correctos",
    };
  }

  const { name, date, param_q_per_group, t_type } = validatedFields.data;

  const formatDate = date.toISOString();

  try {
    await sql`
      UPDATE tournaments SET
      name = ${name},
      image = ${imagePosted?.toString()},
      date = ${formatDate},
      param_q_per_group = ${param_q_per_group},
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

export async function setDrawsTournament(id: string) {
  // throw new Error('Failed to Delete Tournament');
  try {
    await sql`UPDATE tournaments
      SET param_draw_set = TRUE
      WHERE id::text =  ${id}`;
    return { message: "Draw Set" };
  } catch (error) {
    return { message: "Database Error: Failed to Update Tournament." };
  }
}
