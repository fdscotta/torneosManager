import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { fetchActiveTournaments } from '@/app/lib/data';
import TournamentStatus from '../tournaments/status';
import { formatDateToLocal } from '@/app/lib/utils';


export default async function ActiveTournaments() {
  const activeTournaments = await fetchActiveTournaments();

  return (
    <div className="flex w-full flex-col sm:col-span-12 md:col-span-4 lg:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl text-white`}>
        Torneos Activos
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl dark:bg-slate-800 p-4">
        <div className="dark:bg-slate-800 px-6 text-white">
          {activeTournaments.map((tournament, i) => {
            return (
              <div
                key={tournament.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4 border-b',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <Image
                    src={tournament.image}
                    alt={`${tournament.name}'s profile picture`}
                    className="mr-4 rounded-full"
                    width={32}
                    height={32}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {tournament.name}
                    </p>
                    <p className="hidden text-s sm:block">
                      {formatDateToLocal(tournament.date)}
                    </p>
                  </div>
                </div>
                <p
                  className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
                >
                  <TournamentStatus status={tournament.status} />
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
