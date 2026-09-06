export interface ResumeFile {
  id: string;
  name: string;
  size: string;
  updatedAt: string;
  isDefault: boolean;
  file?: File;
  url?: string;
}