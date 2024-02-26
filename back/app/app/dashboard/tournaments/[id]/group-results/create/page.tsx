import CreateForm from '@/app/ui/tournamentsCouples/createGroupResult';
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
          { label: 'Resultados de Zona', href: `/dashboard/tournaments/${params.id}/group-results`},
          {
            label: 'Cargar Partido',
            href: `/dashboard/tournaments/${params.id}/group-results/create`,
            active: true,
          },
        ]}
      />

      <CreateForm tournamentID={params.id} group_id='A'/>
    </main>
  );
}
