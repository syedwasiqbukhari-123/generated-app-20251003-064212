import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
interface StepProps {
  goToNext: () => void;
  goToPrev?: () => void; // Make goToPrev optional to satisfy the type checker
}
export const Step1_Welcome: React.FC<StepProps> = ({ goToNext }) => {
  return (
    <div className="text-center p-8 md:p-12">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
        Never miss a Shopify lead again.
      </h2>
      <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
        We’ll connect your inbox, personalize your replies, and test with a sample lead.
      </p>
      <Button
        size="lg"
        onClick={goToNext}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 group"
      >
        Start 60-sec Setup
        <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
      </Button>
    </div>
  );
};