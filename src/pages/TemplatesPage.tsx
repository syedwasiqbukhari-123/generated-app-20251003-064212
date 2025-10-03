import React, { useEffect, useState, useMemo } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit, Trash2, CheckCircle, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useStore } from '@/store/useStore';
import { Template } from '@/types';
import { TemplateForm } from '@/components/TemplateForm';
import { Toaster, toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
const services = ["Store Setup", "Theme Fix", "Migration", "CRO", "General"];
export const TemplatesPage: React.FC = () => {
  const { templates, loadingTemplates, fetchTemplates, editTemplate, removeTemplate } = useStore(state => ({
    templates: state.templates,
    loadingTemplates: state.loadingTemplates,
    fetchTemplates: state.fetchTemplates,
    editTemplate: state.editTemplate,
    removeTemplate: state.removeTemplate,
  }));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);
  const groupedTemplates = useMemo(() => {
    return templates.reduce((acc, template) => {
      (acc[template.service] = acc[template.service] || []).push(template);
      return acc;
    }, {} as Record<string, Template[]>);
  }, [templates]);
  const handleNewTemplate = () => {
    setEditingTemplate(null);
    setIsModalOpen(true);
  };
  const handleEditTemplate = (template: Template) => {
    setEditingTemplate(template);
    setIsModalOpen(true);
  };
  const handleDeleteTemplate = async (id: string) => {
    try {
      await removeTemplate(id);
      toast.success("Template deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete template.");
    }
  };
  const handleToggleActive = async (template: Template) => {
    try {
      await editTemplate(template.id, { isActive: !template.isActive });
      toast.success(`Template ${!template.isActive ? 'activated' : 'deactivated'}.`);
    } catch (error) {
      toast.error("Failed to update template status.");
    }
  };
  return (
    <div className="space-y-8">
      <Toaster richColors />
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold tracking-tight">Templates</h1>
        <Button onClick={handleNewTemplate} className="bg-indigo-600 hover:bg-indigo-700 text-white">
          <PlusCircle className="mr-2 h-4 w-4" /> New Template
        </Button>
      </div>
      {loadingTemplates ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
        </div>
      ) : (
        <Accordion type="multiple" className="w-full space-y-4">
          {services.map((service, index) => (
            groupedTemplates[service] && (
              <AccordionItem value={`item-${index}`} key={service} className="border rounded-lg bg-white dark:bg-gray-950">
                <AccordionTrigger className="text-xl font-semibold px-6 py-4">
                  {service}
                </AccordionTrigger>
                <AccordionContent className="p-6 pt-0">
                  <div className="space-y-4">
                    {groupedTemplates[service].map(template => (
                      <Card key={template.id}>
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle>{template.name}</CardTitle>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge variant="outline">{template.step}</Badge>
                                <Badge>{template.tone}</Badge>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch checked={template.isActive} onCheckedChange={() => handleToggleActive(template)} />
                              <Button variant="ghost" size="icon" onClick={() => handleEditTemplate(template)}><Edit className="h-4 w-4" /></Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600"><Trash2 className="h-4 w-4" /></Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>This action cannot be undone. This will permanently delete this template.</AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDeleteTemplate(template.id)} className="bg-red-600 hover:bg-red-700">Delete</AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Subject: {template.subject}</p>
                          <div className="mt-2 p-4 border rounded-md bg-gray-50 dark:bg-gray-900 text-sm whitespace-pre-wrap">
                            {template.body}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )
          ))}
        </Accordion>
      )}
      <TemplateForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} template={editingTemplate} />
    </div>
  );
};