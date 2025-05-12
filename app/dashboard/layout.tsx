"use client";

import type React from "react";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { useAuth } from "@/providers/auth-provider";
import { useTenant } from "@/providers/tenant-provider";
import { LoadingScreen } from "@/components/loading-screen";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //const router = useRouter();
 /*  const { user, isLoading } = useAuth();
  const { currentTenant } = useTenant();

  useEffect(() => {
    // Redirigir si no hay usuario autenticado o tenant seleccionado
    if (!isLoading && (!user || !currentTenant)) {
      router.push("/");
    }
  }, [user, currentTenant, isLoading, router]);

  if (isLoading || !user || !currentTenant) {
    return <LoadingScreen />;
  } */

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 md:p-6 overflow-auto"> {children}</main>
      </div>
    </div>
  );
}
