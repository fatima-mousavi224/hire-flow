/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { db } from '@/prisma/db';
import { revalidatePath } from 'next/cache';

export type JobType = 'FULL_TIME' | 'PART_TIME' | 'INTERNSHIP' | 'CONTRACT';
export type WorkplaceType = 'REMOTE' | 'HYBRID' | 'ON_SITE';

const client = db as any;

export async function createJob(formData: {
  title: string;
  companyId: string;
  location: string;
  salary?: string;
  jobType: JobType;
  workplaceType: WorkplaceType;
  tags?: string[];
  dueDate?: string;
}) {
  try {
    // Use plural client.jobs
    const newJob = await client.jobs.create({
      data: {
        title: formData.title,
        companyId: formData.companyId,
        location: formData.location,
        salary: formData.salary,
        jobType: formData.jobType,
        workplaceType: formData.workplaceType,
        tags: formData.tags || [],
        dueDate: formData.dueDate,
      },
    });

    revalidatePath('/jobs');
    return { success: true, data: newJob };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to create job' };
  }
}

export async function updateJob(
  id: string,
  formData: {
    title?: string;
    location?: string;
    salary?: string;
    jobType?: JobType;
    workplaceType?: WorkplaceType;
    tags?: string[];
    dueDate?: string;
  }
) {
  try {
    // Use plural client.jobs
    const updatedJob = await client.jobs.update({
      where: { id },
      data: formData,
    });

    revalidatePath('/jobs');
    return { success: true, data: updatedJob };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to update job' };
  }
}