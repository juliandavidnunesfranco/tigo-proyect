import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { type, recipient, subject, message } = await request.json()

    // Simulamos el envío de notificaciones sin usar nodemailer
    console.log(`Simulando envío de ${type} a ${recipient}:`, { subject, message })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error al enviar notificación:", error)
    return NextResponse.json({ error: "Error al enviar notificación" }, { status: 500 })
  }
}
