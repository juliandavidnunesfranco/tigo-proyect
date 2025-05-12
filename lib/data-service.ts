import { v4 as uuidv4 } from "uuid"
import { addDays, subDays, subHours, format, subMonths } from "date-fns"

// Datos de ejemplo para desarrollo
const tenants = [
  {
    id: "tenant1",
    name: "TIGO Centro Comercial Chipichape",
    code: "CALI001",
    address: "Av. 6 Norte #37-25",
    city: "Cali",
    region: "Valle del Cauca",
    status: "ACTIVE",
    features: ["reports", "notifications", "multiUser"],
  },
  {
    id: "tenant2",
    name: "TIGO Centro Comercial Unicentro",
    code: "CALI002",
    address: "Cra. 100 #5-169",
    city: "Cali",
    region: "Valle del Cauca",
    status: "ACTIVE",
    features: ["reports", "notifications", "multiUser", "whatsapp"],
  },
  {
    id: "tenant3",
    name: "TIGO Centro Comercial Santafé",
    code: "MED001",
    address: "Cra. 43A #7 Sur-170",
    city: "Medellín",
    region: "Antioquia",
    status: "ACTIVE",
    features: ["reports", "notifications", "multiUser", "api"],
  },
  {
    id: "tenant4",
    name: "TIGO Centro Comercial Gran Estación",
    code: "BOG001",
    address: "Av. Calle 26 #62-47",
    city: "Bogotá",
    region: "Cundinamarca",
    status: "ACTIVE",
    features: ["reports", "notifications", "multiUser", "api", "whatsapp"],
  },
]

const users = [
  {
    id: "user1",
    name: "Juan Pérez",
    email: "vendedor@tigo.com",
    role: "SELLER",
    status: "ACTIVE",
    tenants: ["tenant1", "tenant2"],
    lastLogin: new Date(),
  },
  {
    id: "user2",
    name: "María Gómez",
    email: "admin@tigo.com",
    role: "STORE_ADMIN",
    status: "ACTIVE",
    tenants: ["tenant1"],
    lastLogin: subDays(new Date(), 1),
  },
  {
    id: "user3",
    name: "Carlos Rodríguez",
    email: "gerente@tigo.com",
    role: "MANAGER",
    status: "ACTIVE",
    tenants: [],
    lastLogin: subDays(new Date(), 2),
  },
  {
    id: "user4",
    name: "Ana Martínez",
    email: "sysadmin@tigo.com",
    role: "SYSTEM_ADMIN",
    status: "ACTIVE",
    tenants: [],
    lastLogin: subDays(new Date(), 3),
  },
]

