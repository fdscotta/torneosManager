import Form from '@/app/ui/tournamentsCouples/editGroupResult';
import Breadcrumbs from '@/app/ui/tournaments/breadcrumbs';
import { fetchFilteredResultsById } from '@/app/lib/couplesData';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Editar Resultado',
};

export default async function Page({
  params
}: {
  params: {
    tournamentID: string,
    resultID: string
  }
}) {
  const [result] = await Promise.all([
    fetchFilteredResultsById(params.resultID),
  ]).catch(() => {
    notFound()
  });

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Torneos', href: '/dashboard/tournaments' },
          {
            label: 'Editar Partido',
            href: `/dashboard/tournaments/${params.tournamentID}/group-results/${params.resultID}/edit`,
            active: true,
          },
        ]}
      />
      <Form result={result} tournamentID={params.tournamentID} />
    </main>
  );
}
