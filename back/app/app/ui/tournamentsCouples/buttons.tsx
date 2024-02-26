import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { deleteCouple } from '@/app/lib/tournamentsCouplesActions';
import { deleteGroupResult } from '@/app/lib/tournamentGroupResultActions';
import Link from 'next/link';

export function CreateCouple({ tournamentID }: { tournamentID: string }) {
  return (
    <Link
      href={`/dashboard/tournaments/${tournamentID}/couples/create`}
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Crear Pareja</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateCouple({
  tournamentID,
  coupleID
}: {
  tournamentID: string;
  coupleID: string;
}) {
  return (
    <Link
      href={`/dashboard/tournaments/${tournamentID}/couples/${coupleID}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteCouple({ id }: { id: string }) {
  const deleteCoupleWithId = deleteCouple.bind(null, id);

  return (
    <form action={deleteCoupleWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Borrar</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}

export function AddGroupResult({ tournamentID }: { tournamentID: string }) {
  return (
    <Link
      href={`/dashboard/tournaments/${tournamentID}/group-result/create`}
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Cargar Resultado</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateGroupResult({
  tournamentID,
  resultID
}: {
  tournamentID: string,
  resultID: string
}) {
  return (
    <Link
      href={`/dashboard/tournaments/${tournamentID}/group-result/${resultID}/edit`}
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Actualizar Resultado</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function DeleteGroupResult({ resultID }: { resultID: string }) {
  const deleteResultWithId = deleteGroupResult.bind(null, resultID);

  return (
    <form action={deleteResultWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Borrar</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}