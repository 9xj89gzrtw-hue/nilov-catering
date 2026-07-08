export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-burgundy focus:text-cream focus:px-6 focus:py-3 focus:rounded-sm focus:text-sm focus:font-medium"
    >
      Перейти к основному содержанию
    </a>
  );
}