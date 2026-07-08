import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Хлебные крошки">
      <ol className="flex items-center gap-1.5 text-xs text-cream-muted">
        <li>
          <Link href="/" className="hover:text-cream transition-colors duration-200">
            Главная
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <span aria-hidden="true">/</span>
            {item.href ? (
              <Link href={item.href} className="hover:text-cream transition-colors duration-200">
                {item.label}
              </Link>
            ) : (
              <span className="text-cream/80">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}