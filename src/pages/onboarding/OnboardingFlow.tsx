import React from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Step1_Welcome } from './steps/Step1_Welcome';
import { Step2_Connect } from './steps/Step2_Connect';
import { Step3_Detect } from './steps/Step3_Detect';
import { Step4_Voice } from './steps/Step4_Voice';
import { Step5_Automation } from './steps/Step5_Automation';
import { Step6_GoLive } from './steps/Step6_GoLive';
import { Progress } from '@/components/ui/progress';
import { Mail } from 'lucide-react';
const steps = [
  { component: Step1_Welcome, path: 'welcome' },
  { component: Step2_Connect, path: 'connect' },
  { component: Step3_Detect, path: 'detect' },
  { component: Step4_Voice, path: 'voice' },
  { component: Step5_Automation, path: 'automation' },
  { component: Step6_GoLive, path: 'go-live' },
];
export const OnboardingFlow: React.FC = () => {
  const { step } = useParams<{ step: string }>();
  const navigate = useNavigate();
  const stepIndex = steps.findIndex(s => s.path === step);
  if (stepIndex === -1) {
    return <Navigate to="/onboarding/welcome" replace />;
  }
  const CurrentStepComponent = steps[stepIndex].component;
  const progress = ((stepIndex + 1) / steps.length) * 100;
  const goToNext = () => {
    if (stepIndex < steps.length - 1) {
      navigate(`/onboarding/${steps[stepIndex + 1].path}`);
    } else {
      navigate('/dashboard');
    }
  };
  const goToPrev = () => {
    if (stepIndex > 0) {
      navigate(`/onboarding/${steps[stepIndex - 1].path}`);
    } else {
      navigate('/');
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="flex items-center justify-center mb-8">
          <Mail className="h-8 w-8 text-indigo-600" />
          <h1 className="ml-3 text-2xl font-bold tracking-tighter text-gray-900 dark:text-white">Zenith Inbox</h1>
        </div>
        <div className="mb-8 px-4">
          <Progress value={progress} className="w-full h-2" />
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg"
          >
            <CurrentStepComponent goToNext={goToNext} goToPrev={goToPrev} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};