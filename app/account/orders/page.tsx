import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Мои события' };
export default function Page() { return <main className="pt-24 pb-20"><div className="container-site"><h1>Мои события</h1><p className="text-muted-foreground mt-4">История заказов. Страница в разработке.</p></div></main>; }