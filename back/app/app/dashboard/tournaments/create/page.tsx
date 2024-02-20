'use client';
import FormTournament from '@/app/ui/tournaments/create-form';
import Breadcrumbs from '@/app/ui/tournaments/breadcrumbs';
import { useState } from 'react';

export default function Page() {

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Torneos', href: '/dashboard/tournaments' },
          {
            label: 'Crear Torneo',
            href: '/dashboard/tournaments/create',
            active: true,
          },
        ]}
      />

      <FormTournament />
    </main>
  );
}
