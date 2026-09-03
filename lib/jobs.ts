// lib/jobs.ts
import { db } from '@/prisma/db';

export async function getJobById(id: string) {
  try {
    const rawJobs = await db.orm.public.Job.include('company').all();
    const foundJob = rawJobs.find((j) => String(j.id) === String(id));
    return foundJob || null;
  } catch (error) {
    console.error('Error fetching job:', error);
    return null;
  }
}