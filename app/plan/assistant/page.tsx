import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Помощник подбора формата',
  description: 'Не знаете, с чего начать? Подберём формат и меню за 3 вопроса.',
};

export default function PlanAssistantPage() {
  // Redirect to the existing helper page
  redirect('/plan/helper');
}