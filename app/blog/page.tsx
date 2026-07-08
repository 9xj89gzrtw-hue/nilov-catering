import type { Metadata } from "next";
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { blogPosts } from '@/lib/data';

export const metadata: Metadata = {
  title: "Блог",
  description: "Статьи о кейтеринге, трендах гастрономии, советы по организации мероприятий.",
};

export default function BlogPage() {
  return (
    <>
      <div className="pt-20 md:pt-24 pb-8 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Блог" }]} />
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-semibold text-cream mt-4">
            Блог
          </h1>
          <p className="mt-3 text-sm text-cream-muted max-w-xl">
            Тренды кейтеринга, советы по организации мероприятий и гастрономические истории.
          </p>
        </div>
      </div>

      <section className="py-12 md:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group bg-card border border-border rounded-md overflow-hidden card-hover block"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wider bg-burgundy/80 text-cream px-2 py-0.5 rounded-sm">
                    {post.category}
                  </span>
                </div>
                <div className="p-5">
                  <time className="text-[11px] text-cream-muted" dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </time>
                  <h2 className="font-heading text-xl font-semibold text-cream mt-2 mb-2 line-clamp-2 group-hover:text-gold transition-colors duration-200">
                    {post.title}
                  </h2>
                  <p className="text-xs text-cream-muted line-clamp-2">{post.excerpt}</p>
                  <p className="text-xs text-gold mt-3">{post.author}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}