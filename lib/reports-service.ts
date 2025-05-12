import { subDays, format, subMonths } from "date-fns"

// Función para generar datos de ventas para gráficos
export async function getSalesData(period: string) {
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

// Función para generar datos de comisiones para gráficos
export async function getCommissionsData(period: string) {
  // Simulamos datos de comisiones
  const months = getMonthsForPeriod(period)

  return months.map((month) => {
    const sales = Math.floor(Math.random() * 5000000) + 3000000
    const commission = Math.round(sales * (Math.random() * 0.2 + 0.7))

    return {
      name: month,
      sales,
      commission,
    }
  })
}

// Función para generar datos de legalizaciones para gráficos
export async function getLegalizationsData(period: string) {
  // Simulamos datos de legalizaciones
  const months = getMonthsForPeriod(period)

  return months.map((month) => {
    const sales = Math.floor(Math.random() * 20) + 15
    const legalizations = Math.floor(sales * (Math.random() * 0.3 + 0.7))

    return {
      name: month,
      sales,
      legalizations,
      avgTime: Math.floor(Math.random() * 24) + 12,
    }
  })
}

// Función para generar datos de ventas para tablas
export async function getSalesTableData(period: string) {
  // Simulamos datos de ventas para la tabla
  const numRecords = 20
  const sales = []

  for (let i = 0; i < numRecords; i++) {
    const productTypes = ["mobile", "home", "prepaid", "chip"]
    const productType = productTypes[Math.floor(Math.random() * productTypes.length)]

    let value = 0
    switch (productType) {
      case "mobile":
        value = 150000
        break
      case "home":
        value = 200000
        break
      case "prepaid":
        value = 50000
        break
      case "chip":
        value = 20000
        break
    }

    sales.push({
      id: `sale-${i}`,
      date: subDays(new Date(), Math.floor(Math.random() * 30)),
      clientName: getRandomName(),
      documentId: getRandomDocumentId(),
      productType,
      legalizationStatus: Math.random() > 0.3 ? "completed" : "pending",
      value,
    })
  }

  return sales.sort((a, b) => b.date.getTime() - a.date.getTime())
}

// Función para generar datos de comisiones para tablas
export async function getCommissionsTableData(period: string) {
  // Simulamos datos de comisiones por tipo de producto
  const data = [
    {
      type: "mobile",
      name: "Plan Móvil",
      count: Math.floor(Math.random() * 20) + 10,
      sales: 0,
      desertionRate: Math.floor(Math.random() * 15) + 5,
      commission: 0,
    },
    {
      type: "home",
      name: "Plan Hogar",
      count: Math.floor(Math.random() * 15) + 5,
      sales: 0,
      desertionRate: Math.floor(Math.random() * 10) + 5,
      commission: 0,
    },
    {
      type: "prepaid",
      name: "Prepago",
      count: Math.floor(Math.random() * 30) + 20,
      sales: 0,
      desertionRate: Math.floor(Math.random() * 20) + 10,
      commission: 0,
    },
    {
      type: "chip",
      name: "Reposición Chip",
      count: Math.floor(Math.random() * 25) + 15,
      sales: 0,
      desertionRate: Math.floor(Math.random() * 5) + 2,
      commission: 0,
    },
  ]

  // Calculamos ventas y comisiones
  let totalSales = 0
  data.forEach((item) => {
    let value = 0
    switch (item.type) {
      case "mobile":
        value = 150000
        break
      case "home":
        value = 200000
        break
      case "prepaid":
        value = 50000
        break
      case "chip":
        value = 20000
        break
    }

    item.sales = item.count * value
    totalSales += item.sales

    const commissionRate = item.desertionRate < 20 ? 1 : 1 - (item.desertionRate - 20) * 0.05
    item.commission = Math.round(item.sales * commissionRate)
  })

  // Calculamos totales
  const totalCommission = data.reduce((sum, item) => sum + item.commission, 0)
  const avgDesertionRate = Math.round(
    data.reduce((sum, item) => sum + item.desertionRate * (item.sales / totalSales), 0),
  )
  const commissionRate = avgDesertionRate < 20 ? 100 : Math.round(100 - (avgDesertionRate - 20) * 5)

  return {
    data,
    totals: {
      totalSales,
      totalCommission,
      commissionRate,
    },
  }
}

// Función auxiliar para obtener meses según el período
function getMonthsForPeriod(period: string) {
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

// Funciones auxiliares para generar datos aleatorios
function getRandomName() {
  const names = [
    "JUAN CARLOS PEREZ",
    "MARIA FERNANDA GOMEZ",
    "CARLOS ALBERTO RODRIGUEZ",
    "ANA MARIA MARTINEZ",
    "LUIS FERNANDO LOPEZ",
    "PATRICIA SANCHEZ",
    "JOSE ANTONIO DIAZ",
    "CLAUDIA PATRICIA TORRES",
    "ANDRES FELIPE RAMIREZ",
    "CAROLINA HERNANDEZ",
  ]

  return names[Math.floor(Math.random() * names.length)]
}

function getRandomDocumentId() {
  return Math.floor(Math.random() * 90000000 + 10000000).toString()
}
