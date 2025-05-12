"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

export function NotificationTemplates() {
  const [activeTemplate, setActiveTemplate] = useState("legalization");

  const [templates, setTemplates] = useState({
    legalization: {
      subject: "Recordatorio de legalización pendiente",
      emailBody: `Estimado/a {clientName},

Queremos recordarle que tiene una legalización pendiente para su {productType} adquirido el {saleDate}.

Por favor, complete el proceso de legalización lo antes posible para evitar inconvenientes.

Saludos cordiales,
{agentName}
Asesor Comercial TIGO`,
      whatsappBody: `Hola {clientName}, le recordamos que tiene una legalización pendiente para su {productType} adquirido el {saleDate}. Por favor, complete el proceso lo antes posible. Gracias, {agentName} - Asesor TIGO.`,
    },
    welcome: {
      subject: "Bienvenido/a a TIGO",
      emailBody: `Estimado/a {clientName},

¡Bienvenido/a a la familia TIGO! Gracias por adquirir nuestro {productType}.

Estamos a su disposición para cualquier consulta o asistencia que pueda necesitar.

Saludos cordiales,
{agentName}
Asesor Comercial TIGO`,
      whatsappBody: `¡Hola {clientName}! Bienvenido/a a la familia TIGO. Gracias por adquirir nuestro {productType}. Estamos a su disposición para cualquier consulta. Saludos, {agentName} - Asesor TIGO.`,
    },
    followUp: {
      subject: "Seguimiento a su servicio TIGO",
      emailBody: `Estimado/a {clientName},

Esperamos que esté disfrutando de su {productType} adquirido recientemente.

Nos gustaría saber si tiene alguna consulta o si podemos ayudarle en algo más.

Saludos cordiales,
{agentName}
Asesor Comercial TIGO`,
      whatsappBody: `Hola {clientName}, esperamos que esté disfrutando de su {productType}. ¿Tiene alguna consulta o podemos ayudarle en algo más? Saludos, {agentName} - Asesor TIGO.`,
    },
  });

  const handleSaveTemplate = () => {
    toast({
      title: "Plantilla guardada",
      description: "La plantilla ha sido actualizada correctamente.",
    });
  };

  const handleUpdateTemplate = (field: string, value: string) => {
    setTemplates({
      ...templates,
      [activeTemplate]: {
        ...templates[activeTemplate],
        [field]: value,
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Plantillas de Notificaciones</CardTitle>
        <CardDescription>
          Personaliza los mensajes que envías a tus clientes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTemplate} onValueChange={setActiveTemplate}>
          <TabsList className="mb-4">
            <TabsTrigger value="legalization">Legalización</TabsTrigger>
            <TabsTrigger value="welcome">Bienvenida</TabsTrigger>
            <TabsTrigger value="followUp">Seguimiento</TabsTrigger>
          </TabsList>

          <TabsContent value="legalization" className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="legalization-subject">Asunto</Label>
              <Input
                id="legalization-subject"
                value={templates.legalization.subject}
                onChange={(e) =>
                  handleUpdateTemplate("subject", e.target.value)
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="legalization-email">
                Plantilla de correo electrónico
              </Label>
              <Textarea
                id="legalization-email"
                rows={10}
                value={templates.legalization.emailBody}
                onChange={(e) =>
                  handleUpdateTemplate("emailBody", e.target.value)
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="legalization-whatsapp">
                Plantilla de WhatsApp
              </Label>
              <Textarea
                id="legalization-whatsapp"
                rows={5}
                value={templates.legalization.whatsappBody}
                onChange={(e) =>
                  handleUpdateTemplate("whatsappBody", e.target.value)
                }
              />
            </div>
          </TabsContent>

          <TabsContent value="welcome" className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="welcome-subject">Asunto</Label>
              <Input
                id="welcome-subject"
                value={templates.welcome.subject}
                onChange={(e) =>
                  handleUpdateTemplate("subject", e.target.value)
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="welcome-email">
                Plantilla de correo electrónico
              </Label>
              <Textarea
                id="welcome-email"
                rows={10}
                value={templates.welcome.emailBody}
                onChange={(e) =>
                  handleUpdateTemplate("emailBody", e.target.value)
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="welcome-whatsapp">Plantilla de WhatsApp</Label>
              <Textarea
                id="welcome-whatsapp"
                rows={5}
                value={templates.welcome.whatsappBody}
                onChange={(e) =>
                  handleUpdateTemplate("whatsappBody", e.target.value)
                }
              />
            </div>
          </TabsContent>

          <TabsContent value="followUp" className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="followup-subject">Asunto</Label>
              <Input
                id="followup-subject"
                value={templates.followUp.subject}
                onChange={(e) =>
                  handleUpdateTemplate("subject", e.target.value)
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="followup-email">
                Plantilla de correo electrónico
              </Label>
              <Textarea
                id="followup-email"
                rows={10}
                value={templates.followUp.emailBody}
                onChange={(e) =>
                  handleUpdateTemplate("emailBody", e.target.value)
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="followup-whatsapp">Plantilla de WhatsApp</Label>
              <Textarea
                id="followup-whatsapp"
                rows={5}
                value={templates.followUp.whatsappBody}
                onChange={(e) =>
                  handleUpdateTemplate("whatsappBody", e.target.value)
                }
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleSaveTemplate}>Guardar plantilla</Button>
      </CardFooter>
    </Card>
  );
}
