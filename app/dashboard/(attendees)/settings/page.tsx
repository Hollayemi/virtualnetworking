'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Space_Grotesk, Inter, IBM_Plex_Mono } from 'next/font/google';
import { Check, Building2, UserCircle, AlertTriangle } from 'lucide-react';
import { Pill } from '@/app/dashboard/components/ui/badge';
import { Button } from '@/app/dashboard/components/ui/button';
import { TextInput, PasswordInput } from '@/app/dashboard/components/ui/input';
import { Switch } from '@/app/dashboard/components/ui/switch';
import { SectionCard } from '@/app/dashboard/components/ui';
import { useRole } from '@/lib/role-context';
import {
  useGetSettingsQuery,
  useUpdateAccountMutation,
  useUpdateNotificationsMutation,
  useEnableOrganizerRoleMutation,
  useSwitchActiveRoleMutation,
  useDeleteAccountMutation,
} from '@/redux/slices';
import { toast } from 'sonner';

const display = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-display' });
const body = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

export default function SettingsPage() {
  const { role, setRole } = useRole();
  const { data: settingsData, isLoading: settingsLoading } = useGetSettingsQuery();
  const [updateAccount, { isLoading: isUpdatingAccount }] = useUpdateAccountMutation();
  const [updateNotifications, { isLoading: isUpdatingNotifs }] = useUpdateNotificationsMutation();
  const [enableOrganizer, { isLoading: isEnablingOrganizer }] = useEnableOrganizerRoleMutation();
  const [switchRole, { isLoading: isSwitchingRole }] = useSwitchActiveRoleMutation();
  const [deleteAccount, { isLoading: isDeleting }] = useDeleteAccountMutation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [saved, setSaved] = useState(false);

  const [notifications, setNotifications] = useState({
    connectionRequests: true,
    messages: true,
    meetingReminders: true,
    marketingEmails: false,
  });

  const [organiserEnabled, setOrganiserEnabled] = useState(false);
  const [enablingOrganiser, setEnablingOrganiser] = useState(false);
  const [orgName, setOrgName] = useState('');

  useEffect(() => {
    if (settingsData?.data) {
      const s = settingsData.data;
      setName(s.name || '');
      setEmail(s.email || '');
      setPhone(s.phone || '');
      setNotifications({
        connectionRequests: s.notifications?.connectionRequests ?? true,
        messages: s.notifications?.messages ?? true,
        meetingReminders: s.notifications?.meetingReminders ?? true,
        marketingEmails: s.notifications?.marketingEmails ?? false,
      });
      setOrganiserEnabled(s.roles?.organizer || false);
    }
  }, [settingsData]);

  const toggleNotification = (key: keyof typeof notifications) => {
    const updated = { ...notifications, [key]: !notifications[key] };
    setNotifications(updated);
    updateNotifications(updated);
  };

  const saveAccount = async () => {
    try {
      await updateAccount({ name, email, phone, newPassword: newPassword || undefined }).unwrap();
      setSaved(true);
      toast.success('Account updated');
      setTimeout(() => setSaved(false), 2400);
    } catch (error) {
      toast.error('Failed to update account');
    }
  };

  const enableOrganiserRole = async () => {
    if (!orgName.trim()) {
      toast.error('Please enter an organisation name');
      return;
    }
    try {
      await enableOrganizer({ organisationName: orgName }).unwrap();
      setOrganiserEnabled(true);
      setEnablingOrganiser(false);
      setRole('organizer');
      toast.success('Organizer role enabled!');
    } catch (error) {
      toast.error('Failed to enable organizer role');
    }
  };

  const handleSwitchRole = async () => {
    const newRole = role === 'attendee' ? 'organizer' : 'attendee';
    try {
      await switchRole({ role: newRole }).unwrap();
      setRole(newRole);
      toast.success(`Switched to ${newRole} view`);
    } catch (error) {
      toast.error('Failed to switch role');
    }
  };

  const handleDeleteAccount = async () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        await deleteAccount({ confirm: name }).unwrap();
        toast.success('Account deletion scheduled');
        // Redirect to logout or home
      } catch (error) {
        toast.error('Failed to delete account');
      }
    }
  };

  if (settingsLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#639781] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className={`${display.variable} ${body.variable} ${mono.variable} flex flex-col gap-6 text-[#EAF2ED]`} style={{ fontFamily: 'var(--font-body)' }}>
      <div>
        <h2 className="text-[1.5rem] font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
          Settings
        </h2>
        <p className="mt-1 text-[13.5px] text-[#92A79C]">Manage your account, notifications, and roles.</p>
      </div>

      <SectionCard title="Account">
        <div className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextInput id="settings-name" label="Full name" value={name} onChange={(e) => setName(e.target.value)} />
            <TextInput id="settings-email" label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <TextInput id="settings-phone" label="Phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} optional />
          <PasswordInput
            id="settings-password"
            label="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            hint="Leave blank to keep your current password."
          />
          <div className="flex items-center gap-3">
            <Button onClick={saveAccount} disabled={isUpdatingAccount} loading={isUpdatingAccount}>
              Save changes
            </Button>
            <AnimatePresence>
              {saved && (
                <motion.span
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-1.5 text-[13px] font-medium text-[#8FB8A4]"
                >
                  <Check className="h-4 w-4" />
                  Saved
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Notifications">
        <div className="flex flex-col divide-y divide-white/[0.06]">
          <NotificationRow
            label="Connection requests"
            hint="Someone sends you a request or accepts yours"
            checked={notifications.connectionRequests}
            onChange={() => toggleNotification('connectionRequests')}
          />
          <NotificationRow
            label="Messages"
            hint="New messages from your connections"
            checked={notifications.messages}
            onChange={() => toggleNotification('messages')}
          />
          <NotificationRow
            label="Meeting reminders"
            hint="15 minutes before a booked meeting"
            checked={notifications.meetingReminders}
            onChange={() => toggleNotification('meetingReminders')}
          />
          <NotificationRow
            label="Marketing emails"
            hint="Product updates and event recommendations"
            checked={notifications.marketingEmails}
            onChange={() => toggleNotification('marketingEmails')}
          />
        </div>
      </SectionCard>

      <SectionCard title="Roles">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#639781]/10 text-[#8FB8A4]">
                <UserCircle className="h-[18px] w-[18px]" />
              </span>
              <div>
                <p className="text-[13.5px] font-medium text-[#EAF2ED]">Attendee</p>
                <p className="text-[12px] text-[#7C8F85]">Active on every account by default</p>
              </div>
            </div>
            <Pill tone="sage">Enabled</Pill>
          </div>

          <div className="flex flex-col gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#D9B26B]/10 text-[#D9B26B]">
                <Building2 className="h-[18px] w-[18px]" />
              </span>
              <div>
                <p className="text-[13.5px] font-medium text-[#EAF2ED]">Organiser</p>
                <p className="text-[12px] text-[#7C8F85]">Run events and manage attendees</p>
              </div>
            </div>
            {organiserEnabled ? (
              <Pill tone="gold">Enabled</Pill>
            ) : (
              <Button variant="secondary" onClick={() => setEnablingOrganiser((v) => !v)} disabled={isEnablingOrganizer}>
                Enable organiser role
              </Button>
            )}
          </div>

          <AnimatePresence>
            {enablingOrganiser && !organiserEnabled && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="rounded-xl border border-[#D9B26B]/20 bg-[#151009]/40 p-4">
                  <TextInput
                    id="org-name"
                    label="Organisation name"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    placeholder="Acme Conferences"
                  />
                  <Button accent="#D9B26B" className="mt-3 text-[#0A100D]" onClick={enableOrganiserRole} loading={isEnablingOrganizer}>
                    Confirm and switch to Organiser
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-3">
            <p className="text-[12px] text-[#5F736A]">
              You're currently viewing the dashboard as <span className="text-[#8FB8A4]">{role === 'attendee' ? 'Attendee' : 'Organiser'}</span>
            </p>
            <Button variant="secondary" onClick={handleSwitchRole} disabled={isSwitchingRole} loading={isSwitchingRole}>
              Switch to {role === 'attendee' ? 'Organiser' : 'Attendee'}
            </Button>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Danger zone">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#D9756B]/10 text-[#E0A093]">
              <AlertTriangle className="h-[18px] w-[18px]" />
            </span>
            <div>
              <p className="text-[13.5px] font-medium text-[#EAF2ED]">Delete account</p>
              <p className="text-[12px] text-[#7C8F85]">This permanently removes your profile, connections, and credit history.</p>
            </div>
          </div>
          <Button variant="danger" onClick={handleDeleteAccount} disabled={isDeleting} loading={isDeleting}>
            Delete account
          </Button>
        </div>
      </SectionCard>
    </div>
  );
}

function NotificationRow({ label, hint, checked, onChange }: { label: string; hint: string; checked: boolean; onChange: () => void }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0">
      <div>
        <p className="text-[13.5px] font-medium text-[#EAF2ED]">{label}</p>
        <p className="text-[12px] text-[#7C8F85]">{hint}</p>
      </div>
      <Switch checked={checked} onChange={onChange} />
    </div>
  );
}