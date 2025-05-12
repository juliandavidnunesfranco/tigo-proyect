export const supabase = {
  from: () => ({
    select: () => ({
      order: () => Promise.resolve({ data: [], error: null }),
    }),
    insert: () => ({
      select: () => Promise.resolve({ data: [{}], error: null }),
    }),
  }),
}

// Funciones simuladas que no hacen nada pero no causan errores
export async function getClientsFromDB() {
  return []
}

export async function addClientToDB(clientData: any) {
  return { ...clientData, id: "simulated-id" }
}
