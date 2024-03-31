import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Administrador de Torneos',
    default: 'Administrador de Torneos',
  },
  icons: {
    icon: '/favicon.ico',
  }
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="dark" lang="en">
      <body className={`${inter.className} antialiased dark:bg-slate-800`}>{children}</body>
    </html>
  );
}
