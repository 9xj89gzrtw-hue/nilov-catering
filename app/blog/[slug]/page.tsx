import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { blogPosts } from '@/lib/data';
import { ArrowLeft } from 'lucide-react';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Не найдено" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image, width: 1200, height: 630 }],
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <article className="pt-20 md:pt-24 pb-16 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[
          { label: "Блог", href: "/blog" },
          { label: post.title },
        ]} />

        {/* Header */}
        <header className="mt-8 mb-10">
          <span className="text-[10px] uppercase tracking-wider bg-burgundy/80 text-cream px-2 py-0.5 rounded-sm">
            {post.category}
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold text-cream mt-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 mt-4 text-xs text-cream-muted">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
            </time>
            <span>·</span>
            <span>{post.author}</span>
          </div>
        </header>

        {/* Image */}
        <div className="relative aspect-[16/9] rounded-md overflow-hidden mb-10">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="prose-custom">
          {post.content.split('\n\n').map((paragraph, i) => {
            if (paragraph.match(/^\d+\./)) {
              const items = paragraph.split('\n');
              return (
                <ol key={i} className="space-y-2 mb-6">
                  {items.map((item, j) => (
                    <li key={j} className="text-sm text-cream/80 leading-relaxed pl-1">
                      {item.replace(/^\d+\.\s*/, '')}
                    </li>
                  ))}
                </ol>
              );
            }
            return (
              <p key={i} className="text-sm text-cream/80 leading-relaxed mb-4">
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Back link */}
        <div className="mt-12 pt-8 border-t border-border">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-gold font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Все статьи
          </Link>
        </div>
      </div>
    </article>
  );
}