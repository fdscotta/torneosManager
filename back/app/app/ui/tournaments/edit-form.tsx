'use client';

import { Tournaments } from '@/app/lib/definitions';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateTournament } from '@/app/lib/tournamentsActions';
import { useFormState } from 'react-dom';
import Image from 'next/image';

export default function EditTournamentForm({
  tournament,
}: {
  tournament: Tournaments;
}) {
  const initialState = { message: null, errors: {} };

  const updateTournamentWithId = updateTournament.bind(null, tournament.id);
  const [state, dispatch] = useFormState(updateTournamentWithId, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <div className="relative mt-2 rounded-md">
            <legend className="mb-2 block text-sm font-medium">
              Imagen
            </legend>
            <div className="relative">
              {tournament.image &&
                <div className="flex h-48 w-full flex-row bg-white p-4 items-center">
                  <Image
                    src={tournament.image}
                    width={150}
                    height={150}
                    alt={tournament.name}
                  />
                </div>
              }
              <input
                id="image"
                name="image"
                type="file"
                placeholder="Cargar Flyer"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="image-error"
              />
              <input
                id="currentImage"
                name="currentImage"
                type="hidden"
                value={tournament.image}
              />
            </div>
            <div id="status-error" aria-live="polite" aria-atomic="true">
              {state.errors?.image &&
                state.errors.image.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div className="relative mt-2 rounded-md">
            <legend className="mb-2 block text-sm font-medium">
              Nombre
            </legend>
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Nombre del Torneo"
                defaultValue={tournament.name}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="name-error"
              />
            </div>
            <div id="status-error" aria-live="polite" aria-atomic="true">
              {state.errors?.name &&
                state.errors.name.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div className="relative mt-2 rounded-md">
            <legend className="mb-2 block text-sm font-medium">
              Fecha
            </legend>
            <div className="relative">
              <input
                id="date"
                name="date"
                type="date"
                placeholder="Fecha de inicio del Torneo"
                defaultValue={tournament.date.toString().substring(0,10)}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="date-error"
              />
            </div>
            <div id="status-error" aria-live="polite" aria-atomic="true">
              {state.errors?.date &&
                state.errors.date.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {state.message ? (
          <div aria-live="polite" className="my-2 text-sm text-red-500">
            <p>{state.message}</p>
          </div>
        ) : null}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/tournaments"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Editar Torneo</Button>
      </div>
    </form>
  );
}
