export function LoadingScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="flex flex-col items-center">
        <div className="text-4xl font-bold mb-2">
          <span className="text-primary">TIGO</span> CRM
        </div>
        <div className="mt-4 text-muted-foreground">Cargando...</div>
        <div className="mt-2 w-16 h-1 bg-muted overflow-hidden rounded-full">
          <div className="h-full bg-primary animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}
