import { subHours, subDays } from "date-fns"

// Función para obtener historial de notificaciones
export async function getNotificationHistory() {
  // Simulamos datos de notificaciones
  return [
    {
      id: "1",
      type: "email",
      recipient: "cliente1@gmail.com",
      subject: "Recordatorio de legalización pendiente",
      message: "Estimado cliente, le recordamos que tiene una legalización pendiente...",
      timestamp: subHours(new Date(), 2),
      status: "sent",
    },
    {
      id: "2",
      type: "whatsapp",
      recipient: "3001234567",
      subject: "Recordatorio urgente",
      message: "Hola, le recordamos que su legalización vence en 12 horas...",
      timestamp: subHours(new Date(), 5),
      status: "sent",
    },
    {
      id: "3",
      type: "email",
      recipient: "cliente2@hotmail.com",
      subject: "Bienvenido a TIGO",
      message: "Estimado cliente, bienvenido a la familia TIGO...",
      timestamp: subDays(new Date(), 1),
      status: "sent",
    },
    {
      id: "4",
      type: "email",
      recipient: "cliente3@gmail.com",
      subject: "Seguimiento a su servicio",
      message: "Estimado cliente, esperamos que esté disfrutando de su servicio...",
      timestamp: subDays(new Date(), 2),
      status: "failed",
    },
    {
      id: "5",
      type: "whatsapp",
      recipient: "3109876543",
      subject: "Legalización completada",
      message: "Hola, su proceso de legalización ha sido completado exitosamente...",
      timestamp: subDays(new Date(), 3),
      status: "sent",
    },
    {
      id: "6",
      type: "email",
      recipient: "cliente4@yahoo.com",
      subject: "Recordatorio de legalización pendiente",
      message: "Estimado cliente, le recordamos que tiene una legalización pendiente...",
      timestamp: subHours(new Date(), 12),
      status: "pending",
    },
    {
      id: "7",
      type: "whatsapp",
      recipient: "3205678901",
      subject: "Recordatorio urgente",
      message: "Hola, le recordamos que su legalización vence en 6 horas...",
      timestamp: subHours(new Date(), 6),
      status: "sent",
    },
    {
      id: "8",
      type: "email",
      recipient: "cliente5@gmail.com",
      subject: "Resumen de ventas",
      message: "Estimado asesor, aquí está su resumen de ventas del día...",
      timestamp: subDays(new Date(), 1),
      status: "sent",
    },
  ]
}

// Función para enviar notificación (simulada)
export async function sendNotification(type: string, recipient: string, subject: string, message: string) {
  // Simulamos el envío de notificación
  console.log(`Enviando ${type} a ${recipient}:`, { subject, message })

  // Simulamos una respuesta exitosa
  return {
    success: true,
    id: Math.random().toString(36).substring(2, 11),
    timestamp: new Date(),
  }
}

// Función para obtener plantillas de notificaciones (simulada)
export async function getNotificationTemplates() {
  // Simulamos plantillas de notificaciones
  return {
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
  }
}