// Datos específicos por tenant
const tenantData = {
  tenant1: {
    clients: [
      {
        id: uuidv4(),
        name: "SHIRLEY CATHERINE MARTINEZ JULI",
        documentId: "1143940627",
        birthDate: "1991-04-24",
        documentIssueDate: "2009-07-31",
        phone: "",
        portedPhone: "3203934493",
        nip: "*08816",
        msid: "3242836554",
        iccid: "732111396238550",
        imei: "",
        email: "katerinsoler6@gmail.com",
        address: "Calle 64 A # 1H -05",
        productType: "chip",
        status: "active",
        saleDate: subDays(new Date(), 1),
        legalizationStatus: "completed",
        legalizationDate: subDays(new Date(), 1),
      },
      {
        id: uuidv4(),
        name: "JUAN CARLOS PEREZ",
        documentId: "79856321",
        birthDate: "1985-06-15",
        documentIssueDate: "2005-08-20",
        phone: "3156789012",
        portedPhone: "",
        nip: "",
        msid: "3156789012",
        iccid: "732111396238551",
        imei: "354862105478963",
        email: "juanperez@gmail.com",
        address: "Carrera 45 # 23-18",
        productType: "mobile",
        status: "pending",
        saleDate: new Date(),
        legalizationStatus: "pending",
        legalizationDate: null,
      },
    ],
    activities: [
      {
        id: uuidv4(),
        type: "sale",
        clientName: "JUAN CARLOS PEREZ",
        timestamp: new Date(),
        details: "Plan Pospago 15GB",
      },
      {
        id: uuidv4(),
        type: "legalization",
        clientName: "SHIRLEY CATHERINE MARTINEZ JULI",
        timestamp: subHours(new Date(), 5),
        details: "Reposición Chip",
      },
    ],
    stats: {
      totalClients: 2,
      pendingLegalizations: 1,
      completedLegalizations: 1,
      desertion: 15,
      commissionRate: 100,
      totalSales: 300000,
    },
  },
  tenant2: {
    clients: [
      {
        id: uuidv4(),
        name: "MARIA FERNANDA GOMEZ",
        documentId: "52369874",
        birthDate: "1990-03-25",
        documentIssueDate: "2010-05-12",
        phone: "3209876543",
        portedPhone: "",
        nip: "",
        msid: "3209876543",
        iccid: "732111396238552",
        imei: "354862105478964",
        email: "mariafernanda@gmail.com",
        address: "Avenida 68 # 45-23",
        productType: "home",
        status: "active",
        saleDate: subDays(new Date(), 2),
        legalizationStatus: "completed",
        legalizationDate: subDays(new Date(), 1),
      },
      {
        id: uuidv4(),
        name: "PEDRO RAMIREZ",
        documentId: "1020304050",
        birthDate: "1988-12-10",
        documentIssueDate: "2008-01-15",
        phone: "3157894561",
        portedPhone: "",
        nip: "",
        msid: "3157894561",
        iccid: "732111396238553",
        imei: "354862105478965",
        email: "pedroramirez@gmail.com",
        address: "Calle 80 # 20-30",
        productType: "mobile",
        status: "cancelled",
        saleDate: subDays(new Date(), 5),
        legalizationStatus: "completed",
        legalizationDate: subDays(new Date(), 4),
      },
    ],
    activities: [
      {
        id: uuidv4(),
        type: "cancellation",
        clientName: "PEDRO RAMIREZ",
        timestamp: subDays(new Date(), 1),
        details: "Cliente insatisfecho con el servicio",
      },
      {
        id: uuidv4(),
        type: "legalization",
        clientName: "MARIA FERNANDA GOMEZ",
        timestamp: subDays(new Date(), 1),
        details: "Plan Hogar 300MB",
      },
    ],
    stats: {
      totalClients: 2,
      pendingLegalizations: 0,
      completedLegalizations: 2,
      desertion: 25,
      commissionRate: 75,
      totalSales: 450000,
    },
  },
  tenant3: {
    clients: [],
    activities: [],
    stats: {
      totalClients: 0,
      pendingLegalizations: 0,
      completedLegalizations: 0,
      desertion: 0,
      commissionRate: 100,
      totalSales: 0,
    },
  },
  tenant4: {
    clients: [],
    activities: [],
    stats: {
      totalClients: 0,
      pendingLegalizations: 0,
      completedLegalizations: 0,
      desertion: 0,
      commissionRate: 100,
      totalSales: 0,
    },
  },
}

// Funciones para interactuar con los datos

export async function getTenants() {
  // Simular latencia de red
  await new Promise((resolve) => setTimeout(resolve, 500))
  return tenants
}

export async function getAllTenants() {
  // Simular latencia de red
  await new Promise((resolve) => setTimeout(resolve, 500))
  return tenants
}

export async function getAllUsers() {
  // Simular latencia de red
  await new Promise((resolve) => setTimeout(resolve, 500))
  return users
}

export async function getTenantData(tenantId: string) {
  // Simular latencia de red
  await new Promise((resolve) => setTimeout(resolve, 500))
  return tenantData[tenantId] || null
}

export async function getStats(tenantId: string) {
  // Simular latencia de red
  await new Promise((resolve) => setTimeout(resolve, 500))
  return (
    tenantData[tenantId]?.stats || {
      totalClients: 0,
      pendingLegalizations: 0,
      completedLegalizations: 0,
      desertion: 0,
      commissionRate: 100,
      totalSales: 0,
    }
  )
}

export async function getPendingLegalizations(tenantId: string) {
  // Simular latencia de red
  await new Promise((resolve) => setTimeout(resolve, 500))

  const clients = tenantData[tenantId]?.clients || []

  // Obtener clientes con legalizaciones pendientes
  const pending = clients
    .filter((c) => c.legalizationStatus === "pending")
    .map((client) => {
      // Calcular tiempo restante (48 horas desde la venta)
      const deadline = addDays(new Date(client.saleDate), 2)
      const now = new Date()
      const hoursLeft = Math.round((deadline.getTime() - now.getTime()) / (1000 * 60 * 60))

      return {
        id: client.id,
        clientName: client.name,
        documentId: client.documentId,
        productType: client.productType,
        saleDate: client.saleDate,
        timeLeft: hoursLeft,
      }
    })
    .sort((a, b) => a.timeLeft - b.timeLeft) // Ordenar por tiempo restante (menor primero)

  return pending
}

export async function getRecentActivity(tenantId: string) {
  // Simular latencia de red
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Obtener actividades recientes ordenadas por fecha
  return (
    tenantData[tenantId]?.activities.sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    ) || []
  )
}

export async function getClients(tenantId: string) {
  // Simular latencia de red
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Obtener todos los clientes
  return tenantData[tenantId]?.clients || []
}

