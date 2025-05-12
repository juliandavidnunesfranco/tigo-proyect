/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, FileCheck, Send } from "lucide-react";
import { getPendingLegalizations, markAsLegalized } from "@/lib/data-service";
import { toast } from "@/hooks/use-toast";
import { useTenant } from "@/providers/tenant-provider";

type Legalization = {
  id: string;
  clientName: string;
  documentId: string;
  productType: string;
  saleDate: Date;
  timeLeft: number; // hours
};

export function PendingLegalizations() {
  const { currentTenant } = useTenant();
  const [legalizations, setLegalizations] = useState<Legalization[]>([]);

  useEffect(() => {
    const fetchLegalizations = async () => {
      if (currentTenant) {
        const data = await getPendingLegalizations(currentTenant.id);
        setLegalizations(data);
      }
    };

    fetchLegalizations();
    const interval = setInterval(fetchLegalizations, 60000); // Refresh every minute

    return () => clearInterval(interval);
  }, [currentTenant]);

  const handleMarkAsLegalized = async (id: string) => {
    try {
      if (currentTenant) {
        await markAsLegalized(currentTenant.id, id);
      } else {
        throw new Error("No tenant selected.");
      }
      setLegalizations(legalizations.filter((item) => item.id !== id));
      toast({
        title: "Legalización completada",
        description:
          "El registro ha sido marcado como legalizado correctamente.",
      });
    } catch  {
      toast({
        title: "Error",
        description: "No se pudo actualizar el estado de la legalización.",
        variant: "destructive",
      });
    }
  };

  const sendReminder = async (id: string) => {
    try {
      // Implementar función para enviar recordatorio
      toast({
        title: "Recordatorio enviado",
        description: "Se ha enviado un recordatorio al cliente.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo enviar el recordatorio.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Legalizaciones Pendientes</CardTitle>
        <CardDescription>
          Ventas que requieren legalización en las próximas 48 horas
        </CardDescription>
      </CardHeader>
      <CardContent>
        {legalizations.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            No hay legalizaciones pendientes
          </div>
        ) : (
          <div className="space-y-4">
            {legalizations.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div className="space-y-1">
                  <div className="font-medium">{item.clientName}</div>
                  <div className="text-sm text-muted-foreground">
                    CC: {item.documentId}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={item.timeLeft < 12 ? "destructive" : "outline"}
                    >
                      {item.productType}
                    </Badge>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {item.timeLeft < 12 ? (
                        <span className="text-red-500 font-medium">
                          {item.timeLeft}h restantes
                        </span>
                      ) : (
                        <span>{item.timeLeft}h restantes</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => sendReminder(item.id)}
                  >
                    <Send className="h-4 w-4 mr-1" />
                    Recordar
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleMarkAsLegalized(item.id)}
                  >
                    <FileCheck className="h-4 w-4 mr-1" />
                    Legalizado
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
