import { permanentRedirect } from 'next/navigation';

/**
 * /plan → redirect to /plan/helper
 *
 * UX critic: "5 competing planning tools, no canonical primary"
 * Fix: single canonical entry point at /plan/helper
 */
export default function PlanPage() {
  permanentRedirect('/plan/helper');
}
