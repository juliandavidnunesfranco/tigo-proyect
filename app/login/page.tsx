"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useTenant } from "@/providers/tenant-provider";
import { useAuth } from "@/providers/auth-provider";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { currentTenant } = useTenant();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: "Error",
        description: "Por favor ingresa tu correo y contraseña",
        variant: "destructive",
      });
      return;
    }

    if (!currentTenant) {
      toast({
        title: "Error",
        description: "Debes seleccionar una tienda primero",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulamos login con datos de prueba
      await login(email, password, currentTenant.id);
      router.push("/dashboard");
    } catch {
      toast({
        title: "Error de autenticación",
        description: "Credenciales incorrectas. Intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  /* 
  if (!currentTenant) {
    router.push("/")
    return null
  }
 */
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="text-primary">TIGO</span> CRM
          </h1>
          {/*    <p className="text-muted-foreground">Tienda: {currentTenant.name}</p> */}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Iniciar sesión</CardTitle>
            <CardDescription>
              Ingresa tus credenciales para acceder al sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
              </Button>
            </form>

            <div className="mt-4 text-sm text-center text-muted-foreground">
              <p>Usuarios de prueba:</p>
              <p>vendedor@tigo.com / password</p>
              <p>admin@tigo.com / password</p>
              <p>gerente@tigo.com / password</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
