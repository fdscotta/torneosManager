import Image from 'next/image';
import { UpdateTournamentCouple, DeleteTournamentCouple} from '@/app/ui/tournamentsCouples/buttons';
import { fetchFilteredTournamentsCouples } from '@/app/lib/couplesData';

export default async function TournamentsCouplesTable({
  query,
  currentPage,
  tournamentID,
}: {
  query: string;
  currentPage: number;
  tournamentID: string;
}) {
  const tournamentsCouples = await fetchFilteredTournamentsCouples(query, currentPage, tournamentID);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {tournamentsCouples?.map((tournamentCouples) => (
              <div
                key={tournamentCouples.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{tournamentCouples.name}</p>
                    </div>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div className="flex justify-end gap-2">
                    <UpdateTournamentCouple id={tournamentCouples.id} />
                    <DeleteTournamentCouple id={tournamentCouples.id} />
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
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Editar</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {tournamentsCouples?.map((tournamentCouples) => (
                <tr
                  key={tournamentCouples.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{tournamentCouples.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateTournamentCouple id={tournamentCouples.id} />
                      <DeleteTournamentCouple id={tournamentCouples.id} />
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
