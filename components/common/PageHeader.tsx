import { type ReactNode } from 'react';

interface PageHeaderProps {
  /** Main title */
  title: string;
  /** Optional eyebrow text above title (small caps) */
  eyebrow?: string;
  /** Optional subtitle below title */
  subtitle?: ReactNode;
  /** Center the header (default true) */
  centered?: boolean;
  /** Optional emoji/icon prefix on title (deprecated, prefer SVG) */
  icon?: ReactNode;
  /** Optional CTA block (buttons) */
  actions?: ReactNode;
  className?: string;
}

/**
 * Unified page header — used on all inner pages.
 * Replaces 5 different H1 styles with one consistent design.
 *
 * Layout: optional eyebrow H1 optional subtitle optional actions.
 * Centered by default, set centered={false} for left-align.
 */
export default function PageHeader({
  title,
  eyebrow,
  subtitle,
  centered = true,
  icon,
  actions,
  className = '',
}: PageHeaderProps) {
  return (
    <header className={`mb-8 ${centered ? 'text-center' : 'text-left'} ${className}`}>
      {eyebrow && (
        <p className="text-xs uppercase tracking-[0.18em] text-gold-text font-semibold mb-2">
          {eyebrow}
        </p>
      )}
      <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-3 leading-tight">
        {icon && <span className="mr-2" aria-hidden="true">{icon}</span>}
        {title}
      </h1>
      {subtitle && (
        <div className={`text-base md:text-lg text-muted-foreground ${centered ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}>
          {subtitle}
        </div>
      )}
      {actions && (
        <div className={`mt-5 flex flex-wrap gap-3 ${centered ? 'justify-center' : ''}`}>
          {actions}
        </div>
      )}
    </header>
  );
}
