'use client';

import { Tournaments } from '@/app/lib/definitions';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateTournament } from '@/app/lib/tournamentsActions';
import { useFormState } from 'react-dom';
import Image from 'next/image';
import { formatDateToYYYYMMDD } from '@/app/lib/utils';
import { useState } from 'react';

export default function EditTournamentForm({
  tournament,
}: {
  tournament: Tournaments;
}) {
  const initialState = { message: null, errors: {} };
  const [t_type, setTtype] = useState(tournament.type || '');

  const updateTournamentWithId = updateTournament.bind(null, tournament.id);
  const [state, dispatch] = useFormState(updateTournamentWithId, initialState);

  const handleTtypeChange = (value: string) => {
    setTtype(value);
  };

  return (
    <form action={dispatch}>
      <div className="rounded-md dark:bg-slate-800 p-4 md:p-6">
        <div className="mb-4 text-white">
          <div className="relative mt-2 rounded-md">
            <legend className="mb-2 block text-sm font-medium">Imagen</legend>
            <div className="relative">
              {tournament.image && (
                <div className="flex h-48 w-full flex-row dark:bg-slate-800 p-4 items-center">
                  <Image
                    src={tournament.image}
                    width={150}
                    height={150}
                    alt={tournament.name}
                  />
                </div>
              )}
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
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
            <legend className="mb-2 block text-sm font-medium">Nombre</legend>
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Nombre del Torneo"
                defaultValue={tournament.name}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-slate-800"
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
            <legend className="mb-2 block text-sm font-medium">Fecha</legend>
            <div className="relative">
              <input
                id="date"
                name="date"
                type="date"
                placeholder="Fecha de inicio del Torneo"
                defaultValue={formatDateToYYYYMMDD(tournament.date)}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-slate-800"
                aria-describedby="date-error"
              />
            </div>
            <div className="relative mt-2 rounded-md">
              <legend className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Tipo
              </legend>
              <ul className="grid w-full gap-3 md:grid-cols-2">
                <li>
                  <input
                    type="radio"
                    id="torneo"
                    name="t_type"
                    value="torneo"
                    className="hidden peer"
                    checked={t_type === 'torneo'}
                    onChange={() => handleTtypeChange('torneo')}
                  />
                  <label
                    htmlFor="torneo"
                    className="inline-flex items-center justify-between w-full p-2.5  text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <div className="block">
                      <div className="w-full text-sm font-semibold">Torneo</div>
                    </div>
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="liga"
                    name="t_type"
                    value="liga"
                    className="hidden peer"
                    checked={t_type === 'liga'}
                    onChange={() => handleTtypeChange('liga')}
                  />
                  <label
                    htmlFor="liga"
                    className="inline-flex items-center justify-between w-full p-2.5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <div className="block">
                      <div className="w-full text-sm font-semibold">Liga</div>
                    </div>
                  </label>
                </li>
              </ul>
            </div>
            <div className="relative mt-2 rounded-md">
              <legend className="mb-2 block text-sm font-medium">
                Clasificados por Grupo
              </legend>
              <div className="relative">
                <input
                  id="param_q_per_group"
                  name="param_q_per_group"
                  type="number"
                  defaultValue={tournament.param_q_per_group}
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-slate-800"
                  aria-describedby="param_q_per_group-error"
                />
              </div>
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
        <Button type="submit">Editar</Button>
      </div>
    </form>
  );
}
