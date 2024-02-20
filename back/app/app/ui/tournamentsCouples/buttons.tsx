import { PencilIcon, PlusIcon, TrashIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteTournamentCouple } from '@/app/lib/tournamentsCouplesActions';

export function CreateTournamentCouple() {
  return (
    <Link
      href="/dashboard/couples/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Crear Pareja</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateTournamentCouple({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/couples/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteTournamentCouple({ id }: { id: string }) {
  const deleteTournamentCoupleWithId = deleteTournamentCouple.bind(null, id);

  return (
    <form action={deleteTournamentCoupleWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Borrar</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
