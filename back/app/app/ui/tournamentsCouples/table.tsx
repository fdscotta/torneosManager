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
          <div className="rounded-lg dark:bg-slate-800 p-2 md:pt-0">
            <div className="md:hidden">
              {couples?.map((couple) => (
                <div
                  key={couple.id}
                  className="mb-2 w-full rounded-md dark:bg-slate-800 p-4"
                >
                  <div className="flex flex-row border-b pb-4 text-white">
                    <div className='basis-3/4'>
                      {couple.player1} / {couple.player2}
                    </div>
                    <div className='basis-1/4'>
                      {couple.group_id}
                    </div>
                  </div>
                  <div className="flex w-full flex-row justify-end space-x-2 pt-4">

                    <UpdateCouple tournamentID={tournamentID} coupleID={couple.id} />
                    <DeleteCouple id={couple.id} />

                  </div>
                </div>
              ))}
            </div>
            <table className="hidden min-w-full dark:bg-slate-800 md:table text-white">
              <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                    Pareja
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Fase
                  </th>
                  <th scope="col" className="relative py-3 pl-6 pr-3">
                  </th>
                </tr>
              </thead>
              <tbody className="dark:bg-slate-800 text-white">
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
