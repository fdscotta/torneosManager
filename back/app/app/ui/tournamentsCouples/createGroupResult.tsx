'use client';

import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { createGroupResult } from '@/app/lib/tournamentGroupResultActions';
import { useFormState } from 'react-dom';
import { SelectGroupComp } from '@/app/ui//tournamentsCouples/selectGroupComp';

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
                  Pareja 1
              </legend>
              <div className="relative">
                <SelectGroupComp tournamentID={tournamentID} selectName='couple_1' />
              </div>
              <legend className="mb-2 block text-sm font-medium">
                  Pareja 2
              </legend>
              <div className="relative">
                {/* <SelectGroupComp tournamentID={tournamentID} selectName='couple_2' /> */}
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