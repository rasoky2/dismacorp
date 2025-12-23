"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "@/lib/auth-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HardHat, Lock, User, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setError("");
    setIsLoading(true);

    try {
      const username = formData.get("username") as string;
      const password = formData.get("password") as string;

      const result = await loginAction(username, password);

      if (result.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(result.error || "Usuario o contraseña incorrectos");
      }
    } catch {
      setError("Error al iniciar sesión. Intente nuevamente.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary to-secondary flex items-center justify-center p-6">
      <Card className="w-full max-w-md border-2 border-white/20 shadow-2xl bg-white/95 backdrop-blur-md">
        <CardHeader className="text-center pb-8 pt-8">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary rounded-2xl shadow-lg">
              <HardHat size={40} className="text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-black text-primary mb-2">
            DISMA<span className="text-secondary">CORP</span>
          </CardTitle>
          <p className="text-gray-600 font-medium text-sm uppercase tracking-widest">
            Panel de Administración
          </p>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-6">
            {error && (
              <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
                <AlertCircle size={20} />
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-gray-600 flex items-center gap-2">
                <User size={16} />
                Usuario
              </Label>
              <Input
                name="username"
                type="text"
                required
                className="bg-white h-12"
                placeholder="Ingrese su usuario"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-gray-600 flex items-center gap-2">
                <Lock size={16} />
                Contraseña
              </Label>
              <Input
                name="password"
                type="password"
                required
                className="bg-white h-12"
                placeholder="Ingrese su contraseña"
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-primary hover:bg-secondary text-white font-black uppercase tracking-widest text-sm shadow-lg"
            >
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

