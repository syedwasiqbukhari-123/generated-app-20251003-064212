import React, { useEffect } from 'react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Edit, Loader2, PauseCircle, SkipForward, ThumbsUp } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { shallow } from 'zustand/shallow';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useHotkeys } from 'react-hotkeys-hook';
import { Toaster, toast } from 'sonner';
export const InboxPage: React.FC = () => {
  const threads = useStore((state) => state.threads);
  const loadingInbox = useStore((state) => state.loadingInbox);
  const selectedThreadId = useStore((state) => state.selectedThreadId);
  const generatingDraft = useStore((state) => state.generatingDraft);
  const selectThread = useStore((state) => state.selectThread);
  const getSelectedThread = useStore((state) => state.getSelectedThread);
  const fetchInboxThreads = useStore((state) => state.fetchInboxThreads);
  const generateDraftForSelectedThread = useStore((state) => state.generateDraftForSelectedThread);
  const approveAndSendSelectedThread = useStore((state) => state.approveAndSendSelectedThread);
  const skipSelectedThread = useStore((state) => state.skipSelectedThread);
  const pauseAutomationForSelectedThread = useStore((state) => state.pauseAutomationForSelectedThread);
  const selectedThread = getSelectedThread();
  useEffect(() => {
    fetchInboxThreads();
  }, [fetchInboxThreads]);
  useEffect(() => {
    if (selectedThread && !selectedThread.aiDraft && !generatingDraft) {
      generateDraftForSelectedThread();
    }
  }, [selectedThread, generatingDraft, generateDraftForSelectedThread]);
  const handleApprove = () => {
    if (!selectedThread) return;
    approveAndSendSelectedThread();
    toast.success("Approved & Sent!");
  };
  const handleEdit = () => toast.info("Editing draft...");
  const handleSkip = () => {
    if (!selectedThread) return;
    skipSelectedThread();
    toast.warning("Skipped thread.");
  };
  const handlePause = () => {
    if (!selectedThread) return;
    pauseAutomationForSelectedThread();
    toast.error("Automation paused for this thread.");
  };
  useHotkeys('a', handleApprove, { preventDefault: true });
  useHotkeys('e', handleEdit, { preventDefault: true });
  useHotkeys('s', handleSkip, { preventDefault: true });
  useHotkeys('p', handlePause, { preventDefault: true });
  return (
    <div className="h-[calc(100vh-100px)]">
      <Toaster richColors />
      <ResizablePanelGroup direction="horizontal" className="h-full w-full rounded-lg border dark:border-gray-800 bg-white dark:bg-gray-950">
        <ResizablePanel defaultSize={25} minSize={20}>
          <div className="flex h-full flex-col">
            <div className="p-4 border-b dark:border-gray-800">
              <h2 className="text-xl font-bold">Inbox</h2>
            </div>
            <div className="flex-1 overflow-y-auto">
              {loadingInbox ? (
                <div className="p-4 space-y-4">
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                </div>
              ) : (
                threads.map((thread) => (
                  <div
                    key={thread.id}
                    onClick={() => selectThread(thread.id)}
                    className={cn(
                      "p-4 border-b dark:border-gray-800 cursor-pointer transition-colors",
                      selectedThreadId === thread.id
                        ? "bg-indigo-50 dark:bg-indigo-900/30"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800/50"
                    )}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-sm">{thread.from}</span>
                      <span className="text-xs text-gray-500">{thread.timestamp}</span>
                    </div>
                    <p className="text-sm font-medium truncate">{thread.subject}</p>
                    <p className="text-xs text-gray-500 truncate">{thread.snippet}</p>
                    <Badge variant="secondary" className="mt-2">{thread.status}</Badge>
                  </div>
                ))
              )}
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={45} minSize={30}>
          <div className="flex h-full flex-col">
            {selectedThread ? (
              <>
                <div className="p-4 border-b dark:border-gray-800">
                  <h3 className="font-bold">{selectedThread.subject}</h3>
                  <p className="text-sm text-gray-500">From: {selectedThread.from}</p>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                  {selectedThread.emails.map(email => (
                    <div key={email.id} className="flex gap-4">
                      <Avatar><AvatarFallback>{email.from.charAt(0).toUpperCase()}</AvatarFallback></Avatar>
                      <div>
                        <p className="font-semibold">{email.from} <span className="text-gray-500 font-normal text-sm">to {email.to}</span></p>
                        <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{email.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                {loadingInbox ? <Loader2 className="h-8 w-8 animate-spin" /> : "Select a thread to view"}
              </div>
            )}
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={30} minSize={25}>
          <div className="flex h-full flex-col bg-gray-100/50 dark:bg-gray-950/50">
            {selectedThread ? (
              <>
                <div className="p-4 border-b dark:border-gray-800">
                  <h3 className="text-lg font-bold">Smart Summary</h3>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  <Card>
                    <CardContent className="pt-4 space-y-2">
                      {generatingDraft ? (
                        <>
                          <Skeleton className="h-5 w-3/4" />
                          <Skeleton className="h-5 w-1/2" />
                        </>
                      ) : (
                        <>
                          <div className="text-sm font-medium">Detected Service: <Badge className="bg-indigo-100 text-indigo-800">{selectedThread.detectedService}</Badge></div>
                          <div className="text-sm font-medium">Confidence: <Badge variant="outline" className="text-green-700 border-green-300">{selectedThread.confidence}%</Badge></div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                  <div>
                    <Label htmlFor="ai-draft" className="font-semibold">AI Draft</Label>
                    {generatingDraft ? (
                      <Skeleton className="min-h-[200px] mt-2 w-full" />
                    ) : (
                      <Textarea id="ai-draft" className="min-h-[200px] mt-2" defaultValue={selectedThread.aiDraft || ''} />
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="qualified" />
                    <Label htmlFor="qualified">Track as Qualified</Label>
                  </div>
                  <TooltipProvider delayDuration={100}>
                    <div className="space-y-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button onClick={handleApprove} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"><ThumbsUp className="mr-2 h-4 w-4" /> Approve & Send</Button>
                        </TooltipTrigger>
                        <TooltipContent><p>Shortcut: A</p></TooltipContent>
                      </Tooltip>
                      <div className="grid grid-cols-3 gap-2">
                        <Tooltip>
                          <TooltipTrigger asChild><Button onClick={handleEdit} variant="secondary" className="w-full"><Edit className="mr-2 h-4 w-4" /> Edit</Button></TooltipTrigger>
                          <TooltipContent><p>Shortcut: E</p></TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild><Button onClick={handleSkip} variant="secondary" className="w-full"><SkipForward className="mr-2 h-4 w-4" /> Skip</Button></TooltipTrigger>
                          <TooltipContent><p>Shortcut: S</p></TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild><Button onClick={handlePause} variant="secondary" className="w-full"><PauseCircle className="mr-2 h-4 w-4" /> Pause</Button></TooltipTrigger>
                          <TooltipContent><p>Shortcut: P</p></TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                  </TooltipProvider>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Select a thread to see details
              </div>
            )}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};