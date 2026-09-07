/* eslint-disable @typescript-eslint/no-explicit-any */

import JobsTable from "@/components/recruiter-dashboard/jop/JobsTable";
import { db } from "@/prisma/db";

export default async function JobsPage() {
  const client = db as any;

  // 1. Fetch jobs
  const dbJobs = await client.orm.public.Job
    .orderBy((j: any) => j.createdAt.desc())
    .all();

  // 2. Fetch companies
  const companies = await client.orm.public.Company
    .select('id', 'name')
    .all();

  // 3. Fetch applications for application counts
  const applications = await client.orm.public.Application.all();

  const appCountMap: Record<string, number> = {};
  applications.forEach((app: any) => {
    if (app?.jobId) {
      appCountMap[app.jobId] = (appCountMap[app.jobId] || 0) + 1;
    }
  });

  const companyMap = new Map(companies.map((c: any) => [c.id, c.name]));

  // Safe formatting helper to prevent `valueOf` type coercion errors
  const formatDate = (dateVal: any) => {
    if (!dateVal) return 'N/A';
    const rawString = typeof dateVal === 'object' && dateVal !== null
      ? dateVal.toString()
      : String(dateVal);
    const parsedDate = new Date(rawString);
    return isNaN(parsedDate.getTime()) ? 'N/A' : parsedDate.toLocaleDateString();
  };

  // 4. Format data for JobsTable UI
  const formattedJobs = dbJobs.map((job: any) => ({
    id: job.id,
    title: job.title,
    companyId: job.companyId,
    companyName: companyMap.get(job.companyId) || 'N/A',
    location: job.location,
    salary: job.salary || 'N/A',
    jobType: job.jobType,
    workplaceType: job.workplaceType,
    tags: job.tags || [],
    dueDate: formatDate(job.dueDate),
    applicationsCount: appCountMap[job.id] || 0,
    createdAt: formatDate(job.createdAt),
  }));

  return <JobsTable initialJobs={formattedJobs} companies={companies} />;
}