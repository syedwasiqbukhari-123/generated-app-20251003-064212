import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const handleStart = () => {
    navigate('/onboarding/welcome');
  };
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-foreground p-4 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="text-center space-y-8 relative z-10"
      >
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Mail className="w-10 h-10 text-white" />
          </div>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white text-balance leading-tight">
          Never miss a Shopify lead again.
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-pretty">
          Connect your inbox, choose your voice, and the app replies + follows up automatically—only pulling you in when needed.
        </p>
        <div className="flex justify-center gap-4">
          <Button
            size="lg"
            onClick={handleStart}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 group transform hover:-translate-y-1"
          >
            Start 60-sec Setup
            <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </motion.div>
      <footer className="absolute bottom-8 text-center text-gray-500/80 text-sm">
        <p>Built with ❤️ at Cloudflare</p>
      </footer>
    </main>
  );
};