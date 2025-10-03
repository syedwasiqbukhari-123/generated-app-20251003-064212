import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Toaster, toast } from 'sonner';
import { PlusCircle } from 'lucide-react';interface BadgeProps {children?: React.ReactNode;className?: string;style?: React.CSSProperties;[key: string]: unknown;}interface BadgeProps {children?: React.ReactNode;className?: string;style?: React.CSSProperties;[key: string]: unknown;}interface BadgeProps {children?: React.ReactNode;className?: string;style?: React.CSSProperties;[key: string]: unknown;}interface BadgeProps {children?: React.ReactNode;className?: string;style?: React.CSSProperties;[key: string]: unknown;}
export const SettingsPage: React.FC = () => {
  const [orgName, setOrgName] = useState("Zenith Inc.");
  const [signature, setSignature] = useState("Best, The Zenith Team");
  const [calendarUrl, setCalendarUrl] = useState("https://cal.com/zenith");
  const handleSaveChanges = (section: string) => {
    toast.success(`${section} settings saved successfully!`);
  };
  return (
    <div className="space-y-8">
      <Toaster richColors />
      <h1 className="text-4xl font-bold tracking-tight">Settings</h1>
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="profile">Org Profile</TabsTrigger>
          <TabsTrigger value="rules">Rules</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="team">Team & Roles</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Organization Profile</CardTitle>
              <CardDescription>Update your company's details and settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1"><Label htmlFor="org-name">Organization Name</Label><Input id="org-name" value={orgName} onChange={(e) => setOrgName(e.target.value)} /></div>
              <div className="space-y-1"><Label htmlFor="signature">Signature</Label><Textarea id="signature" value={signature} onChange={(e) => setSignature(e.target.value)} /></div>
              <div className="space-y-1"><Label htmlFor="calendar">Calendar URL</Label><Input id="calendar" value={calendarUrl} onChange={(e) => setCalendarUrl(e.target.value)} /></div>
              <div className="space-y-1"><Label htmlFor="timezone">Timezone</Label><Select defaultValue="utc-5"><SelectTrigger><SelectValue placeholder="Select timezone" /></SelectTrigger><SelectContent><SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem><SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem><SelectItem value="utc-0">Greenwich Mean Time (UTC-0)</SelectItem></SelectContent></Select></div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4"><Button onClick={() => handleSaveChanges('Profile')} className="bg-indigo-600 hover:bg-indigo-700 text-white">Save Changes</Button></CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="rules">
          <Card>
            <CardHeader><CardTitle>Rules</CardTitle><CardDescription>Define auto-send thresholds and guardrails.</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1"><Label htmlFor="threshold">Auto-send vs Review Threshold</Label><Input id="threshold" type="number" defaultValue="75" /><p className="text-sm text-muted-foreground">Confidence score above which replies are auto-sent (0-100).</p></div>
              <div className="space-y-1"><Label htmlFor="vip-keywords">VIP Keywords</Label><Input id="vip-keywords" placeholder="e.g., urgent, important, referral" /><p className="text-sm text-muted-foreground">Comma-separated keywords. Leads containing these will always be queued for review.</p></div>
              <div className="space-y-1"><Label htmlFor="banned-promises">Banned Promises</Label><Textarea id="banned-promises" placeholder="e.g., guarantee, 100% refund, specific pricing" /><p className="text-sm text-muted-foreground">AI will avoid making promises listed here.</p></div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4"><Button onClick={() => handleSaveChanges('Rules')} className="bg-indigo-600 hover:bg-indigo-700 text-white">Save Rules</Button></CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card>
            <CardHeader><CardTitle>Notifications</CardTitle><CardDescription>Choose how you want to be notified.</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4"><Label htmlFor="web-notifs">Web Push Notifications</Label><Switch id="web-notifs" defaultChecked /></div>
              <div className="flex items-center justify-between rounded-lg border p-4"><Label htmlFor="email-notifs">Email Notifications</Label><Switch id="email-notifs" defaultChecked /></div>
              <div className="space-y-1"><Label htmlFor="slack-webhook">Slack Webhook URL</Label><Input id="slack-webhook" placeholder="https://hooks.slack.com/services/..." /></div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4"><Button onClick={() => handleSaveChanges('Notifications')} className="bg-indigo-600 hover:bg-indigo-700 text-white">Save Preferences</Button></CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="privacy">
          <Card>
            <CardHeader><CardTitle>Privacy & Data</CardTitle><CardDescription>Manage data retention and PII settings.</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1"><Label htmlFor="retention">Data Retention</Label><Select defaultValue="90"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="30">30 days</SelectItem><SelectItem value="90">90 days</SelectItem><SelectItem value="180">180 days</SelectItem><SelectItem value="365">1 year</SelectItem></SelectContent></Select></div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <Label htmlFor="pii-redaction">PII Redaction</Label>
                  <p className="text-sm text-muted-foreground">Automatically redact sensitive information like credit card numbers.</p>
                </div>
                <Switch id="pii-redaction" />
              </div>
              <div className="space-x-2 pt-4">
                <Button variant="outline" onClick={() => toast.info("Exporting your data...")}>Export My Data</Button>
                <Button variant="destructive" onClick={() => toast.error("Account deletion is permanent.")}>Delete My Account</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="team">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div><CardTitle>Team & Roles</CardTitle><CardDescription>Manage your team members and their permissions.</CardDescription></div>
              <Button onClick={() => toast.success("Invitation sent!")}><PlusCircle className="mr-2 h-4 w-4" /> Invite Member</Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead>Member</TableHead><TableHead>Role</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                <TableBody>
                  <TableRow><TableCell className="flex items-center gap-2"><Avatar><AvatarFallback>JD</AvatarFallback></Avatar><div><p className="font-medium">Jane Doe</p><p className="text-sm text-muted-foreground">jane@zenith.com</p></div></TableCell><TableCell><Select defaultValue="owner"><SelectTrigger className="w-[120px]"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="owner">Owner</SelectItem><SelectItem value="manager">Manager</SelectItem><SelectItem value="agent">Agent</SelectItem></SelectContent></Select></TableCell><TableCell><Badge variant="secondary">Active</Badge></TableCell></TableRow>
                  <TableRow><TableCell className="flex items-center gap-2"><Avatar><AvatarFallback>JS</AvatarFallback></Avatar><div><p className="font-medium">John Smith</p><p className="text-sm text-muted-foreground">john@zenith.com</p></div></TableCell><TableCell><Select defaultValue="agent"><SelectTrigger className="w-[120px]"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="owner">Owner</SelectItem><SelectItem value="manager">Manager</SelectItem><SelectItem value="agent">Agent</SelectItem></SelectContent></Select></TableCell><TableCell><Badge variant="outline">Invited</Badge></TableCell></TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>);

};