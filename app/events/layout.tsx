import Breadcrumbs from '@/components/common/Breadcrumbs';

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Breadcrumbs />
      {children}
    </>
  );
}