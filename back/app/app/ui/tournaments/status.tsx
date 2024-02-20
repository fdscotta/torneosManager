import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function TournamentsStatus({ status }: { status: number }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-500': status === 1,
          'bg-green-500 text-white': status === 0,
        },
      )}
    >
      {status === 0 ? (
        <>
          Activo
        </>
      ) : null}
      {status === 1 ? (
        <>
          Terminado
        </>
      ) : null}
    </span>
  );
}
