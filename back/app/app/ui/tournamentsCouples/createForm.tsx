'use client';

import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { createCouple } from '@/app/lib/tournamentsCouplesActions';
import { useFormState } from 'react-dom';

export default function CreateForm({
  tournamentID
}: {
  tournamentID: string;
}) {
  const initialState = { message: null, errors: {} };
  const creteCoupleAction = createCouple.bind(null, tournamentID);
  const [state, dispatch] = useFormState(creteCoupleAction, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md dark:bg-slate-800 p-4 md:p-6">
        <div className="mb-4">
          <div className="relative mt-2 rounded-md text-white">
            <legend className="mb-2 block text-sm font-medium">
              Jugador 1
            </legend>
            <div className="relative">
              <input
                id="player1"
                name="player1"
                type="text"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-slate-800"
              />
            </div>
            {state && state.errors?.player1 && (
              <div id="status-error" aria-live="polite" aria-atomic="true">
                {state.errors?.player1 &&
                  state.errors.player1.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            )}
            <legend className="mb-2 block text-sm font-medium">
              Jugador 1
            </legend>
            <div className="relative">
              <input
                id="player2"
                name="player2"
                type="text"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-slate-800"
              />
            </div>
            {state && state.errors?.player2 && (
              <div id="status-error" aria-live="polite" aria-atomic="true">
                {state.errors?.player2 &&
                  state.errors.player2.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            )}
            <legend className="mb-2 block text-sm font-medium">
              Grupo
            </legend>
            <div className="relative">
              <select
                id="group"
                name="group"
                placeholder={"Seleccione una Zona"}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-slate-800"
              >
                <option value="" disabled selected hidden>
                  Seleccione una Zona
                </option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">F</option>
                <option value="G">G</option>
                <option value="H">H</option>
              </select>
            </div>
            <legend className="mb-2 block text-sm font-medium">
              Foto
            </legend>
            <div className="relative">
              <input
                id="couple_pic"
                name="couple_pic"
                type="file"
                placeholder="Foto sin fondo"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="image-error"
              />
            </div>
            <div id="status-error" aria-live="polite" aria-atomic="true">
              {state.errors?.couple_pic &&
                state.errors.couple_pic.map((error: string) => (
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
          href={`/dashboard/tournaments/${tournamentID}/couples`}
          className="mt-4 float-right flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Crear Pareja</Button>
      </div>

    </form>
  );
}