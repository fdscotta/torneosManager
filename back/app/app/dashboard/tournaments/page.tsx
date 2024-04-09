import Pagination from '@/app/ui/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/tournaments/table';
import { CreateTournament } from '@/app/ui/tournaments/buttons';
import { lusitana } from '@/app/ui/fonts';
import { TournamentTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchTournamentsPages } from '@/app/lib/data';
import { Metadata } from 'next';
import { auth, getUser } from '@/auth';

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
  const session = await auth();
  const sessionEmail = session?.user?.email || '';
  const user = await getUser(sessionEmail);

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchTournamentsPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl dark:text-white`}>Torneos</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar Torneo..." />
        <CreateTournament />
      </div>
      <Suspense key={query + currentPage} fallback={<TournamentTableSkeleton />}>
        <Table query={query} currentPage={currentPage} userRole={user?.role} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}