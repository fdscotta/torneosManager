import Pagination from '@/app/ui/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/tournamentsCouples/table';
import { CreateTournamentCouple } from '@/app/ui/tournamentsCouples/buttons';
import { lusitana } from '@/app/ui/fonts';
import { TournamentTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchTournamentsCouplesPages } from '@/app/lib/couplesData';
import { fetchActiveTournaments } from '@/app/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Parejas del Torneo',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const tournamentID = await fetchActiveTournaments();

  const totalPages = await fetchTournamentsCouplesPages(query, tournamentID);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Parejas del Torneo</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar Pareja..." />
        <CreateTournamentCouple />
      </div>
      <Suspense key={query + currentPage} fallback={<TournamentTableSkeleton />}>
        <Table query={query} currentPage={currentPage} tournamentID={tournamentID} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
