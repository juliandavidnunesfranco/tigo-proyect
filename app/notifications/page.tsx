"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { NotificationHistory } from "@/components/notification-history";
import { NotificationTemplates } from "@/components/notification-templates";
import { toast } from "@/hooks/use-toast";

export default function NotificationsPage() {
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [whatsappEnabled, setWhatsappEnabled] = useState(true);
  const [emailSettings, setEmailSettings] = useState({
    address: "tu-correo@gmail.com",
    legalizationReminder: true,
    salesSummary: true,
    commissionAlerts: true,
  });

  const [whatsappSettings, setWhatsappSettings] = useState({
    number: "3001234567",
    legalizationReminder: true,
    urgentAlerts: true,
  });

  const handleSaveSettings = () => {
    toast({
      title: "Configuración guardada",
      description: "La configuración de notificaciones ha sido actualizada.",
    });
  };

  const handleTestNotification = (type: string) => {
    toast({
      title: "Notificación de prueba enviada",
      description: `Se ha enviado una notificación de prueba por ${type}.`,
    });
  };

  return (
    <main className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold">Notificaciones</h1>
        <p className="text-muted-foreground">
          Configura y gestiona tus notificaciones
        </p>
      </div>

      <Tabs defaultValue="settings">
        <TabsList className="mb-4">
          <TabsTrigger value="settings">Configuración</TabsTrigger>
          <TabsTrigger value="templates">Plantillas</TabsTrigger>
          <TabsTrigger value="history">Historial</TabsTrigger>
        </TabsList>

        <TabsContent value="settings">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Notificaciones por Correo Electrónico</CardTitle>
                <CardDescription>
                  Configura las notificaciones que recibirás por correo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-6">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">
                      Activar notificaciones por correo
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Recibirás notificaciones importantes en tu correo
                      electrónico
                    </p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={emailEnabled}
                    onCheckedChange={setEmailEnabled}
                  />
                </div>

                {emailEnabled && (
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="email-address">Correo electrónico</Label>
                      <Input
                        id="email-address"
                        value={emailSettings.address}
                        onChange={(e) =>
                          setEmailSettings({
                            ...emailSettings,
                            address: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="space-y-4 pt-4 border-t">
                      <h3 className="font-medium">Tipos de notificaciones</h3>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="legalization-reminder">
                            Recordatorios de legalización
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Recibe alertas sobre legalizaciones pendientes
                          </p>
                        </div>
                        <Switch
                          id="legalization-reminder"
                          checked={emailSettings.legalizationReminder}
                          onCheckedChange={(checked) =>
                            setEmailSettings({
                              ...emailSettings,
                              legalizationReminder: checked,
                            })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="sales-summary">
                            Resumen de ventas
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Recibe un resumen diario de tus ventas
                          </p>
                        </div>
                        <Switch
                          id="sales-summary"
                          checked={emailSettings.salesSummary}
                          onCheckedChange={(checked) =>
                            setEmailSettings({
                              ...emailSettings,
                              salesSummary: checked,
                            })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="commission-alerts">
                            Alertas de comisiones
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Recibe alertas sobre cambios en tus comisiones
                          </p>
                        </div>
                        <Switch
                          id="commission-alerts"
                          checked={emailSettings.commissionAlerts}
                          onCheckedChange={(checked) =>
                            setEmailSettings({
                              ...emailSettings,
                              commissionAlerts: checked,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="pt-4 flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => handleTestNotification("correo")}
                      >
                        Enviar prueba
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notificaciones por WhatsApp</CardTitle>
                <CardDescription>
                  Configura las notificaciones que recibirás por WhatsApp
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-6">
                  <div className="space-y-0.5">
                    <Label htmlFor="whatsapp-notifications">
                      Activar notificaciones por WhatsApp
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Recibirás notificaciones importantes en tu WhatsApp
                    </p>
                  </div>
                  <Switch
                    id="whatsapp-notifications"
                    checked={whatsappEnabled}
                    onCheckedChange={setWhatsappEnabled}
                  />
                </div>

                {whatsappEnabled && (
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="whatsapp-number">
                        Número de WhatsApp
                      </Label>
                      <Input
                        id="whatsapp-number"
                        value={whatsappSettings.number}
                        onChange={(e) =>
                          setWhatsappSettings({
                            ...whatsappSettings,
                            number: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="space-y-4 pt-4 border-t">
                      <h3 className="font-medium">Tipos de notificaciones</h3>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="whatsapp-legalization">
                            Recordatorios de legalización
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Recibe alertas sobre legalizaciones pendientes
                          </p>
                        </div>
                        <Switch
                          id="whatsapp-legalization"
                          checked={whatsappSettings.legalizationReminder}
                          onCheckedChange={(checked) =>
                            setWhatsappSettings({
                              ...whatsappSettings,
                              legalizationReminder: checked,
                            })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="whatsapp-urgent">
                            Alertas urgentes
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Recibe alertas urgentes sobre legalizaciones
                            próximas a vencer
                          </p>
                        </div>
                        <Switch
                          id="whatsapp-urgent"
                          checked={whatsappSettings.urgentAlerts}
                          onCheckedChange={(checked) =>
                            setWhatsappSettings({
                              ...whatsappSettings,
                              urgentAlerts: checked,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="pt-4 flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => handleTestNotification("WhatsApp")}
                      >
                        Enviar prueba
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={handleSaveSettings}>
                Guardar configuración
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="templates">
          <NotificationTemplates />
        </TabsContent>

        <TabsContent value="history">
          <NotificationHistory />
        </TabsContent>
      </Tabs>
    </main>
  );
}
