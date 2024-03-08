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
    id: string,
    resultId: string
  }
}) {
  const [result] = await Promise.all([
    fetchFilteredResultsById(params.resultId),
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
            href: `/dashboard/tournaments/${params.id}/group-results/${params.resultId}/edit`,
            active: true,
          },
        ]}
      />
      <Form result={result} tournamentID={params.id} />
    </main>
  );
}
