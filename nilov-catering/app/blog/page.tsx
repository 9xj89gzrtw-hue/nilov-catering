import Link from "next/link";
import { blogPosts } from "@/lib/data";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import AnimatedSection from "@/components/common/AnimatedSection";
import Image from "next/image";

export default function BlogPage() {
  const breadcrumbs = [
    { label: "Главная", href: "/" },
    { label: "Блог", href: "/blog" },
  ];

  return (
    <main>
      <div className="bg-primary py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-primary-foreground mb-4">Блог</h1>
          <p className="text-primary-foreground/70 text-lg">Советы, тренды и идеи для вашего мероприятия</p>
        </div>
      </div>
      <Breadcrumbs items={breadcrumbs} />
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, i) => (
              <AnimatedSection key={post.id} delay={i * 0.1}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className="relative overflow-hidden rounded-lg aspect-video mb-4">
                    <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{post.date}</p>
                  <h2 className="font-heading text-xl font-semibold group-hover:text-accent transition-colors">{post.title}</h2>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{post.excerpt}</p>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
