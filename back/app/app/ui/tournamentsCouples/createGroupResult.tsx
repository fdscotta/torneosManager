'use client';

import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { createGroupResult } from '@/app/lib/tournamentGroupResultActions';
import { useFormState } from 'react-dom';

export default function CreateForm({
  tournamentID
}:{
  tournamentID: string
}) {
  const initialState = { message: null, errors: {} };
  const creteGroupResultAction = createGroupResult.bind(null, tournamentID, 'A');
  const [ state, dispatch ] = useFormState(creteGroupResultAction, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <div className="relative mt-2 rounded-md">
              <legend className="mb-2 block text-sm font-medium">
                Fecha del Partido
              </legend>
              <div className="relative">
                <input
                  id="match_date"
                  name="match_date"
                  type="date"
                  placeholder="Fecha de inicio del Torneo"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="date-error"
                />
              </div>
              <legend className="mb-2 block text-sm font-medium">
                  Grupo
              </legend>
              <div className="relative">
                <input
                  id='group_id'
                  name='group_id'
                  type='text'
                  defaultValue={'A'}
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
              </div>
              <legend className="mb-2 block text-sm font-medium">
                  Pareja 1
              </legend>
              <div className="relative">
                <input
                  id='couple1_id'
                  name='couple1_id'
                  type='text'
                  defaultValue={'8ee17da4-12c7-4ab3-a145-ee1004d56bfd'}
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
              </div>
              <legend className="mb-2 block text-sm font-medium">
                  Pareja 2
              </legend>
              <div className="relative">
                <input
                  id='couple2_id'
                  name='couple2_id'
                  type='text'
                  defaultValue={'3e6d6bd3-61f3-455e-b1ea-944f9c821a3d'}
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
              </div>
              <legend className="mb-2 block text-sm font-medium">
                  Winner
              </legend>
              <div className="relative">
                <input
                  id='winner'
                  name='winner'
                  type='text'
                  defaultValue={'3e6d6bd3-61f3-455e-b1ea-944f9c821a3d'}
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
              </div>
              <legend className="mb-2 block text-sm font-medium">
                  Set 1 (Pareja 1)
              </legend>
              <div className="relative">
                <input
                  id='set_1_c1'
                  name='set_1_c1'
                  type='text'
                  defaultValue={'6'}
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
              </div>
              <legend className="mb-2 block text-sm font-medium">
                  Set 1 (Pareja 2)
              </legend>
              <div className="relative">
                <input
                  id='set_1_c2'
                  name='set_1_c2'
                  type='text'
                  defaultValue={'1'}
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
              </div>
              <legend className="mb-2 block text-sm font-medium">
                  Set 2 (Pareja 1)
              </legend>
              <div className="relative">
                <input
                  id='set_2_c1'
                  name='set_2_c1'
                  type='text'
                  defaultValue={'2'}
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
              </div>
              <legend className="mb-2 block text-sm font-medium">
                  Set 2 (Pareja 2)
              </legend>
              <div className="relative">
                <input
                  id='set_2_c2'
                  name='set_2_c2'
                  type='text'
                  defaultValue={'6'}
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
              </div>
              <legend className="mb-2 block text-sm font-medium">
                  Set 3 (Pareja 1)
              </legend>
              <div className="relative">
                <input
                  id='set_3_c1'
                  name='set_3_c1'
                  type='text'
                  defaultValue={'4'}
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
              </div>
              <legend className="mb-2 block text-sm font-medium">
                  Set 3 (Pareja 2)
              </legend>
              <div className="relative">
                <input
                  id='set_3_c2'
                  name='set_3_c2'
                  type='text'
                  defaultValue={'6'}
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
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
          href={`/dashboard/tournaments/${tournamentID}/group-results`}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Crear Resultado</Button>
      </div>

    </form>
  );
}