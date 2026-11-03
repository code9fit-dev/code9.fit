import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { ADMIN_COOKIE, adminFromCookieValue } from '@/lib/admin/session';
import { BuilderClient } from './BuilderClient';

export default async function WorkoutBuilderPage({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const { id } = await searchParams;
  const jar = await cookies();
  if (!adminFromCookieValue(jar.get(ADMIN_COOKIE)?.value)) {
    redirect('/admin/login?next=/admin/workout-builder');
  }
  return <BuilderClient initialId={id} />;
}
