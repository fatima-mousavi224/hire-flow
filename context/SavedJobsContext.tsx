'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface SavedJob {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  savedDate: string;
  deadline?: string;
  tags: string[];
  companyInitials: string;
  companyBg: string;
}

interface SavedJobsContextType {
  savedJobs: SavedJob[];
  toggleSaveJob: (job: SavedJob) => void;
  removeSavedJob: (id: string) => void;
  isJobSaved: (id: string) => boolean;
}

const SavedJobsContext = createContext<SavedJobsContextType | undefined>(undefined);

export function SavedJobsProvider({ children }: { children: React.ReactNode }) {
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>(() => {
    if (typeof window === 'undefined') {
      return [];
    }

    const localData = localStorage.getItem('hireflow_saved_jobs');
    if (!localData) {
      return [];
    }

    try {
      return JSON.parse(localData) as SavedJob[];
    } catch (error) {
      console.error('Failed to parse saved jobs from local storage:', error);
      return [];
    }
  });

  // Save changes to localStorage whenever savedJobs updates
  useEffect(() => {
    localStorage.setItem('hireflow_saved_jobs', JSON.stringify(savedJobs));
  }, [savedJobs]);

  const toggleSaveJob = (job: SavedJob) => {
    setSavedJobs((prev) => {
      const exists = prev.some((j) => j.id === job.id);
      if (exists) {
        return prev.filter((j) => j.id !== job.id);
      }
      return [...prev, { ...job, savedDate: 'Just now' }];
    });
  };

  const removeSavedJob = (id: string) => {
    setSavedJobs((prev) => prev.filter((j) => j.id !== id));
  };

  const isJobSaved = (id: string) => {
    return savedJobs.some((j) => j.id === id);
  };

  return (
    <SavedJobsContext.Provider
      value={{ savedJobs, toggleSaveJob, removeSavedJob, isJobSaved }}
    >
      {children}
    </SavedJobsContext.Provider>
  );
}

export function useSavedJobs() {
  const context = useContext(SavedJobsContext);
  if (!context) {
    throw new Error('useSavedJobs must be used within a SavedJobsProvider');
  }
  return context;
}