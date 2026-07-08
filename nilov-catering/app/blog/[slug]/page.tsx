import { notFound } from "next/navigation";
import Link from "next/link";
import { blogPosts } from "@/lib/data";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import Image from "next/image";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) notFound();

  const related = blogPosts.filter((p) => p.category === post.category && p.id !== post.id).slice(0, 2);

  const breadcrumbs = [
    { label: "Главная", href: "/" },
    { label: "Блог", href: "/blog" },
    { label: post.title, href: `/blog/${post.slug}` },
  ];

  return (
    <main>
      <div className="bg-primary py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-primary-foreground">{post.title}</h1>
          <p className="text-primary-foreground/70 mt-4">{post.date}</p>
        </div>
      </div>
      <Breadcrumbs items={breadcrumbs} />
      <article className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative aspect-video rounded-lg overflow-hidden mb-10">
            <Image src={post.image} alt={post.title} fill className="object-cover" />
          </div>
          <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed whitespace-pre-line">
            {post.content}
          </div>
          {related.length > 0 && (
            <div className="mt-16 pt-12 border-t border-border">
              <h2 className="font-heading text-2xl font-semibold mb-6">Похожие статьи</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {related.map((r) => (
                  <Link key={r.id} href={`/blog/${r.slug}`} className="group block p-4 bg-card border border-border rounded-lg hover:border-accent transition-colors">
                    <h3 className="font-heading text-lg font-semibold group-hover:text-accent">{r.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{r.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </main>
  );
}
