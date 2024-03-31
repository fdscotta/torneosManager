import Breadcrumbs from '@/app/ui/tournaments/breadcrumbs';
import { Metadata } from 'next';
import Search from '@/app/ui/search';
import { CreateCouple } from '@/app/ui/tournamentsCouples/buttons';
import { Suspense } from 'react';
import { TournamentTableSkeleton } from '@/app/ui/skeletons';
import Table from '@/app/ui/tournamentsCouples/table';

export const metadata: Metadata = {
  title: 'Cargar Parejas del Torneo',
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
    page?: string;
  };
}) {
  const query = searchParams?.query || '';

  return (
    <div className="w-full">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Torneos', href: '/dashboard/tournaments' },
          {
            label: 'Parejas del Torneo',
            href: `/dashboard/tournaments/${params.id}/couples`,
            active: true,
          },
        ]}
      />
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar Pareja..." />
        <CreateCouple tournamentID={params.id} />
      </div>
      <Suspense key={query} fallback={<TournamentTableSkeleton />}>
        <Table tournamentID={params.id} query={query} />
      </Suspense>
    </div>
  );
}
