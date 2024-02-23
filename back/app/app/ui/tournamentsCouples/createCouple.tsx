'use client'
import { createCouple } from '@/app/lib/tournamentsCouplesActions';
import { useFormState } from 'react-dom';
import { Button } from '../button';

export default function FormTournamentCouples({
  tournamentID
}: {
  tournamentID: string
}) {
  const initialState = { message: null, errors: {} };
  const creteCoupleAction = createCouple.bind(null, tournamentID);
  const [ state, dispatch ] = useFormState(creteCoupleAction, initialState);

  return (
    <section>
      <div>
        <form action={dispatch}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                <div className="mb-4">
                    <div className="relative mt-2 rounded-md">
                        <legend className="mb-2 block text-sm font-medium">
                            Jugador 1
                        </legend>
                        <div className="relative">
                            <input
                                id="player1"
                                name="player1"
                                type="text"
                                placeholder="Jugador 1"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
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
                                placeholder="Jugador 2"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
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
                            <input
                                id="group"
                                name="group"
                                type="text"
                                placeholder="Grupo"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                        </div>
                    </div>
                </div>
            {state && state.message ? (
            <div aria-live="polite" className="my-2 text-sm text-red-500">
                <p>{state.message}</p>
            </div>
            ) : null}
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Button type="submit">Crear</Button>
            </div>
        </form>
      </div>
    </section>
  );
}