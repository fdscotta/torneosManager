import Image from 'next/image';
import { UpdateTournament, DeleteTournament, AddCouples, GroupResults } from '@/app/ui/tournaments/buttons';
import TournamentStatus from '@/app/ui/tournaments/status';
import { formatDateToLocal } from '@/app/lib/utils';
import { fetchFilteredTournaments } from '@/app/lib/data';

export default async function TournamentsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const tournaments = await fetchFilteredTournaments(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {tournaments?.map((tournament) => (
              <div
                key={tournament.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={tournament.image}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${tournament.name}'s profile picture`}
                      />
                      <p>{tournament.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">Year</p>
                  </div>
                  <TournamentStatus status={tournament.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div className="flex justify-end gap-2">
                    {(tournament.status === 0) && <AddCouples id={tournament.id} />}
                    {(tournament.status === 0) && <GroupResults id={tournament.id} />}
                    <UpdateTournament id={tournament.id} />
                    <DeleteTournament id={tournament.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Nombre
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Fecha
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Editar</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {tournaments?.map((tournament) => (
                <tr
                  key={tournament.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={tournament.image}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${tournament.name}'s profile picture`}
                      />
                      <p>{tournament.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(tournament.date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <TournamentStatus status={tournament.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      {(tournament.status === 0) && <AddCouples id={tournament.id} />}
                      {(tournament.status === 0) && <GroupResults id={tournament.id} />}
                      <UpdateTournament id={tournament.id} />
                      <DeleteTournament id={tournament.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
