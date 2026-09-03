/* eslint-disable @typescript-eslint/no-explicit-any */
// app/jobs/[id]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Briefcase,
  CheckCircle2,
  Clock,
} from "lucide-react";

import { getJobById } from "@/lib/jobs";
import { JobHeaderActions } from "@/components/jobs/JobHeaderActions";
import { CompanyWidget } from "@/components/jobs/CompanyWidget";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function JobDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const rawJob = await getJobById(id);

  if (!rawJob) {
    notFound();
  }

  // Cast job to access optional/extended fields safely
  const job = rawJob as Record<string, any>;

  // Safely extract relational company fields
  const companyObj =
    typeof job.company === "object" && job.company !== null
      ? (job.company as Record<string, any>)
      : {};

  const companyName =
    typeof companyObj.name === "string" ? companyObj.name : "Company";
  const companyLogoBg =
    typeof companyObj.bgColor === "string"
      ? companyObj.bgColor
      : "bg-indigo-600";

  // Format dynamic arrays
  const responsibilities: string[] = Array.isArray(job.responsibilities)
    ? job.responsibilities.map((r: unknown) => String(r))
    : [
        "Build and maintain high-quality React applications",
        "Collaborate with designers to implement pixel-perfect UIs",
        "Optimize application performance",
        "Write clean, maintainable, and well-tested code",
      ];

  const requirements: string[] = Array.isArray(job.requirements)
    ? job.requirements.map((r: unknown) => String(r))
    : [
        "3+ years of experience with React and TypeScript",
        "Strong proficiency in CSS and modern styling solutions",
        "Experience with REST APIs and GraphQL",
      ];

  const tags: string[] = Array.isArray(job.tags)
    ? job.tags.map((t: unknown) => String(t))
    : [];

  const experienceLevel =
    typeof job.experienceLevel === "string" ? job.experienceLevel : "Mid level";
  const deadline =
    typeof job.deadline === "string" ? job.deadline : "2026-02-15";

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16 pt-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Link */}
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to jobs
        </Link>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Main Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Hero Card */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs space-y-5">
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-xl font-bold text-white ${companyLogoBg}`}
                >
                  {companyName.charAt(0)}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-slate-500">
                      {companyName}
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
                  </div>
                  <h1 className="text-2xl font-bold text-slate-900">
                    {job.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="h-3.5 w-3.5 text-slate-400" />
                      {job.jobType
                        ? String(job.jobType).replace("_", " ")
                        : "Full-time"}
                    </span>
                    <span className="font-semibold text-slate-900">
                      {job.salary || "$120k – $160k"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-[#5243E0]">
                      {job.workplaceType
                        ? String(job.workplaceType).replace("_", " ")
                        : "Hybrid"}
                    </span>
                    {experienceLevel && (
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                        {experienceLevel}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Dynamic Interactive Actions */}
              <JobHeaderActions jobId={String(job.id)} />
            </div>

            {/* Role Description */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs space-y-3">
              <h3 className="text-sm font-bold text-slate-900">
                About this role
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {job.description ||
                  "We are looking for a skilled candidate to join our team and make an impact. You will collaborate across teams to design, build, and deliver high-quality solutions."}
              </p>
            </div>

            {/* Responsibilities List */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900">
                Responsibilities
              </h3>
              <ul className="space-y-3 text-xs text-slate-600">
                {responsibilities.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-indigo-600 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements List */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Requirements</h3>
              <ul className="space-y-3 text-xs text-slate-600">
                {requirements.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Skill Tags */}
            {tags.length > 0 && (
              <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs space-y-3">
                <h3 className="text-sm font-bold text-slate-900">
                  Required Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((skill: string) => (
                    <span
                      key={skill}
                      className="rounded-lg bg-indigo-50/70 px-3 py-1.5 text-xs font-semibold text-[#5243E0]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Application Deadline Card */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 flex items-center gap-3 shadow-2xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600 shrink-0">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-rose-900">
                  Application deadline
                </p>
                <p className="text-xs font-medium text-rose-600">{deadline}</p>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6 lg:sticky lg:top-6">
            <CompanyWidget
              company={{
                name: companyName,
                bgColor: companyLogoBg,
                industry:
                  typeof companyObj.industry === "string"
                    ? companyObj.industry
                    : undefined,
                size:
                  typeof companyObj.size === "string"
                    ? companyObj.size
                    : undefined,
                location:
                  typeof companyObj.location === "string"
                    ? companyObj.location
                    : undefined,
                websiteUrl:
                  typeof companyObj.websiteUrl === "string"
                    ? companyObj.websiteUrl
                    : undefined,
              }}
              overview={{
                postedAgo: "2 days ago",
                employmentType: job.jobType
                  ? String(job.jobType).replace("_", " ")
                  : "Full-time",
                workplace: job.workplaceType
                  ? String(job.workplaceType).replace("_", " ")
                  : "Hybrid",
                experienceLevel: experienceLevel,
                applicantsCount: 87,
                viewsCount: 1240,
              }}
            />
          </div>
        </div>

        {/* Similar Opportunities Section */}
        <div className="pt-4 space-y-4">
          <h3 className="text-base font-bold text-slate-900">
            Similar opportunities
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                company: "Vercel",
                logoBg: "bg-slate-900",
                title: "React Developer",
                tags: ["Full-time", "Remote"],
                salary: "$150k – $200k",
              },
              {
                company: "Shopify",
                logoBg: "bg-emerald-600",
                title: "Next.js Intern",
                tags: ["Internship", "Hybrid"],
                salary: "$35/hr",
              },
              {
                company: "PlanetScale",
                logoBg: "bg-emerald-500",
                title: "Backend Engineer",
                tags: ["Full-time", "Remote"],
                salary: "$160k – $220k",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold text-white ${item.logoBg}`}
                  >
                    {item.company.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-slate-400">
                      {item.company}
                    </p>
                    <h4 className="text-xs font-bold text-slate-900">
                      {item.title}
                    </h4>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {item.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-slate-100/80 px-2.5 py-0.5 text-[10px] font-medium text-slate-600"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <p className="text-xs font-bold text-slate-900">
                  {item.salary}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
