import { Suspense } from 'react';

import ActiveTournaments from '@/app/ui/dashboard/active-tournaments';
import { ActiveTournamentsSkeleton } from '@/app/ui/skeletons';

export default async function Page() {
  return (
    <main>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<ActiveTournamentsSkeleton />}>
          <ActiveTournaments />
        </Suspense>
      </div>
    </main>
  );
}
