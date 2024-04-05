import Breadcrumbs from '@/app/ui/tournaments/breadcrumbs';
import { Metadata } from 'next';
import Search from '@/app/ui/search';
import { AddGroupResult, GenerateGroupsMatches } from '@/app/ui/tournamentsCouples/buttons';
import { Suspense } from 'react';
import { TournamentTableSkeleton } from '@/app/ui/skeletons';
import Table from '@/app/ui/tournamentsCouples/table-results';
import Filters from '@/app/ui/tournamentsCouples/resultsFilters';

export const metadata: Metadata = {
  title: 'Resultados por Zona',
};

export default async function Page({
  params,
  searchParams
}: {
  params: {
    id: string;
  };
  searchParams?: {
    query?: string;
    filter?: string;
  };
}) {
  const query = searchParams?.query || '';
  const filter = searchParams?.filter || 'g';

  return (
    <div className="w-full">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Torneos', href: `/dashboard/tournaments` },
          {
            label: 'Resultados por Zona',
            href: `/dashboard/tournaments/${params.id}/group-results`,
            active: true,
          },
        ]}
      />
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar Resultado..." />
        <AddGroupResult tournamentID={params.id} />
      </div>
      {/* <GenerateGroupsMatches tournamentID={params.id} /> */}
      <Filters filterValue={filter} />
      <Suspense key={JSON.stringify(searchParams)} fallback={<TournamentTableSkeleton />}>
        <Table tournamentID={params.id} query={query} filter={filter} />
      </Suspense>
    </div>
  );
}
