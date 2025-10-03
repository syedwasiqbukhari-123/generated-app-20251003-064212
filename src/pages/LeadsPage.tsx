import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Filter, Download, Search } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { Skeleton } from '@/components/ui/skeleton';
export const LeadsPage: React.FC = () => {
  const { leads, loadingLeads, fetchLeads, selectThread } = useStore(state => ({
    leads: state.leads,
    loadingLeads: state.loadingLeads,
    fetchLeads: state.fetchLeads,
    selectThread: state.selectThread,
  }));
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  React.useEffect(() => {
    if (leads.length === 0) {
      fetchLeads();
    }
  }, [fetchLeads, leads.length]);
  const filteredLeads = useMemo(() => {
    if (!searchTerm) return leads;
    return leads.filter(lead =>
      lead.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.service.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [leads, searchTerm]);
  const handleRowClick = (threadId: string) => {
    selectThread(threadId);
    navigate('/inbox');
  };
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">Leads</h1>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search leads..."
              className="max-w-xs pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Filters</Button>
        </div>
        <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export CSV</Button>
      </div>
      <div className="border rounded-lg bg-white dark:bg-gray-950">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>From</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Last Action</TableHead>
              <TableHead>Next Step</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loadingLeads ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-48" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-28" /></TableCell>
                </TableRow>
              ))
            ) : (
              filteredLeads.map((lead) => (
                <TableRow key={lead.id} onClick={() => handleRowClick(lead.threadId)} className="cursor-pointer hover:bg-gray-100/50 dark:hover:bg-gray-800/50">
                  <TableCell className="font-medium">{lead.from}</TableCell>
                  <TableCell>{lead.subject}</TableCell>
                  <TableCell><Badge variant="outline">{lead.service}</Badge></TableCell>
                  <TableCell><Badge variant={lead.status === 'Needs Review' ? 'destructive' : 'secondary'}>{lead.status}</Badge></TableCell>
                  <TableCell>{lead.owner}</TableCell>
                  <TableCell>{lead.lastAction}</TableCell>
                  <TableCell>{lead.nextStep}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};