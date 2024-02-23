import Breadcrumbs from '@/app/ui/tournaments/breadcrumbs';
import { Metadata } from 'next';
import FormTournamentCouples from '@/app/ui/tournamentsCouples/createCouple'

export const metadata: Metadata = {
  title: 'Cargar Parejas del Torneo',
};

export default async function Page({
    params
}: {
  params: {
    id: string;
  }
}) {
  const id = params.id;


  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Torneos', href: '/dashboard/tournaments' },
          {
            label: 'Parejas del Torneo',
            href: `/dashboard/tournaments/${id}/couples`,
            active: true,
          },
        ]}
      />
      <FormTournamentCouples tournamentID={id}/>
    </main>
  );
}
