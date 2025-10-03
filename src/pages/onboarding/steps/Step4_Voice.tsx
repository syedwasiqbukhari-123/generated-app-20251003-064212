import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, Link, Languages } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
interface StepProps {
  goToNext: () => void;
  goToPrev: () => void;
}
const services = ["Store Setup", "Theme Fix", "Migration", "CRO"];
export const Step4_Voice: React.FC<StepProps> = ({ goToNext, goToPrev }) => {
  return (
    <div className="p-8 md:p-12">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2 text-center">
        Define your voice
      </h2>
      <p className="text-gray-500 dark:text-gray-400 text-center mb-8">
        Personalize how the AI responds to leads.
      </p>
      <div className="space-y-6 max-w-lg mx-auto">
        <div>
          <Label htmlFor="tone">Tone</Label>
          <Select defaultValue="friendly">
            <SelectTrigger id="tone">
              <SelectValue placeholder="Select a tone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="friendly">😊 Friendly</SelectItem>
              <SelectItem value="expert">🧐 Expert</SelectItem>
              <SelectItem value="concise">✍️ Concise</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="signature">Brand Signature</Label>
          <Textarea id="signature" placeholder="Best,&#10;The Zenith Team" className="min-h-[80px]" />
        </div>
        <div>
          <Label htmlFor="calendar-link">Calendar Link</Label>
          <div className="relative">
            <Link className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input id="calendar-link" placeholder="https://cal.com/your-name" className="pl-9" />
          </div>
        </div>
        <div>
          <Label>Services Offered</Label>
          <div className="grid grid-cols-2 gap-4 mt-2">
            {services.map(service => (
              <div key={service} className="flex items-center space-x-2">
                <Switch id={service} defaultChecked />
                <Label htmlFor={service} className="font-normal">{service}</Label>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <div className="flex items-center">
                <Languages className="h-5 w-5 mr-3 text-gray-500"/>
                <Label htmlFor="language-mirror">Mirror sender language</Label>
            </div>
            <Switch id="language-mirror" defaultChecked />
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