import CreateForm from '@/app/ui/tournamentsCouples/createForm';
import Breadcrumbs from '@/app/ui/tournaments/breadcrumbs';

export default function Page({
  params
}:{
  params: {
    id: string;
  };
}) {

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Torneos', href: '/dashboard/tournaments' },
          { label: 'Parejas del Torneo', href: `/dashboard/tournaments/${params.id}/couples`},
          {
            label: 'Crear Pareja',
            href: `/dashboard/tournaments/${params.id}/couples/create`,
            active: true,
          },
        ]}
      />

      <CreateForm tournamentID={params.id}/>
    </main>
  );
}
