import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Template } from '@/types';
import { useStore } from '@/store/useStore';
import { Toaster, toast } from 'sonner';
const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  service: z.string().min(1, 'Service is required'),
  step: z.enum(['Initial Reply', 'Follow-up 1', 'Follow-up 2']),
  tone: z.enum(['Friendly', 'Expert', 'Concise']),
  subject: z.string().min(1, 'Subject is required'),
  body: z.string().min(1, 'Body is required'),
  isActive: z.boolean(),
});
type TemplateFormValues = z.infer<typeof formSchema>;
interface TemplateFormProps {
  isOpen: boolean;
  onClose: () => void;
  template?: Template | null;
}
const services = ["Store Setup", "Theme Fix", "Migration", "CRO", "General"];
export const TemplateForm: React.FC<TemplateFormProps> = ({ isOpen, onClose, template }) => {
  const addTemplate = useStore((state) => state.addTemplate);
  const editTemplate = useStore((state) => state.editTemplate);
  const form = useForm<TemplateFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: template ? {
      ...template,
      tone: template.tone || 'Friendly',
    } : {
      name: '',
      service: '',
      step: 'Initial Reply',
      tone: 'Friendly',
      subject: '',
      body: '',
      isActive: true,
    },
  });
  React.useEffect(() => {
    form.reset(template ? { ...template } : {
      name: '', service: '', step: 'Initial Reply', tone: 'Friendly', subject: '', body: '', isActive: true,
    });
  }, [template, form]);
  const onSubmit = async (values: TemplateFormValues) => {
    try {
      if (template) {
        await editTemplate(template.id, values);
        toast.success('Template updated successfully!');
      } else {
        await addTemplate(values);
        toast.success('Template created successfully!');
      }
      onClose();
    } catch (error) {
      toast.error('Failed to save template.');
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <Toaster richColors />
        <DialogHeader>
          <DialogTitle>{template ? 'Edit Template' : 'Create New Template'}</DialogTitle>
          <DialogDescription>
            {template ? 'Update the details of your email template.' : 'Fill out the details for your new email template.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem><FormLabel>Template Name</FormLabel><FormControl><Input placeholder="e.g., Initial Outreach for Store Setup" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <div className="grid grid-cols-2 gap-4">
              <FormField control={form.control} name="service" render={({ field }) => (
                <FormItem><FormLabel>Service</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select a service" /></SelectTrigger></FormControl><SelectContent>{services.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="step" render={({ field }) => (
                <FormItem><FormLabel>Step</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select a step" /></SelectTrigger></FormControl><SelectContent><SelectItem value="Initial Reply">Initial Reply</SelectItem><SelectItem value="Follow-up 1">Follow-up 1</SelectItem><SelectItem value="Follow-up 2">Follow-up 2</SelectItem></SelectContent></Select><FormMessage /></FormItem>
              )} />
            </div>
            <FormField control={form.control} name="tone" render={({ field }) => (
              <FormItem><FormLabel>Tone</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select a tone" /></SelectTrigger></FormControl><SelectContent><SelectItem value="Friendly">😊 Friendly</SelectItem><SelectItem value="Expert">🧐 Expert</SelectItem><SelectItem value="Concise">✍️ Concise</SelectItem></SelectContent></Select><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="subject" render={({ field }) => (
              <FormItem><FormLabel>Subject</FormLabel><FormControl><Input placeholder="Re: Your Shopify Inquiry" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="body" render={({ field }) => (
              <FormItem><FormLabel>Body</FormLabel><FormControl><Textarea placeholder="Hi {first_name|there}, ..." className="min-h-[150px]" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="isActive" render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm"><div className="space-y-0.5"><FormLabel>Active</FormLabel></div><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl></FormItem>
            )} />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
              <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">Save Template</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};