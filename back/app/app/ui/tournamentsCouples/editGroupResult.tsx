'use client'

import { CouplesSelect, GroupResult, GroupsSelect } from '@/app/lib/definitions';
import { updateGroupResult } from '@/app/lib/tournamentGroupResultActions';
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
    const [ groups, setGroups ] = useState<GroupsSelect[]>([]);
    const [ couples, setCouples ] = useState<CouplesSelect[]>([]);
    const [ couple1, setCouple1 ] = useState('');
    const [ couple2, setCouple2 ] = useState('');
    const [ selectedGroup, setSelectedGroup ] = useState('');

    const initialState = { message: null, errors: {} };
    const updateGroupResultAction = updateGroupResult.bind(null, result.id, tournamentID);
    const [ state, dispatch ] = useFormState(updateGroupResultAction, initialState);

    const groupSelectionHandler = (group: string) => {
        setSelectedGroup(group);
        fetch(`/api/couples/bygroup/${tournamentID}/${group}`,{
        method: "POST",
        })
        .then((res) => res.json())
        .then((result) => setCouples(result.couples))
        .catch(err => console.error(err));
    }

    useEffect(() => {
        fetch(`/api/groups/${tournamentID}`,{
        method: "POST",
        })
        .then((res) => res.json())
        .then((result) => {
        setGroups(result.groups);
        })
        .catch(err => console.error(err));
    }, [tournamentID])

    return (
        <form action={dispatch}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
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
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        aria-describedby="date-error"
                    />
                    </div>
                    <legend className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Grupo
                    </legend>
                    <div className="relative mb-4">
                    {groups &&
                        <select
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        id="group_id"
                        name="group_id"
                        onChange={e => groupSelectionHandler(e.target.value)}
                        onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Seleccione un Grupo')}
                        onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
                        required
                        >
                        <option value="">Seleccione un grupo</option>
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
                    {couples &&
                        <select
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        id="couple1_id"
                        name="couple1_id"
                        onChange={e => setCouple1(e.target.options[e.target.selectedIndex].text)}
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
                    {couples &&
                        <select
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        id="couple2_id"
                        name="couple2_id"
                        onChange={e => setCouple2(e.target.options[e.target.selectedIndex].text)}
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
                        type='text'
                        defaultValue={'6'}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light flex-grow"
                        />
                    </div>
                    <div className="relative mb-4">
                        <input
                        id='set_1_c2'
                        name='set_1_c2'
                        type='text'
                        defaultValue={'1'}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light flex-grow"
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
                        type='text'
                        defaultValue={'2'}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        />
                    </div>
                    <div className="relative mb-4">
                        <input
                        id='set_2_c2'
                        name='set_2_c2'
                        type='text'
                        defaultValue={'6'}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
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
                        type='text'
                        defaultValue={'4'}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        />
                    </div>
                    <div className="relative mb-4">
                        <input
                        id='set_3_c2'
                        name='set_3_c2'
                        type='text'
                        defaultValue={'6'}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        />
                    </div>
                    </div>
                    <legend className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Ganador
                    </legend>
                    <ul className="grid w-full gap-3 md:grid-cols-2">
                        <li>
                            <input type="radio" id="couple_1" name="winner" value="couple_1" className="hidden peer" />
                            <label htmlFor="couple_1" className="inline-flex items-center justify-between w-full p-2.5  text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <div className="block">
                                    <div className="w-full text-sm font-semibold">{couple1}</div>
                                </div>
                            </label>
                        </li>
                        <li>
                            <input type="radio" id="couple_2" name="winner" value="couple_2" className="hidden peer" />
                            <label htmlFor="couple_2" className="inline-flex items-center justify-between w-full p-2.5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <div className="block">
                                    <div className="w-full text-sm font-semibold">{couple2}</div>
                                </div>
                            </label>
                        </li>
                    </ul>
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