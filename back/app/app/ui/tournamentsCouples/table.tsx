import { UpdateCouple, DeleteCouple } from '@/app/ui/tournamentsCouples/buttons';
import { fetchFilteredCouples } from '@/app/lib/couplesData';

export default async function TournamentsCoupleTable({
  tournamentID,
  query
}: {
  tournamentID: string;
  query: string;
}) {
  const couples = await fetchFilteredCouples(tournamentID, query);

  return (
    <>
      <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
            <div className="md:hidden">
              {couples?.map((couple) => (
                <div
                key={couple.id}
                className="mb-2 w-full rounded-md bg-white p-4"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="mb-2 flex items-center">
                        <p>{couple.player1} / {couple.player2}</p>
                      </div>
                      <div className="mb-2 flex items-center">
                        <p>{couple.group_id}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-between pt-4">
                    <div className="flex justify-end gap-2">
                      <UpdateCouple tournamentID={tournamentID} coupleID={couple.id} />
                      <DeleteCouple id={couple.id} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <table className="hidden min-w-full text-gray-900 md:table">
              <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                    Pareja
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Grupo
                  </th>
                  <th scope="col" className="relative py-3 pl-6 pr-3">
                    <span className="sr-only">Editar</span>
                  </th>
                  <th scope="col" className="relative py-3 pl-6 pr-3">
                    <span className="sr-only">Borrar</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {couples?.map((couple) => (
                  <tr
                  key={couple.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        <p>{couple.player1} / {couple.player2}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        <p>{couple.group_id}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        <UpdateCouple tournamentID={tournamentID} coupleID={couple.id} />
                        <DeleteCouple id={couple.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
