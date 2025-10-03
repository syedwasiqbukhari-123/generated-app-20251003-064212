import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { useStore } from '@/store/useStore';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2 } from 'lucide-react';
const COLORS = ['#4F46E5', '#818CF8', '#A5B4FC'];
export const AnalyticsPage: React.FC = () => {
  const analyticsData = useStore((state) => state.analyticsData);
  const loadingAnalytics = useStore((state) => state.loadingAnalytics);
  const fetchAnalyticsData = useStore((state) => state.fetchAnalyticsData);
  useEffect(() => {
    fetchAnalyticsData();
  }, [fetchAnalyticsData]);
  if (loadingAnalytics || !analyticsData) {
    return (
      <div className="space-y-8">
        <h1 className="text-4xl font-bold tracking-tight">Analytics</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardHeader><Skeleton className="h-6 w-1/2" /></CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">Analytics</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Avg. Response Time</CardTitle></CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsData.responseTime}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis unit="m" />
                  <Tooltip cursor={{ fill: 'rgba(79, 70, 229, 0.1)' }} />
                  <Bar dataKey="Avg Time (min)" fill="var(--color-indigo)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Reply Rate</CardTitle></CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={analyticsData.outcomes.replyRate} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                    {analyticsData.outcomes.replyRate.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Follow-up Effectiveness</CardTitle></CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsData.followUps} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={80} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Step 1" stackId="a" fill="#818CF8" />
                  <Bar dataKey="Step 2" stackId="a" fill="#4F46E5" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Reliability (% Success)</CardTitle></CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analyticsData.reliability}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[95, 100]} unit="%" />
                  <Tooltip />
                  <Line type="monotone" dataKey="Success" stroke="#4F46E5" strokeWidth={2} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};