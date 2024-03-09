
import { UpdateGroupResult, DeleteGroupResult } from '@/app/ui/tournamentsCouples/buttons';
import { fetchFilteredResultsLikeCouple } from '@/app/lib/couplesData';

export default async function TournamentsGroupResultTable({
  tournamentID,
  query
}: {
  tournamentID: string;
  query: string;
}) {
  const results = await fetchFilteredResultsLikeCouple(query, tournamentID);


  return (
    <>
      <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
            <div className="md:hidden">
              {results?.map((result) => (
                <div
                key={result.id}
                className="mb-2 w-full rounded-md bg-white p-4"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="mb-2 flex items-center">
                        <p>{result.couple1_id} / {result.couple2_id}</p>
                      </div>
                      <div className="mb-2 flex items-center">
                        <p>{result.group_id}</p>
                      </div>
                      <div className="mb-2 flex items-center">
                        <p>{result.set_1_c1} / {result.set_1_c2}</p>
                        <p>{result.set_2_c1} / {result.set_2_c2}</p>
                        <p>{result.set_3_c1} / {result.set_3_c2}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-between pt-4">
                    <div className="flex justify-end gap-2">
                      <UpdateGroupResult tournamentID={tournamentID} resultID={result.id} />
                      <DeleteGroupResult resultID={result.id} />
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
                  <th scope="col" className="px-3 py-5 font-medium">
                    Resultado
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
                {results?.map((result) => (
                  <tr
                  key={result.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        <p>{result.couple1_id} / {result.couple2_id}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        <p>{result.group_id}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        <p>{result.set_1_c1} / {result.set_1_c2}</p>
                        <p>{result.set_2_c1} / {result.set_2_c2}</p>
                        <p>{result.set_3_c1} / {result.set_3_c2}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        <UpdateGroupResult tournamentID={tournamentID} resultID={result.id} />
                        <DeleteGroupResult resultID={result.id} />
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