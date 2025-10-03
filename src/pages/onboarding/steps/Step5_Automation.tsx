import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, Clock, Repeat, ShieldOff } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';
interface StepProps {
  goToNext: () => void;
  goToPrev: () => void;
}
export const Step5_Automation: React.FC<StepProps> = ({ goToNext, goToPrev }) => {
  return (
    <div className="p-8 md:p-12">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2 text-center">
        Set your automation mode
      </h2>
      <p className="text-gray-500 dark:text-gray-400 text-center mb-8">
        Choose how you want Zenith Inbox to handle replies.
      </p>
      <div className="space-y-6 max-w-lg mx-auto">
        <RadioGroup defaultValue="auto-send" className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <RadioGroupItem value="auto-send" id="auto-send" className="peer sr-only" />
            <Label htmlFor="auto-send" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-indigo-600 [&:has([data-state=checked])]:border-indigo-600">
              <Clock className="mb-3 h-6 w-6" />
              Auto-Send
              <span className="text-xs font-normal text-center text-gray-500 mt-1">During business hours</span>
            </Label>
          </div>
          <div>
            <RadioGroupItem value="draft" id="draft" className="peer sr-only" />
            <Label htmlFor="draft" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-indigo-600 [&:has([data-state=checked])]:border-indigo-600">
              <Repeat className="mb-3 h-6 w-6" />
              Draft for Review
              <span className="text-xs font-normal text-center text-gray-500 mt-1">Always create drafts</span>
            </Label>
          </div>
        </RadioGroup>
        <Card>
          <CardContent className="pt-6">
            <Label className="font-semibold">Follow-ups</Label>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Send reminders if there's no reply.
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="followup-1" className="font-normal">After 48 hours</Label>
                <Switch id="followup-1" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="followup-2" className="font-normal">After 5 days</Label>
                <Switch id="followup-2" defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <div className="flex items-center">
                <ShieldOff className="h-5 w-5 mr-3 text-gray-500"/>
                <Label htmlFor="ooo-pause">Pause if OOO/autoresponder found</Label>
            </div>
            <Switch id="ooo-pause" defaultChecked />
        </div>
      </div>
      <div className="flex justify-between mt-12">
        <Button variant="ghost" onClick={goToPrev}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={goToNext} className="bg-indigo-600 hover:bg-indigo-700 text-white">
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};