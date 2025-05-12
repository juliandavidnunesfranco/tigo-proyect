import { Client, LocalAuth } from "whatsapp-web.js"

// Inicializar cliente de WhatsApp
let client: any = null

export async function initWhatsAppClient() {
  if (client) return client

  client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
      args: ["--no-sandbox"],
    },
  })

  client.on("qr", (qr: string) => {
    // Aquí se generaría un código QR para escanear con WhatsApp
    console.log("QR RECEIVED", qr)
  })

  client.on("ready", () => {
    console.log("Cliente de WhatsApp listo")
  })

  await client.initialize()

  return client
}

export async function sendWhatsAppMessage(phoneNumber: string, message: string) {
  try {
    if (!client) {
      await initWhatsAppClient()
    }

    // Formatear número de teléfono (asegurarse de que tenga el código de país)
    const formattedNumber = phoneNumber.startsWith("57") ? phoneNumber : `57${phoneNumber}`

    // Enviar mensaje
    const response = await client.sendMessage(`${formattedNumber}@c.us`, message)

    return { success: true, messageId: response.id.id }
  } catch (error) {
    console.error("Error al enviar mensaje de WhatsApp:", error)
    throw error
  }
}
