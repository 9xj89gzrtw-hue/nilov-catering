"use client";

import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import AnimatedSection from "@/components/common/AnimatedSection";
import { blogPosts } from "@/lib/data";
import { motion } from "framer-motion";

export default function BlogSection() {
  const posts = blogPosts.slice(0, 3);

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-12 md:mb-16">
            <p className="text-accent text-sm font-medium tracking-widest uppercase mb-3">
              Блог
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Полезное о <span className="gradient-text">кейтеринге</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base leading-relaxed">
              Делимся опытом и рассказываем о трендах гастрономической индустрии
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <AnimatedSection key={post.id} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Link href={`/blog/${post.slug}`} className="block group">
                  <article className="h-full rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 transition-all duration-500 overflow-hidden">
                    {/* Colored top bar */}
                    <div className="h-1 bg-gradient-to-r from-accent to-gold" />
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                        <BookOpen className="w-3.5 h-3.5" />
                        {post.date}
                      </div>
                      <h3 className="font-heading text-lg font-bold mb-2 group-hover:text-accent transition-colors duration-300 leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-1 text-accent text-sm font-medium group-hover:gap-2 transition-all duration-300">
                        Читать
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </article>
                </Link>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}