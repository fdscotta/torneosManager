import {
  PencilIcon,
  PlusIcon,
  TrashIcon,
  XMarkIcon,
  PresentationChartBarIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { closeTournament, deleteTournament } from '@/app/lib/tournamentsActions';

export function CreateTournament() {
  return (
    <Link
      href="/dashboard/tournaments/create"
      className="flex p-4 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Crear Torneo</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function AddCouples({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/tournaments/${id}/couples`}
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      data-toggle='tooltip'
      title="My New Title"
    >
      <UserGroupIcon className="w-5" />
    </Link>
  );
}

export function GroupResults({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/tournaments/${id}/group-results`}
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      data-toggle='tooltip'
      title="My New Title"
    >
      <PresentationChartBarIcon className="w-5" />
    </Link>
  );
}

export function UpdateTournament({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/tournaments/${id}/edit`}
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteTournament({ id }: { id: string }) {
  const deleteTournamentWithId = deleteTournament.bind(null, id);

  return (
    <form action={deleteTournamentWithId}>
      <button
        className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}

export function CloseTournament({ id }: { id: string }) {
  const closeTournamentWithId = closeTournament.bind(null, id);

  return (
    <form action={closeTournamentWithId}>
      <button
        className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        <span className="sr-only">Cerrar Torneo</span>
        <XMarkIcon className="w-5" />
      </button>
    </form>
  );
}