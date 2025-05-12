import { NextResponse } from "next/server"
import { getPendingLegalizations } from "@/lib/data-service"

// Esta ruta se ejecutaría mediante un cron job para verificar legalizaciones pendientes
// y enviar notificaciones automáticas

export async function GET() {
  try {
    // Obtener legalizaciones pendientes
    const pendingLegalizations = await getPendingLegalizations()

    // Filtrar las que están próximas a vencer (menos de 12 horas)
    const urgentLegalizations = pendingLegalizations.filter((item) => item.timeLeft <= 12)

    // Enviar notificaciones para cada legalización urgente
    for (const legalization of urgentLegalizations) {
      // Aquí se llamaría al servicio de notificaciones
      await fetch("/api/notifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "email",
          recipient: "tu-correo@ejemplo.com", // En producción, sería el correo del asesor
          subject: "⚠️ Legalización pendiente urgente",
          message: `
            <h2>Legalización pendiente urgente</h2>
            <p>Cliente: <strong>${legalization.clientName}</strong></p>
            <p>Documento: <strong>${legalization.documentId}</strong></p>
            <p>Producto: <strong>${legalization.productType}</strong></p>
            <p>Tiempo restante: <strong>${legalization.timeLeft} horas</strong></p>
            <p>Por favor, complete la legalización lo antes posible para evitar perder la comisión.</p>
          `,
        }),
      })
    }

    return NextResponse.json({
      success: true,
      processed: urgentLegalizations.length,
    })
  } catch (error) {
    console.error("Error al verificar legalizaciones:", error)
    return NextResponse.json({ error: "Error al verificar legalizaciones" }, { status: 500 })
  }
}
