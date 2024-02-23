import EditCouplesForm from '@/app/ui/tournamentsCouples/editForm';
import Breadcrumbs from '@/app/ui/tournaments/breadcrumbs';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchCoupleById, fetchCoupleGroup } from '@/app/lib/couplesData';

export const metadata: Metadata = {
  title: 'Editar Pareja',
};

export default async function Page({
  params
}: {
  params: {
    id: string,
    coupleId: string
  };
}) {
  const tournamentID = params.id;
  const coupleID = params.coupleId;

  const [couple] = await Promise.all([
    fetchCoupleById(coupleID),
  ]).catch(() => {
    notFound()
  });

  couple.group_id = await fetchCoupleGroup(coupleID);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Torneos', href: '/dashboard/tournaments' },
          { label: 'Parejas del Torneo', href: `/dashboard/tournaments/${tournamentID}/couples`},
          {
            label: 'Editar Pareja',
            href: `/dashboard/tournaments/${tournamentID}/couples/${coupleID}/edit`,
            active: true,
          },
        ]}
      />
      <EditCouplesForm couple={couple} tournamentID={tournamentID} />
    </main>
  );
}
