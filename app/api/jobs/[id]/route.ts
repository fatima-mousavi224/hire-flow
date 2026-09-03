// app/api/jobs/[id]/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/prisma/db';

// GET: Fetch single job by ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const job = await db.orm.public.Job
      .include('company')
      .where((j) => j.id.eq(id))
      .first();

    if (!job) {
      return NextResponse.json({ success: false, error: 'Job not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: job });
  } catch (error) {
    console.error('Failed to fetch job:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch job details' }, { status: 500 });
  }
}

// PATCH: Update job details
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const existingJob = await db.orm.public.Job.where((j) => j.id.eq(id)).first();
    if (!existingJob) {
      return NextResponse.json({ success: false, error: 'Job not found' }, { status: 404 });
    }

    const updatedJob = await db.orm.public.Job
      .where((j) => j.id.eq(id))
      .update(body);

    return NextResponse.json({ success: true, data: updatedJob });
  } catch (error) {
    console.error('Failed to update job:', error);
    return NextResponse.json({ success: false, error: 'Failed to update job' }, { status: 500 });
  }
}

// DELETE: Delete job by ID
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const existingJob = await db.orm.public.Job.where((j) => j.id.eq(id)).first();
    if (!existingJob) {
      return NextResponse.json({ success: false, error: 'Job not found' }, { status: 404 });
    }

    await db.orm.public.Job.where((j) => j.id.eq(id)).delete();

    return NextResponse.json({ success: true, message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Failed to delete job:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete job' }, { status: 500 });
  }
}