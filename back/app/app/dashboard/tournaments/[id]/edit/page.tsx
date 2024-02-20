import Form from '@/app/ui/tournaments/edit-form';
import Breadcrumbs from '@/app/ui/tournaments/breadcrumbs';
import { fetchTournamentById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Editar Torneo',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [tournament] = await Promise.all([
    fetchTournamentById(id),
  ]).catch(() => {
    notFound()
  });

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Torneos', href: '/dashboard/tournaments' },
          {
            label: 'Editar Torneo',
            href: `/dashboard/tournaments/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form tournament={tournament} />
    </main>
  );
}
