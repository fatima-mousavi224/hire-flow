import { Edit2, Plus, ExternalLink, Award } from 'lucide-react';
import { ProfileData } from '@/types/profile';
import { updateAboutSection, addSkillAction } from '@/app/(dashboards)/(candidate)/profile/actions';

export default function ProfileSections({ profile }: { profile: ProfileData }) {
  return (
    <div className="space-y-6">
      {/* About Section */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">About</h3>
          <form action={updateAboutSection} className="flex gap-2">
            <button type="submit" className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer">
              <Edit2 className="h-3.5 w-3.5" />
              Edit
            </button>
          </form>
        </div>
        <p className="text-xs font-medium leading-relaxed text-slate-600">{profile.about}</p>
      </div>

      {/* Skills Section */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Skills</h3>
          <form action={addSkillAction} className="flex items-center gap-2">
            <input
              type="text"
              name="skill"
              placeholder="Add skill..."
              className="rounded-lg border border-slate-200 px-2 py-1 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <button type="submit" className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-indigo-600 cursor-pointer">
              <Plus className="h-3.5 w-3.5" />
              Add
            </button>
          </form>
        </div>
        <div className="flex flex-wrap gap-2">
          {profile.skills.map((skill, idx) => (
            <span
              key={idx}
              className="rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Experience Section */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Experience</h3>
          <button className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer">
            <Plus className="h-3.5 w-3.5" />
            Add
          </button>
        </div>

        <div className="space-y-6 divide-y divide-slate-100">
          {profile.experiences.map((exp) => (
            <div key={exp.id} className="pt-4 first:pt-0 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{exp.role}</h4>
                  <p className="text-xs font-semibold text-indigo-600">{exp.company}</p>
                </div>
                <button className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer">
                  <Edit2 className="h-3.5 w-3.5" />
                </button>
              </div>
              <p className="text-[11px] font-medium text-slate-400">
                {exp.period} · {exp.location}
              </p>
              <p className="text-xs font-medium text-slate-600 leading-relaxed">{exp.description}</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {exp.skills.map((sk, i) => (
                  <span key={i} className="rounded-md bg-slate-50 border border-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education Section */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Education</h3>
          <button className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer">
            <Plus className="h-3.5 w-3.5" />
            Add
          </button>
        </div>

        {profile.education.map((edu) => (
          <div key={edu.id} className="flex items-start justify-between">
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-slate-900">{edu.degree}</h4>
              <p className="text-xs font-semibold text-slate-500">{edu.institution}</p>
              <p className="text-[11px] font-medium text-slate-400">
                {edu.period} · {edu.gpa}
              </p>
            </div>
            <button className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer">
              <Edit2 className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Projects Section */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Projects</h3>
          <button className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer">
            <Plus className="h-3.5 w-3.5" />
            Add
          </button>
        </div>

        <div className="space-y-4">
          {profile.projects.map((project) => (
            <div key={project.id} className="space-y-1.5 border-b border-slate-50 pb-4 last:border-0 last:pb-0">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900">{project.title}</h4>
                <button className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer">
                  <Edit2 className="h-3.5 w-3.5" />
                </button>
              </div>
              <p className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                <ExternalLink className="h-3 w-3" />
                {project.link}
              </p>
              <p className="text-xs font-medium text-slate-600">{project.description}</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.tags.map((tag, i) => (
                  <span key={i} className="rounded-md bg-indigo-50/50 px-2 py-0.5 text-[10px] font-semibold text-[#5243E0]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications Section */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Certifications</h3>
          <button className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer">
            <Plus className="h-3.5 w-3.5" />
            Add
          </button>
        </div>

        <div className="space-y-3">
          {profile.certifications.map((cert) => (
            <div key={cert.id} className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 border border-amber-200/60">
                <Award className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-slate-900 truncate">{cert.name}</h4>
                <p className="text-[11px] font-medium text-slate-400">
                  {cert.issuer} · {cert.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}