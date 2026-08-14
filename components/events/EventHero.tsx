import Link from "next/link";
import FoodPhoto from "@/components/common/FoodPhoto";

/**
 * EventHero — Premium hero section for event subpages
 *
 * Provides a full-width hero with gradient overlay, event label,
 * title, description, optional price display, and quick facts strip.
 *
 * Inspired by the pominki page design (the best designed event page).
 */

type QuickFact = {
  value: string;
  label: string;
};

type EventHeroProps = {
  /** Event type label shown above title (e.g., "Свадьбы под ключ") */
  label?: string;
  /** Main H1 title */
  title: string;
  /** Description text below title */
  description?: string;
  /** Optional background image path */
  backgroundImage?: string;
  /** Alt text for background image */
  imageAlt?: string;
  /** Price information to display */
  priceInfo?: React.ReactNode;
  /** Quick facts strip data */
  quickFacts?: QuickFact[];
  /** Breadcrumb current page name */
  breadcrumbName?: string;
  /** Additional class names for the outer container */
  className?: string;
};

export default function EventHero({
  label,
  title,
  description,
  backgroundImage,
  imageAlt,
  priceInfo,
  quickFacts,
  breadcrumbName,
  className = "",
}: EventHeroProps) {
  const hasImage = Boolean(backgroundImage);

  return (
    <>
      {/* ───────────────── HERO SECTION ───────────────── */}
      <section
        className={`relative flex min-h-[50vh] items-end overflow-hidden md:min-h-[60vh] ${className}`}
      >
        {/* Background Image (optional) */}
        {hasImage && backgroundImage && (
          <FoodPhoto
            src={backgroundImage}
            alt={imageAlt || title}
            aspectRatio="video"
            className="absolute inset-0 h-full w-full"
            eager
            animate={false}
          />
        )}

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: hasImage
              ? "linear-gradient(to top, rgba(28, 24, 21, 0.92) 0%, rgba(28, 24, 21, 0.55) 45%, rgba(28, 24, 21, 0.15) 100%)"
              : "linear-gradient(135deg, #2D2624 0%, #3D3530 40%, #2D2624 100%)",
          }}
          aria-hidden="true"
        />

        {/* Decorative pattern for non-image backgrounds */}
        {!hasImage && (
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              mixBlendMode: "multiply",
            }}
            aria-hidden="true"
          />
        )}

        {/* Gold accent line at top */}
        <div
          className="absolute top-0 right-0 left-0 z-20 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, #C9A66B 20%, #D4AF37 50%, #C9A66B 80%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 w-full">
          <div className="container-site max-w-5xl pt-28 pb-10 md:pt-32 md:pb-14">
            {/* Breadcrumbs */}
            <nav aria-label="Хлебные крошки" className="mb-6 text-xs text-white/70 md:text-sm">
              <Link href="/" className="transition-colors hover:text-white">
                Главная
              </Link>
              {" / "}
              <Link href="/events" className="transition-colors hover:text-white">
                События
              </Link>
              {breadcrumbName && (
                <>
                  {" / "}
                  <span className="text-white">{breadcrumbName}</span>
                </>
              )}
            </nav>

            {/* Label */}
            {label && (
              <p className="mb-3 text-[11px] tracking-[0.25em] text-[#C9A66B] uppercase md:text-xs">
                {label}
              </p>
            )}

            {/* Title */}
            <h1 className="font-heading mb-5 max-w-3xl text-3xl font-medium text-white md:text-5xl lg:text-6xl">
              {title}
            </h1>

            {/* Description */}
            {description && (
              <p className="mb-6 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
                {description}
              </p>
            )}

            {/* Price Info */}
            {priceInfo && (
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white md:text-base">
                {priceInfo}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ───────────────── QUICK FACTS STRIP (optional) ───────────────── */}
      {quickFacts && quickFacts.length > 0 && (
        <section className="border-line bg-card border-b">
          <div className="container-site max-w-5xl">
            <div className="grid grid-cols-2 divide-x md:grid-cols-4">
              {quickFacts.map((fact) => (
                <div key={fact.label} className="px-4 py-5 text-center">
                  <div className="font-heading text-foreground text-xl font-medium md:text-2xl">
                    {fact.value}
                  </div>
                  <div className="text-muted-foreground mt-1 text-xs md:text-sm">{fact.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
