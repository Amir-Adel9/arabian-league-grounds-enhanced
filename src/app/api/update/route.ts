import { fulfillUpdates } from '@/entities/actions';

export const dynamic = 'force-dynamic';

export async function GET() {
  await fulfillUpdates();
  return new Response(`Success! Updates have been made`);
}
