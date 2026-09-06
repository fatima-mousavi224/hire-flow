/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { Edit2, Trash2, ExternalLink, Award, X } from 'lucide-react';
import { ProfileData } from '@/types/profile';
import ProfileHeader from './ProfileHeader';
import EditModal from './EditModal';
import ProfileSectionCard from './ProfileSectionsCard';

export default function ProfileContainer({ initialProfile }: { initialProfile: ProfileData }) {
  const [profile, setProfile] = useState<ProfileData>(initialProfile);
  const [modal, setModal] = useState<{ isOpen: boolean; type: string; title: string; id?: string; data: Record<string, string> }>({
    isOpen: false,
    type: '',
    title: '',
    data: {},
  });

  const openModal = (type: string, title: string, data: Record<string, string> = {}, id?: string) => {
    setModal({ isOpen: true, type, title, data, id });
  };

  const handleSaveModal = (fields: Record<string, string>) => {
    switch (modal.type) {
      case 'header':
        setProfile((prev) => ({
          ...prev,
          name: fields.name,
          title: fields.title,
          location: fields.location,
          website: fields.website,
          badges: fields.badges ? fields.badges.split(',').map((b) => b.trim()) : [],
        }));
        break;
      case 'about':
        setProfile((prev) => ({ ...prev, about: fields.about }));
        break;
      case 'skill':
        setProfile((prev) => ({ ...prev, skills: [...prev.skills, fields.skill.trim()] }));
        break;
      case 'experience':
        if (modal.id) {
          setProfile((prev) => ({
            ...prev,
            experiences: prev.experiences.map((exp) => (exp.id === modal.id ? ({ ...exp, ...fields } as any) : exp)),
          }));
        } else {
          setProfile((prev) => ({
            ...prev,
            experiences: [...prev.experiences, { id: Date.now().toString(), skills: [], ...fields } as any],
          }));
        }
        break;
      case 'education':
        if (modal.id) {
          setProfile((prev) => ({
            ...prev,
            education: prev.education.map((edu) => (edu.id === modal.id ? ({ ...edu, ...fields } as any) : edu)),
          }));
        } else {
          setProfile((prev) => ({
            ...prev,
            education: [...prev.education, { id: Date.now().toString(), ...fields } as any],
          }));
        }
        break;
      case 'project':
        if (modal.id) {
          setProfile((prev) => ({
            ...prev,
            projects: prev.projects.map((proj) => (proj.id === modal.id ? ({ ...proj, ...fields } as any) : proj)),
          }));
        } else {
          setProfile((prev) => ({
            ...prev,
            projects: [...prev.projects, { id: Date.now().toString(), tags: [], ...fields } as any],
          }));
        }
        break;
      case 'certification':
        if (modal.id) {
          setProfile((prev) => ({
            ...prev,
            certifications: prev.certifications.map((cert) => (cert.id === modal.id ? ({ ...cert, ...fields } as any) : cert)),
          }));
        } else {
          setProfile((prev) => ({
            ...prev,
            certifications: [...prev.certifications, { id: Date.now().toString(), ...fields } as any],
          }));
        }
        break;
    }
  };

  return (
    <div className="max-w-4xl space-y-6 pb-12">
      <ProfileHeader
        profile={profile}
        onEdit={() => openModal('header', 'Edit Personal Info', { name: profile.name, title: profile.title, location: profile.location, website: profile.website, badges: profile.badges.join(', ') })}
        onUploadResume={(file) => setProfile((p) => ({ ...p, resumeFileName: file.name }))}
      />

      <ProfileSectionCard title="About" onEdit={() => openModal('about', 'Edit About', { about: profile.about })}>
        <p className="text-xs font-medium leading-relaxed text-slate-600">{profile.about}</p>
      </ProfileSectionCard>

      <ProfileSectionCard title="Skills" onAdd={() => openModal('skill', 'Add Skill')}>
        <div className="flex flex-wrap gap-2">
          {profile.skills.map((skill, i) => (
            <span key={i} className="flex items-center gap-1 rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">
              {skill}
              <button onClick={() => setProfile((p) => ({ ...p, skills: p.skills.filter((s) => s !== skill) }))} className="text-slate-400 hover:text-red-500 cursor-pointer">
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      </ProfileSectionCard>

      <ProfileSectionCard title="Experience" onAdd={() => openModal('experience', 'Add Experience')}>
        <div className="space-y-4 divide-y divide-slate-100">
          {profile.experiences.map((exp) => (
            <div key={exp.id} className="pt-3 first:pt-0 flex justify-between items-start">
              <div>
                <h4 className="text-xs font-bold text-slate-900">{exp.role}</h4>
                <p className="text-xs font-semibold text-[#5243E0]">{exp.company}</p>
                <p className="text-[11px] text-slate-400">{exp.period} · {exp.location}</p>
                <p className="text-xs text-slate-600 mt-1">{exp.description}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => openModal('experience', 'Edit Experience', exp as any, exp.id)} className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"><Edit2 className="h-3.5 w-3.5" /></button>
                <button onClick={() => setProfile((p) => ({ ...p, experiences: p.experiences.filter((e) => e.id !== exp.id) }))} className="p-1 text-slate-400 hover:text-red-500 cursor-pointer"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
      </ProfileSectionCard>

      <ProfileSectionCard title="Education" onAdd={() => openModal('education', 'Add Education')}>
        {profile.education.map((edu) => (
          <div key={edu.id} className="flex justify-between items-start py-1">
            <div>
              <h4 className="text-xs font-bold text-slate-900">{edu.degree}</h4>
              <p className="text-xs text-slate-500">{edu.institution}</p>
              <p className="text-[11px] text-slate-400">{edu.period} · {edu.gpa}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => openModal('education', 'Edit Education', edu as any, edu.id)} className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"><Edit2 className="h-3.5 w-3.5" /></button>
              <button onClick={() => setProfile((p) => ({ ...p, education: p.education.filter((e) => e.id !== edu.id) }))} className="p-1 text-slate-400 hover:text-red-500 cursor-pointer"><Trash2 className="h-3.5 w-3.5" /></button>
            </div>
          </div>
        ))}
      </ProfileSectionCard>

      <ProfileSectionCard title="Projects" onAdd={() => openModal('project', 'Add Project')}>
        {profile.projects.map((proj) => (
          <div key={proj.id} className="flex justify-between items-start py-1">
            <div>
              <h4 className="text-xs font-bold text-slate-900">{proj.title}</h4>
              <p className="text-[11px] text-slate-400 flex items-center gap-1"><ExternalLink className="h-3 w-3" />{proj.link}</p>
              <p className="text-xs text-slate-600 mt-1">{proj.description}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => openModal('project', 'Edit Project', proj as any, proj.id)} className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"><Edit2 className="h-3.5 w-3.5" /></button>
              <button onClick={() => setProfile((p) => ({ ...p, projects: p.projects.filter((item) => item.id !== proj.id) }))} className="p-1 text-slate-400 hover:text-red-500 cursor-pointer"><Trash2 className="h-3.5 w-3.5" /></button>
            </div>
          </div>
        ))}
      </ProfileSectionCard>

      <ProfileSectionCard title="Certifications" onAdd={() => openModal('certification', 'Add Certification')}>
        {profile.certifications.map((cert) => (
          <div key={cert.id} className="flex justify-between items-center py-1">
            <div className="flex items-center gap-3">
              <Award className="h-4 w-4 text-amber-600" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">{cert.name}</h4>
                <p className="text-[11px] text-slate-400">{cert.issuer} · {cert.date}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => openModal('certification', 'Edit Certification', cert as any, cert.id)} className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"><Edit2 className="h-3.5 w-3.5" /></button>
              <button onClick={() => setProfile((p) => ({ ...p, certifications: p.certifications.filter((item) => item.id !== cert.id) }))} className="p-1 text-slate-400 hover:text-red-500 cursor-pointer"><Trash2 className="h-3.5 w-3.5" /></button>
            </div>
          </div>
        ))}
      </ProfileSectionCard>

      <EditModal
        isOpen={modal.isOpen}
        type={modal.type}
        title={modal.title}
        initialData={modal.data}
        onClose={() => setModal({ isOpen: false, type: '', title: '', data: {} })}
        onSave={handleSaveModal}
      />
    </div>
  );
}