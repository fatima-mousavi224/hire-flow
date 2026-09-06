export type SettingsTab = 'account' | 'profile' | 'password' | 'notifications' | 'privacy';

export interface AccountSettings {
  fullName: string;
  email: string;
  phoneNumber: string;
  accountType: string;
}

export interface ProfileSettings {
  headline: string;
  location: string;
  jobSearchStatus: string;
  preferredJobTypes: {
    fullTime: boolean;
    partTime: boolean;
    contract: boolean;
    freelance: boolean;
    internship: boolean;
  };
}

export interface NotificationSettings {
  newJobMatches: boolean;
  applicationUpdates: boolean;
  messages: boolean;
  weeklyDigest: boolean;
  profileViews: boolean;
  interviewReminders: boolean;
}

export type ProfileVisibility = 'public' | 'recruiters' | 'private';