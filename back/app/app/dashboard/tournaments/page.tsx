import Pagination from '@/app/ui/tournaments/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/tournaments/table';
import { CreateTournament } from '@/app/ui/tournaments/buttons';
import { lusitana } from '@/app/ui/fonts';
import { TournamentTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchTournamentsPages } from '@/app/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Torneos',
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

  const totalPages = await fetchTournamentsPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Torneos</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar Torneo..." />
        <CreateTournament />
      </div>
      <Suspense key={query + currentPage} fallback={<TournamentTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
