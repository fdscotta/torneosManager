'use client'

import { GroupResult } from '@/app/lib/definitions';
import { getTournamentGroups, updateGroupResult } from '@/app/lib/tournamentGroupResultActions';
import { Button } from '@/app/ui/button';
import Link from 'next/link';
import { useFormState } from 'react-dom';

export default function EditGroupResultForm({
    result,
    tournamentID
}: {
    result: GroupResult;
    tournamentID: string;
}) {
    const initialState = { message: null, errors: {} };
    const updateGroupResultAction = updateGroupResult.bind(null, result.id, tournamentID);
    const [ state, dispatch ] = useFormState(updateGroupResultAction, initialState);

    const availablesGroups = getTournamentGroups(tournamentID);

    return (
        <form action={dispatch}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                <div className="mb-4">
                    <div className="relative mt-2 rounded-md">
                        <legend className="mb-2 block text-sm font-medium">
                            Grupo
                        </legend>
                        <div className="relative">
                            <select
                                id="group"
                                name="group"
                                placeholder={"Seleccione una Zona"}
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            >
                                <option value="" disabled selected hidden>
                                Seleccione una Zona
                                </option>
                                { availablesGroups.map(( group ) => (
                                    <option key={group.id} value={group.id}>{group.name}</option>
                                ))}
                            </select>
                        </div>
                        <legend className="mb-2 block text-sm font-medium">
                            Pareja 1
                        </legend>
                        <div className="relative">
                            <input
                                id="couple_1"
                                name="couple_1"
                                type="text"
                                defaultValue={result.couple1_id}
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
                            Pareja 2
                        </legend>
                        <div className="relative">
                            <input
                                id="couple_2"
                                name="couple_2"
                                type="text"
                                defaultValue={result.couple2_id}
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
                    </div>
                </div>
            {state && state.message ? (
            <div aria-live="polite" className="my-2 text-sm text-red-500">
                <p>{state.message}</p>
            </div>
            ) : null}
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href={`/dashboard/tournaments/${tournamentID}/group-results/`}
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                Cancelar
                </Link>
                <Button type="submit">Crear</Button>
            </div>
        </form>
    );
}