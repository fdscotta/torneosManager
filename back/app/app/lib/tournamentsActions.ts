'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { updateImageCloud } from './cloudinary';

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const FormSchema = z.object({
  id: z.string(),
  image: z.any()
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Esto no es una foto"
    ),
  name: z.string().min(1,{
    message: 'Por favor complete el Nombre del Torneo.',
  }),
  date: z.coerce.date(
    {
      errorMap: () => ({
        message: "Fecha incorrecta",
      }),
    },
  ),
});

const CreateTournament = FormSchema.omit({ id: true });
const UpdateTournament = FormSchema.omit({ id: true, image: true });

// This is temporary
export type State = {
  errors?: {
    name?: string[];
    image?: string[];
    date?: string[];
  };
  message?: string | null;
};

export async function createTournament(prevState: State, formData: FormData) {

  // Validate form fields using Zod
  const validatedFields = CreateTournament.safeParse({
    name: formData.get('name'),
    image: formData.get('image'),
    date: formData.get('date'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Complete los datos",
    };
  }

  const file = formData.get('image') as File;
  let imagePosted = '';
/*   if (file.size === 0) {
    return {
      errors: {
        image: ['Por favor suba una imagen para el torneo.'],
      },
      message: "Complete los datos",
    };
  } */

  if (file.size > 0) {
    imagePosted = await updateImageCloud(file);
  }

  // Prepare data for insertion into the database
  const {
    name,
    date
  } = validatedFields.data;

  const formatDate = date.toISOString();

  // Insert data into the database
  try {
    await sql`
      INSERT INTO tournaments (
        name,
        status,
        type,
        date,
        image
      )
      VALUES (
        ${name},
        0,
        'torneo',
        ${formatDate},
        ${imagePosted}
      )
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: error + 'Database Error: Error al crear torneo.',
    };
  }

  // Revalidate the cache for the Tournaments page and redirect the user.
  revalidatePath('/dashboard/tournaments');
  redirect('/dashboard/tournaments');
}

export async function updateTournament(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const file = formData.get('image') as File;
  let imagePosted = formData.get('currentImage');

  if (file.size > 0) {
    imagePosted = await updateImageCloud(file);
  }

  const validatedFields = UpdateTournament.safeParse({
    name: formData.get('name'),
    date: formData.get('date')
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Algunos datos no son correctos',
    };
  }

  const {
    name,
    date
  } = validatedFields.data;

  const formatDate = date.toISOString();

  try {
    await sql`
      UPDATE tournaments SET
      name = ${name},
      image = ${imagePosted?.toString()},
      date = ${formatDate}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: JSON.stringify(error) };
  }

  revalidatePath('/dashboard/tournaments');
  redirect('/dashboard/tournaments');
}

export async function deleteTournament(id: string) {
  // throw new Error('Failed to Delete Tournament');

  try {
    await sql`DELETE FROM tournaments WHERE id = ${id}`;
    revalidatePath('/dashboard/tournaments');
    return { message: 'Borrar Torneo' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Tournament.' };
  }
}

export async function closeTournament(id: string) {
  // throw new Error('Failed to Delete Tournament');

  try {
    await sql`UPDATE tournaments SET
      status  = 1
      WHERE id = ${id}`;
    revalidatePath('/dashboard/tournaments');
    return { message: 'Torneo Cerrado' };
  } catch (error) {
    return { message: 'Database Error: Failed to Update Tournament.' };
  }
}