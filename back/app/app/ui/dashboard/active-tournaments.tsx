import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { fetchActiveTournaments } from '@/app/lib/data';
import TournamentStatus from '../tournaments/status';
import { formatDateToLocal } from '@/app/lib/utils';
import { auth, getUser } from '@/auth';

export default async function ActiveTournaments() {

  const session = await auth()
  const sessionEmail = session?.user?.email || ''
  const user = await getUser(sessionEmail)
  const activeTournaments = await fetchActiveTournaments(user?.id!);

  return (
    <div className="flex w-full flex-col md:col-span-4 lg:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Torneos Activos
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          {activeTournaments.map((tournament, i) => {
            return (
              <div
                key={tournament.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <Image
                    src={tournament.image}
                    alt={`${tournament.title}'s profile picture`}
                    className="mr-4 rounded-full"
                    width={32}
                    height={32}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {tournament.name}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
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
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