export async function addClient(tenantId: string, clientData: any) {
  // Simular latencia de red
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Crear nuevo cliente
  const newClient = {
    id: uuidv4(),
    ...clientData,
    saleDate: new Date(),
    legalizationStatus: "pending",
    legalizationDate: null,
  }

  // Agregar a la lista de clientes
  if (!tenantData[tenantId]) {
    tenantData[tenantId] = {
      clients: [],
      activities: [],
      stats: {
        totalClients: 0,
        pendingLegalizations: 0,
        completedLegalizations: 0,
        desertion: 0,
        commissionRate: 100,
        totalSales: 0,
      },
    }
  }

  tenantData[tenantId].clients = [newClient, ...(tenantData[tenantId].clients || [])]

  // Actualizar estadísticas
  tenantData[tenantId].stats.totalClients += 1
  tenantData[tenantId].stats.pendingLegalizations += 1

  // Registrar actividad
  tenantData[tenantId].activities.push({
    id: uuidv4(),
    type: "sale",
    clientName: clientData.name,
    timestamp: new Date(),
    details: `${
      clientData.productType === "mobile"
        ? "Plan Móvil"
        : clientData.productType === "home"
          ? "Plan Hogar"
          : clientData.productType === "prepaid"
            ? "Prepago"
            : "Reposición Chip"
    }`,
  })

  return newClient
}

export async function markAsLegalized(tenantId: string, clientId: string) {
  // Simular latencia de red
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Buscar cliente
  const clients = tenantData[tenantId]?.clients || []
  const clientIndex = clients.findIndex((c) => c.id === clientId)

  if (clientIndex === -1) {
    throw new Error("Cliente no encontrado")
  }

  // Actualizar estado de legalización
  tenantData[tenantId].clients[clientIndex].legalizationStatus = "completed"
  tenantData[tenantId].clients[clientIndex].legalizationDate = new Date()
  tenantData[tenantId].clients[clientIndex].status = "active"

  // Actualizar estadísticas
  tenantData[tenantId].stats.pendingLegalizations -= 1
  tenantData[tenantId].stats.completedLegalizations += 1

  // Registrar actividad
  tenantData[tenantId].activities.push({
    id: uuidv4(),
    type: "legalization",
    clientName: tenantData[tenantId].clients[clientIndex].name,
    timestamp: new Date(),
    details: "Legalización completada",
  })

  return tenantData[tenantId].clients[clientIndex]
}

export async function deleteClient(tenantId: string, clientId: string) {
  // Simular latencia de red
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Buscar cliente
  const clients = tenantData[tenantId]?.clients || []
  const client = clients.find((c) => c.id === clientId)

  if (!client) {
    throw new Error("Cliente no encontrado")
  }

  // Eliminar cliente
  tenantData[tenantId].clients = clients.filter((c) => c.id !== clientId)

  // Actualizar estadísticas
  tenantData[tenantId].stats.totalClients -= 1
  if (client.legalizationStatus === "pending") {
    tenantData[tenantId].stats.pendingLegalizations -= 1
  } else if (client.legalizationStatus === "completed") {
    tenantData[tenantId].stats.completedLegalizations -= 1
  }

  // Registrar actividad
  tenantData[tenantId].activities.push({
    id: uuidv4(),
    type: "cancellation",
    clientName: client.name,
    timestamp: new Date(),
    details: "Cliente eliminado del sistema",
  })

  return { success: true }
}

// Función para reportes
export function getMonthsForPeriod(period: string) {
  switch (period) {
    case "current":
      return ["Semana 1", "Semana 2", "Semana 3", "Semana 4"]
    case "previous":
      return ["Semana 1", "Semana 2", "Semana 3", "Semana 4"]
    case "last3":
      return [
        format(subMonths(new Date(), 2), "MMM"),
        format(subMonths(new Date(), 1), "MMM"),
        format(new Date(), "MMM"),
      ]
    case "last6":
      return [
        format(subMonths(new Date(), 5), "MMM"),
        format(subMonths(new Date(), 4), "MMM"),
        format(subMonths(new Date(), 3), "MMM"),
        format(subMonths(new Date(), 2), "MMM"),
        format(subMonths(new Date(), 1), "MMM"),
        format(new Date(), "MMM"),
      ]
    case "year":
      return ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
    default:
      return ["Semana 1", "Semana 2", "Semana 3", "Semana 4"]
  }
}

export async function getSalesData(period: string, tenantId: string) {
  // Simular latencia de red
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Simulamos datos de ventas por tipo de producto
  const months = getMonthsForPeriod(period)

  return months.map((month) => {
    return {
      name: month,
      mobile: Math.floor(Math.random() * 10) + 5,
      home: Math.floor(Math.random() * 8) + 3,
      prepaid: Math.floor(Math.random() * 15) + 10,
      chip: Math.floor(Math.random() * 12) + 8,
    }
  })
}
