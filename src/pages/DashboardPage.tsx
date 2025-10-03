import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle, Bot, FileText, PlusCircle, Loader2 } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { Skeleton } from '@/components/ui/skeleton';
const StatCard = ({ title, value }: { title: string; value: number | undefined }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      {value !== undefined ? (
        <div className="text-2xl font-bold">{value}</div>
      ) : (
        <Skeleton className="h-8 w-1/2" />
      )}
    </CardContent>
  </Card>
);
export const DashboardPage: React.FC = () => {
  const dashboardStats = useStore((state) => state.dashboardStats);
  const recentEmails = useStore((state) => state.recentEmails);
  const loadingDashboard = useStore((state) => state.loadingDashboard);
  const fetchDashboardData = useStore((state) => state.fetchDashboardData);
  const automationActive = useStore((state) => state.automationActive);
  const toggleAutomation = useStore((state) => state.toggleAutomation);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);
  const stats = [
    { title: 'New', value: dashboardStats?.new },
    { title: 'Sent', value: dashboardStats?.sent },
    { title: 'Pending', value: dashboardStats?.pending },
    { title: 'Needs Review', value: dashboardStats?.needsReview },
    { title: 'Failed', value: dashboardStats?.failed },
  ];
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <Label htmlFor="master-automation-toggle" className="font-medium">Automation</Label>
          <Switch id="master-automation-toggle" checked={automationActive} onCheckedChange={toggleAutomation} />
          <span className={`font-bold ${automationActive ? 'text-green-500' : 'text-gray-500'}`}>{automationActive ? 'ON' : 'OFF'}</span>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        {stats.map((stat) => (
          <StatCard key={stat.title} title={stat.title} value={stat.value} />
        ))}
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Emails</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingDashboard ? (
              <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>From</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentEmails.map((email) => (
                    <TableRow key={email.id}>
                      <TableCell className="font-medium">{email.from}</TableCell>
                      <TableCell>{email.subject}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Badge
                            variant={email.status === 'Needs Review' ? 'destructive' : email.status === 'Auto-Sent' ? 'default' : 'secondary'}
                            className={email.status === 'Auto-Sent' ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200' : ''}
                          >
                            {email.status}
                          </Badge>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-6 w-6 ml-2">
                                  <HelpCircle className="h-4 w-4 text-gray-400" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Why? {email.reason}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start"><PlusCircle className="mr-2 h-4 w-4" /> Connect another inbox</Button>
              <Button variant="secondary" className="w-full justify-start"><FileText className="mr-2 h-4 w-4" /> Edit templates</Button>
              <Button variant="secondary" className="w-full justify-start"><Bot className="mr-2 h-4 w-4" /> Create scenario</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};