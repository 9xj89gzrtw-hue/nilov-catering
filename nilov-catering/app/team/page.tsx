import { teamMembers } from "@/lib/data";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import AnimatedSection from "@/components/common/AnimatedSection";
import Image from "next/image";

export default function TeamPage() {
  const breadcrumbs = [
    { label: "Главная", href: "/" },
    { label: "Команда", href: "/team" },
  ];

  return (
    <main>
      <div className="bg-primary py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-primary-foreground mb-4">Наша команда</h1>
          <p className="text-primary-foreground/70 text-lg">Профессионалы, которые делают ваше мероприятие незабываемым</p>
        </div>
      </div>
      <Breadcrumbs items={breadcrumbs} />
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, i) => (
              <AnimatedSection key={member.id} delay={i * 0.1}>
                <div className="group text-center">
                  <div className="relative overflow-hidden rounded-lg mb-4 aspect-[3/4]">
                    <Image src={member.photo} alt={member.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold">{member.name}</h3>
                  <p className="text-accent text-sm font-medium">{member.role}</p>
                  <p className="text-xs text-muted-foreground mt-1">{member.specialization}</p>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{member.bio}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
