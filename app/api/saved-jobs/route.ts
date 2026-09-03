// app/api/saved-jobs/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/prisma/db';

// GET: Retrieve saved jobs for a specific user
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ success: false, error: 'userId is required' }, { status: 400 });
    }

    const savedJobs = await db.orm.public.SavedJob
      .include('job')
      .where((sj) => sj.userId.eq(Number(userId)))
      .all();

    return NextResponse.json({ success: true, data: savedJobs });
  } catch (error) {
    console.error('Failed to fetch saved jobs:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch saved jobs' }, { status: 500 });
  }
}

// POST: Save a job
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, jobId } = body;

    if (!userId || !jobId) {
      return NextResponse.json({ success: false, error: 'userId and jobId are required' }, { status: 400 });
    }

    // Check if job already saved
    const existing = await db.orm.public.SavedJob
      .where((sj) => sj.userId.eq(Number(userId)))
      .where((sj) => sj.jobId.eq(jobId))
      .first();

    if (existing) {
      return NextResponse.json({ success: false, error: 'Job already saved' }, { status: 400 });
    }

    const savedJob = await db.orm.public.SavedJob.create({
      id: crypto.randomUUID(),
      userId: Number(userId),
      jobId,
    });

    return NextResponse.json({ success: true, data: savedJob }, { status: 201 });
  } catch (error) {
    console.error('Failed to save job:', error);
    return NextResponse.json({ success: false, error: 'Failed to save job' }, { status: 500 });
  }
}