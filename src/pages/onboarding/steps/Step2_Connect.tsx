import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, CheckCircle, Mail } from 'lucide-react';
interface StepProps {
  goToNext: () => void;
  goToPrev: () => void;
}
export const Step2_Connect: React.FC<StepProps> = ({ goToNext, goToPrev }) => {
  const [connected, setConnected] = useState(false);
  const handleConnect = () => {
    // Mock connection
    setConnected(true);
  };
  return (
    <div className="p-8 md:p-12">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2 text-center">
        Connect your inbox
      </h2>
      <p className="text-gray-500 dark:text-gray-400 text-center mb-8">
        Securely connect your email provider to get started.
      </p>
      {!connected ? (
        <div className="space-y-4 max-w-sm mx-auto">
          <Button onClick={handleConnect} size="lg" className="w-full justify-center py-6 text-base bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg" alt="Gmail" className="w-6 h-6 mr-3" />
            Connect Gmail
          </Button>
          <Button onClick={handleConnect} size="lg" className="w-full justify-center py-6 text-base bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Microsoft_Office_Outlook_%282018%E2%80%93present%29.svg/2491px-Microsoft_Office_Outlook_%282018%E2%80%93present%29.svg.png" alt="Outlook" className="w-6 h-6 mr-3" />
            Connect Outlook
          </Button>
          <div className="text-center pt-2">
            <Button variant="link" className="text-gray-500 dark:text-gray-400">
              Use Mailhook instead
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center max-w-sm mx-auto p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Connected!</h3>
          <p className="text-gray-600 dark:text-gray-300 mt-1">your.email@gmail.com</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Last sync: Just now</p>
        </div>
      )}
      <div className="flex justify-between mt-12">
        <Button variant="ghost" onClick={goToPrev}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={goToNext} disabled={!connected} className="bg-indigo-600 hover:bg-indigo-700 text-white">
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};