"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Package,
  FolderKanban,
  Home,
  Menu,
  X,
  HardHat,
  LogOut,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/lib/logout-action";

interface SidebarProps {
  activeTab: "products" | "projects" | "services";
  onTabChange: (tab: "products" | "projects" | "services") => void;
  productsCount: number;
  projectsCount: number;
  servicesCount: number;
}

export default function Sidebar({
  activeTab,
  onTabChange,
  productsCount,
  projectsCount,
  servicesCount,
}: SidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const router = useRouter();

  async function handleLogout() {
    await logoutAction();
  }

  const menuItems = [
    {
      id: "products" as const,
      label: "Productos",
      icon: Package,
      count: productsCount,
    },
    {
      id: "projects" as const,
      label: "Proyectos",
      icon: FolderKanban,
      count: projectsCount,
    },
    {
      id: "services" as const,
      label: "Servicios",
      icon: Wrench,
      count: servicesCount,
    },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="bg-primary hover:bg-secondary text-white rounded-xl p-3 shadow-lg"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-primary text-white z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-white/10">
            <Link
              href="/"
              className="flex items-center gap-3 mb-6 group"
              onClick={() => setIsMobileOpen(false)}
            >
              <div className="p-2 bg-secondary rounded-xl shadow-lg group-hover:bg-accent transition-colors">
                <HardHat size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-black tracking-tighter text-white">
                  DISMA<span className="text-secondary">CORP</span>
                </h2>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-300">
                  Admin Panel
                </p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    setIsMobileOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group",
                    isActive
                      ? "bg-secondary text-white shadow-lg"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  )}
                >
                  <Icon
                    size={20}
                    className={cn(
                      "transition-transform group-hover:scale-110",
                      isActive && "text-white"
                    )}
                  />
                  <span className="font-bold text-sm uppercase tracking-wider flex-1 text-left">
                    {item.label}
                  </span>
                  <span
                    className={cn(
                      "px-2 py-1 rounded-full text-xs font-black",
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-white/10 text-gray-400"
                    )}
                  >
                    {item.count}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-white/10 space-y-2">
            <Link href="/">
              <Button
                variant="outline"
                className="w-full bg-white/10 hover:bg-white/20 text-white border-white/20 gap-2 mb-2"
                onClick={() => setIsMobileOpen(false)}
              >
                <Home size={18} />
                Volver al Sitio
              </Button>
            </Link>
            <form action={handleLogout}>
              <Button
                type="submit"
                variant="outline"
                className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-200 border-red-500/20 gap-2"
                onClick={() => setIsMobileOpen(false)}
              >
                <LogOut size={18} />
                Cerrar Sesión
              </Button>
            </form>
          </div>
        </div>
      </aside>
    </>
  );
}

