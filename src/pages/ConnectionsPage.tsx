import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, RefreshCw, Copy, CheckCircle } from 'lucide-react';
import { runLeadDetectionTest } from '@/lib/api';
import { Toaster, toast } from 'sonner';
export const ConnectionsPage: React.FC = () => {
  const handleTestRule = async () => {
    toast.promise(runLeadDetectionTest(), {
      loading: 'Sending test lead...',
      success: 'Test lead detected successfully!',
      error: 'Failed to send test lead.',
    });
  };
  return (
    <div className="space-y-8">
      <Toaster richColors />
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold tracking-tight">Connections</h1>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
          <PlusCircle className="mr-2 h-4 w-4" /> Add Connection
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg" alt="Gmail" className="w-10 h-10" />
              <div>
                <CardTitle>Gmail</CardTitle>
                <CardDescription>your.email@gmail.com</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <p><strong>Scopes:</strong> Read, Compose, Send</p>
            <p><strong>Last Sync:</strong> 2 minutes ago</p>
            <p><strong>Quota:</strong> 95% remaining</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" /> Reconnect
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Mailhook</CardTitle>
            <CardDescription>Forward emails to a unique address.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <code className="p-2 bg-gray-100 dark:bg-gray-800 rounded-md text-sm">
                abc-123-xyz@zenith-inbox.com
              </code>
              <Button variant="ghost" size="icon"><Copy className="h-4 w-4" /></Button>
            </div>
            <div className="flex items-center text-green-600">
              <CheckCircle className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Verified</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={handleTestRule}>Create Shopify Rule</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};