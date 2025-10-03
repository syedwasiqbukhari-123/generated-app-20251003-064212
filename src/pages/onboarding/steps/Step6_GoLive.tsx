import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Rocket, FileText, Send } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
interface StepProps {
  goToNext: () => void;
  goToPrev: () => void;
}
export const Step6_GoLive: React.FC<StepProps> = ({ goToNext, goToPrev }) => {
  const [isLive, setIsLive] = useState(false);
  return (
    <div className="p-8 md:p-12 text-center">
      <Rocket className="h-16 w-16 text-indigo-500 mx-auto mb-4" />
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
        You're all set!
      </h2>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        Ready to activate your new AI assistant?
      </p>
      <div className="flex items-center justify-center space-x-4 p-6 bg-gray-100 dark:bg-gray-900 rounded-lg max-w-sm mx-auto">
        <Label htmlFor="automation-toggle" className="text-lg font-medium text-gray-700 dark:text-gray-300">
          Automation
        </Label>
        <Switch
          id="automation-toggle"
          checked={isLive}
          onCheckedChange={setIsLive}
          className="data-[state=checked]:bg-indigo-600"
        />
        <span className={`text-lg font-bold ${isLive ? 'text-green-500' : 'text-gray-500'}`}>
          {isLive ? 'ON' : 'OFF'}
        </span>
      </div>
      <div className="mt-8 space-y-3">
        <Button variant="link">
          <FileText className="mr-2 h-4 w-4" /> Preview your default template
        </Button>
        <br />
        <Button variant="link">
          <Send className="mr-2 h-4 w-4" /> Send another test
        </Button>
      </div>
      <div className="flex justify-between mt-12">
        <Button variant="ghost" onClick={goToPrev}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button size="lg" onClick={goToNext} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-6">
          Go to Dashboard <Rocket className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};