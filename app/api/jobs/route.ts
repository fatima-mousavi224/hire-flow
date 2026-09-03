// app/api/jobs/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/prisma/db';

const VALID_JOB_TYPES = ['FULL_TIME', 'PART_TIME', 'INTERNSHIP', 'CONTRACT'] as const;
const VALID_WORKPLACE_TYPES = ['REMOTE', 'HYBRID', 'ON_SITE'] as const;

type JobTypeUnion = typeof VALID_JOB_TYPES[number];
type WorkplaceTypeUnion = typeof VALID_WORKPLACE_TYPES[number];

// GET: Search, Filter (jobType, workplaceType, isFeatured), and Paginate Jobs
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    const query = searchParams.get('q')?.trim() || searchParams.get('search')?.trim();
    const jobType = searchParams.get('jobType');
    const workplaceType = searchParams.get('workplaceType');
    const isFeatured = searchParams.get('isFeatured');

    // Pagination
    const limitParam = parseInt(searchParams.get('limit') || '10', 10);
    const pageParam = parseInt(searchParams.get('page') || '1', 10);
    const limit = Math.max(1, Math.min(limitParam, 50));
    const page = Math.max(1, pageParam);
    const offset = (page - 1) * limit;

    let jobQuery = db.orm.public.Job.include('company');

    if (jobType && VALID_JOB_TYPES.includes(jobType as JobTypeUnion)) {
      jobQuery = jobQuery.where((job) => job.jobType.eq(jobType as JobTypeUnion));
    }

    if (workplaceType && VALID_WORKPLACE_TYPES.includes(workplaceType as WorkplaceTypeUnion)) {
      jobQuery = jobQuery.where((job) => job.workplaceType.eq(workplaceType as WorkplaceTypeUnion));
    }

    if (query) {
      jobQuery = jobQuery.where((job) => job.title.ilike(`%${query}%`));
    }

    if (isFeatured === 'true') {
      jobQuery = jobQuery.where((job) => job.isFeatured.eq(true));
    } else if (isFeatured === 'false') {
      jobQuery = jobQuery.where((job) => job.isFeatured.eq(false));
    }

    const jobs = await jobQuery.limit(limit).offset(offset).all();

    return NextResponse.json({
      success: true,
      pagination: { page, limit, count: jobs.length },
      data: jobs,
    });
  } catch (error) {
    console.error('Failed to fetch jobs:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch jobs' }, { status: 500 });
  }
}

// POST: Create a new job
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, location, salary, jobType, workplaceType, companyId, tags, isFeatured } = body;

    if (!title || !location || !salary || !jobType || !workplaceType || !companyId) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const newJob = await db.orm.public.Job.create({
      id: crypto.randomUUID(),
      title,
      location,
      salary,
      jobType,
      workplaceType,
      companyId,
      tags: tags || [],
      isFeatured: Boolean(isFeatured),
    });

    return NextResponse.json({ success: true, data: newJob }, { status: 201 });
  } catch (error) {
    console.error('Failed to create job:', error);
    return NextResponse.json({ success: false, error: 'Failed to create job' }, { status: 500 });
  }
}