'use client'

import { CouplesSelect, GroupResult, GroupsSelect } from '@/app/lib/definitions';
import { updateGroupResult } from '@/app/lib/tournamentGroupResultActions';
import { formatDateToYYYYMMDDHHMM } from '@/app/lib/utils';
import { Button } from '@/app/ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';

export default function EditGroupResultForm({
    result,
    tournamentID
}: {
    result: GroupResult;
    tournamentID: string;
}) {
    const [groups, setGroups] = useState<GroupsSelect[]>([]);
    const [couples, setCouples] = useState<CouplesSelect[]>([]);
    const [selectedGroup, setSelectedGroup] = useState(result.group_id || '');
    const [winner, setWinner] = useState(result.winner || '');

    const initialState = { message: null, errors: {} };
    const updateGroupResultAction = updateGroupResult.bind(null, result.id, tournamentID);
    const [state, dispatch] = useFormState(updateGroupResultAction, initialState);

    useEffect(() => {
        fetch(`/api/tournaments/couples/bygroup/${tournamentID}/${selectedGroup}`, {
            method: "POST",
        })
            .then((res) => res.json())
            .then((result) => setCouples(result.couples))
            .catch(err => console.error(err));
    }, [selectedGroup, tournamentID])

    useEffect(() => {
        fetch(`/api/groups/${tournamentID}`, {
            method: "POST",
        })
            .then((res) => res.json())
            .then((result) => setGroups(result.groups))
            .catch(err => console.error(err));
    }, [tournamentID])

    const handleWinnerChange = (value: string) => {
        setWinner(value);
    };

    return (
        <form action={dispatch}>
            <div className="rounded-md dark:bg-slate-800 p-4 md:p-6">
                <div className="mb-4">
                    <div className="relative mt-2 rounded-md">
                        <legend className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Fecha del Partido
                        </legend>
                        <div className="relative mb-4">
                            <input
                                id="match_date"
                                name="match_date"
                                type="datetime-local"
                                min="2024-01-01T00:00"
                                placeholder="Fecha de inicio del Torneo"
                                defaultValue={formatDateToYYYYMMDDHHMM(result.match_date)}
                                className="shadow-sm dark:bg-slate-800 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                aria-describedby="date-error"
                            />
                        </div>
                        <legend className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Grupo
                        </legend>
                        <div className="relative mb-4">
                            {groups && groups.length > 0 &&
                                <select
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    id="group_id"
                                    name="group_id"
                                    defaultValue={result.group_id}
                                    onChange={e => setSelectedGroup(e.target.value)}
                                    onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Seleccione un Grupo')}
                                    onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
                                    required
                                >
                                    <option value="">Seleccione un grupo</option>
                                    <option value="8">8vos</option>
                                    <option value="4">4tos</option>
                                    <option value="2">Semis</option>
                                    <option value="1">Final</option>
                                    {groups?.map((group, index) => (
                                        <option key={index} value={group?.group_id}>{group?.group_id}</option>
                                    ))}
                                </select>
                            }
                        </div>
                        <legend className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Pareja 1
                        </legend>
                        <div className="relative mb-4">
                            {couples && couples.length > 0 &&
                                <select
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    id="couple1_id"
                                    name="couple1_id"
                                    defaultValue={result.couple1_id}
                                    onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Seleccione una Pareja')}
                                    onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
                                    required
                                >
                                    <option value="">Seleccione una Pareja</option>
                                    {couples?.map((couple, index) => (
                                        <option key={index} value={couple?.id}>{couple?.couple}</option>
                                    ))}
                                </select>
                            }
                        </div>
                        <legend className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Pareja 2
                        </legend>
                        <div className="relative mb-4">
                            {couples && couples.length > 0 &&
                                <select
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    id="couple2_id"
                                    name="couple2_id"
                                    defaultValue={result.couple2_id}
                                    onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Seleccione una Pareja')}
                                    onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
                                    required
                                >
                                    <option value="">Seleccione una Pareja</option>
                                    {couples?.map((couple, index) => (
                                        <option key={index} value={couple?.id}>{couple?.couple}</option>
                                    ))}
                                </select>
                            }
                        </div>
                        <legend className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Set 1
                        </legend>
                        <div className="flex gap-8">
                            <div className="relative mb-4">
                                <input
                                    id='set_1_c1'
                                    name='set_1_c1'
                                    type='number'
                                    defaultValue={result.set_1_c1}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light flex-grow"
                                />
                            </div>
                            <div className="relative mb-4">
                                <input
                                    id='set_1_c2'
                                    name='set_1_c2'
                                    type='number'
                                    defaultValue={result.set_1_c2}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light flex-grow"
                                />
                            </div>
                        </div>
                        <legend className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Set 2
                        </legend>
                        <div className="flex gap-8">
                            <div className="relative mb-4">
                                <input
                                    id='set_2_c1'
                                    name='set_2_c1'
                                    type='number'
                                    defaultValue={result.set_2_c1}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                />
                            </div>
                            <div className="relative mb-4">
                                <input
                                    id='set_2_c2'
                                    name='set_2_c2'
                                    type='number'
                                    defaultValue={result.set_2_c2}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                />
                            </div>
                        </div>
                        <legend className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Set 3
                        </legend>
                        <div className="flex gap-8">
                            <div className="relative mb-4">
                                <input
                                    id='set_3_c1'
                                    name='set_3_c1'
                                    type='number'
                                    defaultValue={result.set_3_c1}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                />
                            </div>
                            <div className="relative mb-4">
                                <input
                                    id='set_3_c2'
                                    name='set_3_c2'
                                    type='number'
                                    defaultValue={result.set_3_c2}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                />
                            </div>
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
                <Link
                    href={`/dashboard/tournaments/${tournamentID}/group-results/`}
                    className="mt-4 float-right flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancelar
                </Link>
                <Button type="submit">Actualizar</Button>
            </div>
        </form>
    );
}