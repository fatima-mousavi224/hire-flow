// app/api/saved-jobs/[id]/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/prisma/db';

// DELETE: Unsave job by SavedJob ID
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const existing = await db.orm.public.SavedJob.where((sj) => sj.id.eq(id)).first();
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Saved job record not found' }, { status: 404 });
    }

    await db.orm.public.SavedJob.where((sj) => sj.id.eq(id)).delete();

    return NextResponse.json({ success: true, message: 'Job unsaved successfully' });
  } catch (error) {
    console.error('Failed to unsave job:', error);
    return NextResponse.json({ success: false, error: 'Failed to unsave job' }, { status: 500 });
  }
}