import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, CheckCircle, Search, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { runLeadDetectionTest } from '@/lib/api';
import { Toaster, toast } from 'sonner';
interface StepProps {
  goToNext: () => void;
  goToPrev: () => void;
}
export const Step3_Detect: React.FC<StepProps> = ({ goToNext, goToPrev }) => {
  const [testing, setTesting] = useState(false);
  const [detected, setDetected] = useState(false);
  const handleRunTest = async () => {
    setTesting(true);
    try {
      await runLeadDetectionTest();
      toast.success("Test lead detected successfully!");
      setDetected(true);
    } catch (error) {
      toast.error("Failed to run test. Please try again.");
      console.error(error);
    } finally {
      setTesting(false);
    }
  };
  return (
    <div className="p-8 md:p-12">
      <Toaster richColors />
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2 text-center">
        Detect Shopify leads
      </h2>
      <p className="text-gray-500 dark:text-gray-400 text-center mb-8">
        We'll create a rule to automatically identify leads from Shopify.
      </p>
      <Card className="max-w-md mx-auto bg-gray-50 dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Search className="mr-2 h-5 w-5 text-gray-500" />
            Auto-created Rule: "Shopify Leads"
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <p className="text-gray-600 dark:text-gray-300">If email matches:</p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">from:(*@shopify.com)</Badge>
            <Badge variant="secondary">subject:(referral OR lead)</Badge>
            <Badge variant="secondary">body:(new client)</Badge>
          </div>
        </CardContent>
      </Card>
      <div className="text-center mt-8">
        {!detected && (
          <Button size="lg" onClick={handleRunTest} disabled={testing} className="bg-indigo-600 hover:bg-indigo-700 text-white">
            {testing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Running Test...
              </>
            ) : (
              'Run Test'
            )}
          </Button>
        )}
      </div>
      {detected && (
        <div className="text-center max-w-md mx-auto mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
          <h3 className="font-semibold text-gray-900 dark:text-white">Detected as Shopify referral</h3>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Reason: <Badge variant="outline" className="text-green-700 border-green-300 dark:text-green-300 dark:border-green-700">sender domain match</Badge>
          </div>
        </div>
      )}
      <div className="flex justify-between mt-12">
        <Button variant="ghost" onClick={goToPrev}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={goToNext} disabled={!detected} className="bg-indigo-600 hover:bg-indigo-700 text-white">
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};