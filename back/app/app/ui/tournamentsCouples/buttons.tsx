import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { deleteCouple, updateCouple } from '@/app/lib/tournamentsCouplesActions';

export function UpdateCouple({ id }: { id: string }) {
  const updateCoupleWithId = updateCouple.bind(null, id);

  return (
    <form action={updateCoupleWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Actualizar</span>
        <PencilIcon className="w-5" />
      </button>
    </form>
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
