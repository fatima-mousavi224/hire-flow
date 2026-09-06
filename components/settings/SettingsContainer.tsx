'use client';

import { useState } from 'react';
import { User, CheckCircle2 } from 'lucide-react';
import {
  SettingsTab,
  AccountSettings,
  ProfileSettings,
  NotificationSettings,
  ProfileVisibility,
} from '@/types/settings';

export default function SettingsContainer() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('account');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form States
  const [account, setAccount] = useState<AccountSettings>({
    fullName: 'Fatima Mousavi',
    email: 'fatima@gmail.com',
    phoneNumber: '+1 (555) 012-3456',
    accountType: 'Job Seeker',
  });

  const [profile, setProfile] = useState<ProfileSettings>({
    headline: 'Frontend Developer | React · TypeScript · Next.js',
    location: 'San Francisco, CA',
    jobSearchStatus: 'Actively looking',
    preferredJobTypes: {
      fullTime: true,
      partTime: false,
      contract: true,
      freelance: false,
      internship: false,
    },
  });

  const [password, setPassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    newJobMatches: true,
    applicationUpdates: true,
    messages: false,
    weeklyDigest: false,
    profileViews: true,
    interviewReminders: true,
  });

  const [privacy, setPrivacy] = useState<ProfileVisibility>('public');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const tabs: { id: SettingsTab; label: string }[] = [
    { id: 'account', label: 'Account' },
    { id: 'profile', label: 'Profile' },
    { id: 'password', label: 'Password' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'privacy', label: 'Privacy' },
  ];

  return (
    <div className="max-w-4xl space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900">Settings</h1>
        <p className="mt-1 text-xs font-medium text-slate-500">
          Manage your account preferences
        </p>
      </div>

      {/* Tabs Header */}
      <div className="flex border-b border-slate-200 text-xs font-semibold">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`border-b-2 px-5 py-2.5 transition-colors cursor-pointer ${
              activeTab === tab.id
                ? 'border-[#5243E0] font-bold text-[#5243E0]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs">
        {/* 1. Account Tab */}
        {activeTab === 'account' && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              showToast('Account information updated successfully.');
            }}
            className="space-y-5"
          >
            <h2 className="text-sm font-bold text-slate-900">Account Information</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700">Full name</label>
                <input
                  type="text"
                  value={account.fullName}
                  onChange={(e) => setAccount({ ...account, fullName: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-medium text-slate-800 outline-none focus:border-[#5243E0]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700">Email address</label>
                <input
                  type="email"
                  value={account.email}
                  onChange={(e) => setAccount({ ...account, email: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-medium text-slate-800 outline-none focus:border-[#5243E0]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700">Phone number</label>
                <input
                  type="tel"
                  value={account.phoneNumber}
                  onChange={(e) => setAccount({ ...account, phoneNumber: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-medium text-slate-800 outline-none focus:border-[#5243E0]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700">Account type</label>
                <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-xl border border-indigo-100 bg-indigo-50/50 px-3.5 py-2 text-xs font-bold text-[#5243E0]">
                  <User className="h-3.5 w-3.5" />
                  {account.accountType}
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="rounded-xl bg-[#5243E0] px-5 py-2.5 text-xs font-bold text-white shadow-2xs hover:opacity-90 cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}

        {/* 2. Profile Tab */}
        {activeTab === 'profile' && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              showToast('Profile settings saved successfully.');
            }}
            className="space-y-5"
          >
            <h2 className="text-sm font-bold text-slate-900">Profile Settings</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700">Professional headline</label>
                <input
                  type="text"
                  value={profile.headline}
                  onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-medium text-slate-800 outline-none focus:border-[#5243E0]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700">Current location</label>
                <input
                  type="text"
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-medium text-slate-800 outline-none focus:border-[#5243E0]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700">Job search status</label>
                <select
                  value={profile.jobSearchStatus}
                  onChange={(e) => setProfile({ ...profile, jobSearchStatus: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-medium text-slate-800 outline-none focus:border-[#5243E0]"
                >
                  <option value="Actively looking">Actively looking</option>
                  <option value="Open to offers">Open to offers</option>
                  <option value="Not looking">Not looking</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700">Preferred job types</label>
                <div className="mt-2.5 flex flex-wrap gap-4 text-xs font-medium text-slate-700">
                  {Object.entries({
                    fullTime: 'Full-time',
                    partTime: 'Part-time',
                    contract: 'Contract',
                    freelance: 'Freelance',
                    internship: 'Internship',
                  }).map(([key, label]) => (
                    <label key={key} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={profile.preferredJobTypes[key as keyof typeof profile.preferredJobTypes]}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            preferredJobTypes: {
                              ...profile.preferredJobTypes,
                              [key]: e.target.checked,
                            },
                          })
                        }
                        className="h-4 w-4 rounded-sm border-slate-300 text-[#5243E0] focus:ring-[#5243E0]"
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="rounded-xl bg-[#5243E0] px-5 py-2.5 text-xs font-bold text-white shadow-2xs hover:opacity-90 cursor-pointer"
              >
                Save Profile Settings
              </button>
            </div>
          </form>
        )}

        {/* 3. Password Tab */}
        {activeTab === 'password' && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (password.newPassword !== password.confirmPassword) {
                alert('New passwords do not match');
                return;
              }
              showToast('Password updated successfully.');
              setPassword({ currentPassword: '', newPassword: '', confirmPassword: '' });
            }}
            className="space-y-5"
          >
            <h2 className="text-sm font-bold text-slate-900">Change Password</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700">Current password</label>
                <input
                  type="password"
                  value={password.currentPassword}
                  onChange={(e) => setPassword({ ...password, currentPassword: e.target.value })}
                  placeholder="••••••••"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-medium text-slate-800 outline-none focus:border-[#5243E0]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700">New password</label>
                <input
                  type="password"
                  value={password.newPassword}
                  onChange={(e) => setPassword({ ...password, newPassword: e.target.value })}
                  placeholder="At least 8 characters"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-medium text-slate-800 outline-none focus:border-[#5243E0]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700">Confirm new password</label>
                <input
                  type="password"
                  value={password.confirmPassword}
                  onChange={(e) => setPassword({ ...password, confirmPassword: e.target.value })}
                  placeholder="Repeat new password"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-medium text-slate-800 outline-none focus:border-[#5243E0]"
                  required
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="rounded-xl bg-[#5243E0] px-5 py-2.5 text-xs font-bold text-white shadow-2xs hover:opacity-90 cursor-pointer"
              >
                Update Password
              </button>
            </div>
          </form>
        )}

        {/* 4. Notifications Tab */}
        {activeTab === 'notifications' && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              showToast('Notification preferences saved.');
            }}
            className="space-y-5"
          >
            <h2 className="text-sm font-bold text-slate-900">Notification Preferences</h2>

            <div className="divide-y divide-slate-100">
              {[
                { key: 'newJobMatches', title: 'New job matches', desc: 'Get notified when new jobs match your profile' },
                { key: 'applicationUpdates', title: 'Application updates', desc: 'Status changes on your applications' },
                { key: 'messages', title: 'Messages', desc: 'When you receive a new message from a recruiter' },
                { key: 'weeklyDigest', title: 'Weekly digest', desc: 'A weekly summary of job opportunities' },
                { key: 'profileViews', title: 'Profile views', desc: 'When a recruiter views your profile' },
                { key: 'interviewReminders', title: 'Interview reminders', desc: 'Reminders for upcoming interviews' },
              ].map(({ key, title, desc }) => (
                <div key={key} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">{title}</h3>
                    <p className="text-[11px] text-slate-400">{desc}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setNotifications({
                        ...notifications,
                        [key]: !notifications[key as keyof NotificationSettings],
                      })
                    }
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out ${
                      notifications[key as keyof NotificationSettings] ? 'bg-[#5243E0]' : 'bg-slate-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ease-in-out translate-y-0.5 ${
                        notifications[key as keyof NotificationSettings] ? 'translate-x-5.5' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="rounded-xl bg-[#5243E0] px-5 py-2.5 text-xs font-bold text-white shadow-2xs hover:opacity-90 cursor-pointer"
              >
                Save Preferences
              </button>
            </div>
          </form>
        )}

        {/* 5. Privacy Tab */}
        {activeTab === 'privacy' && (
          <div className="space-y-6">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                showToast('Privacy settings saved.');
              }}
              className="space-y-5"
            >
              <h2 className="text-sm font-bold text-slate-900">Privacy Settings</h2>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-2">Profile visibility</label>
                <div className="space-y-2.5">
                  {[
                    { val: 'public', label: 'Public – visible to all recruiters' },
                    { val: 'recruiters', label: 'Recruiters only – requires login' },
                    { val: 'private', label: 'Private – hidden from search' },
                  ].map(({ val, label }) => (
                    <label key={val} className="flex items-center gap-2.5 text-xs font-medium text-slate-700 cursor-pointer">
                      <input
                        type="radio"
                        name="privacy"
                        value={val}
                        checked={privacy === val}
                        onChange={() => setPrivacy(val as ProfileVisibility)}
                        className="h-4 w-4 text-[#5243E0] focus:ring-[#5243E0]"
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="rounded-xl bg-[#5243E0] px-5 py-2.5 text-xs font-bold text-white shadow-2xs hover:opacity-90 cursor-pointer"
                >
                  Save Privacy Settings
                </button>
              </div>
            </form>

            <div className="border-t border-slate-100 pt-6">
              <h3 className="text-xs font-bold text-red-600">Danger Zone</h3>
              <p className="mt-1 text-xs text-slate-500">
                Once you delete your account, there is no going back. All your data will be permanently removed.
              </p>
              <button
                type="button"
                onClick={() => {
                  if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                    alert('Account deletion request initiated.');
                  }
                }}
                className="mt-3 rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white hover:bg-red-700 cursor-pointer"
              >
                Delete Account
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-xs font-medium text-white shadow-xl">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          {toastMessage}
        </div>
      )}
    </div>
  );
}