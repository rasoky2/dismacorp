"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Construction,
  Zap,
  Hammer,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  Package,
  Wrench,
  Settings,
  Building2,
  Home as HomeIcon,
  Factory,
  Cog,
  HardHat,
  Shield,
  CheckCircle,
} from "lucide-react";
import { createAppointment, getProducts, getProjects, getServices } from "@/lib/actions";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function Home() {
  const [products, setProducts] = useState<Array<{ id: string; name: string; description: string; imageUrl: string; category: string }>>([]);
  const [projects, setProjects] = useState<Array<{ id: string; title: string; description: string; imageUrl: string }>>([]);
  const [services, setServices] = useState<Array<{ id: string; title: string; description: string; tag: string; iconName: string; imageUrl: string | null }>>([]);
  const [activeTab, setActiveTab] = useState<"servicios" | "proyectos" | "productos">("proyectos");

  const getIcon = (iconName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      Construction: <Construction size={32} className="text-white" />,
      Zap: <Zap size={32} className="text-white" />,
      Hammer: <Hammer size={32} className="text-white" />,
      Wrench: <Wrench size={32} className="text-white" />,
      Settings: <Settings size={32} className="text-white" />,
      Building2: <Building2 size={32} className="text-white" />,
      Home: <HomeIcon size={32} className="text-white" />,
      Factory: <Factory size={32} className="text-white" />,
      Cog: <Cog size={32} className="text-white" />,
      HardHat: <HardHat size={32} className="text-white" />,
      Shield: <Shield size={32} className="text-white" />,
      CheckCircle: <CheckCircle size={32} className="text-white" />,
    };
    return iconMap[iconName] || <Wrench size={32} className="text-white" />;
  };

  const getWhatsAppUrl = (itemName: string) => {
    const message = encodeURIComponent(`Hola, me interesa obtener más información sobre: ${itemName}`);
    return `https://wa.me/51965282183?text=${message}`;
  };

  useEffect(() => {
    async function fetchData() {
      const [productsData, projectsData, servicesData] = await Promise.all([
        getProducts(),
        getProjects(),
        getServices(),
      ]);
      setProducts(productsData as Array<{ id: string; name: string; description: string; imageUrl: string; category: string }>);
      setProjects(projectsData as Array<{ id: string; title: string; description: string; imageUrl: string }>);
      setServices(servicesData as Array<{ id: string; title: string; description: string; tag: string; iconName: string; imageUrl: string | null }>);
    }
    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section
        id="inicio"
        className="relative h-screen flex items-center justify-center text-white overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center z-0 scale-105"
          style={{
            backgroundImage:
              "url('/images/photo-1541888946425-d81bb19240f5.jfif')",
          }}
        >
          <div className="absolute inset-0 hero-overlay z-10" />
        </div>

        <div className="container mx-auto px-6 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl text-left"
          >
            <h1 className="text-5xl md:text-8xl font-black mb-6 leading-[0.9] tracking-tighter text-white">
              Construcción y Desarrollo de{" "}
              <span className="text-secondary italic">Alto Nivel</span>
            </h1>
            <div className="w-24 h-1 bg-secondary mb-8"></div>
            <p className="text-xl md:text-2xl mb-12 max-w-2xl text-gray-200 font-medium leading-relaxed">
              Somos <span className="font-black text-white">Disma Corp</span>, una empresa especializada en{" "}
              <span className="font-semibold text-white">obras civiles</span>,{" "}
              <span className="font-semibold text-white">instalaciones eléctricas</span> y{" "}
              <span className="font-semibold text-white">soluciones estructurales</span> para proyectos de{" "}
              <span className="italic text-gray-100">gran y pequeña escala</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <Button
                asChild
                size="lg"
                className="px-10 py-8 bg-secondary hover:bg-white text-white hover:text-primary rounded-2xl font-black transition-all h-auto"
              >
                <Link href="#servicios" className="flex items-center gap-2">
                  Nuestros Servicios
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="px-10 py-8 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-black transition-all backdrop-blur-md border-white/20 h-auto"
              >
                <Link href="#contacto">Agendar Cita</Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 opacity-50"
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
            <div className="w-1 h-3 bg-white rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Servicios Section */}
      <section
        id="servicios"
        className="py-24 bg-white border-b border-gray-100"
      >
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
            <div className="max-w-2xl text-left">
              <h2 className="text-primary font-bold uppercase tracking-[0.3em] text-xs mb-4">
                Especialidades
              </h2>
              <h3 className="text-4xl md:text-6xl font-black text-primary leading-tight">
                Soluciones de alto nivel
              </h3>
            </div>
            <p className="text-gray-500 font-medium max-w-sm md:text-right">
              Tecnología de vanguardia y mano de obra calificada en cada fase.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {services.length > 0 ? (
              services.map((service) => (
                <motion.div
                  whileHover={{ y: -8 }}
                  key={service.id}
                  className="group h-full"
                >
                  <Card className="rounded-xl border-2 border-gray-200 transition-all hover:border-primary hover:shadow-2xl h-full flex flex-col bg-white overflow-hidden">
                    {service.imageUrl && (
                      <div className="h-48 relative overflow-hidden">
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                          style={{ backgroundImage: `url(${service.imageUrl})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                      </div>
                    )}
                    <CardHeader className={`p-8 ${service.imageUrl ? 'pt-6' : ''}`}>
                      {!service.imageUrl && (
                        <div className="mb-6 p-5 bg-primary rounded-lg w-16 h-16 flex items-center justify-center shadow-lg group-hover:bg-secondary transition-all duration-300">
                          {getIcon(service.iconName || "Wrench")}
                        </div>
                      )}
                      <CardTitle className="text-2xl font-black text-primary mb-4">
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-8 pb-8 grow">
                      <p className="text-gray-600 font-medium leading-relaxed text-base">
                        {service.description}
                      </p>
                    </CardContent>
                    <CardFooter className="px-8 pb-8 pt-0 border-t border-gray-100">
                      <Link
                        href="#contacto"
                        className="flex items-center gap-2 text-primary font-bold hover:text-secondary transition-all uppercase text-xs tracking-widest group/link"
                      >
                        Solicitar información <ChevronRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="col-span-3 py-20 text-center text-gray-400">
                <Wrench size={48} className="mx-auto mb-4 opacity-20" />
                <p>No hay servicios disponibles.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Productos Section */}
      <section id="productos" className="py-24 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12 text-left md:text-center">
            <h2 className="text-secondary font-bold uppercase tracking-[0.3em] text-xs mb-4">
              {activeTab === "proyectos" 
                ? "Portafolio de Éxito" 
                : activeTab === "servicios"
                ? "Nuestras Especialidades"
                : "Catálogo Premium"}
            </h2>
            <h3 className="text-4xl md:text-6xl font-black text-primary">
              {activeTab === "proyectos" 
                ? "Proyectos Hechos" 
                : activeTab === "servicios"
                ? "Servicios Especializados"
                : "Suministros Especializados"}
            </h3>
          </div>

          {/* Tabs */}
          <div className="mb-12 flex flex-wrap justify-center gap-4 border-b border-gray-200 pb-4">
            <button
              onClick={() => setActiveTab("proyectos")}
              className={`px-6 py-3 font-bold uppercase tracking-widest text-sm transition-all border-b-2 ${
                activeTab === "proyectos"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              Proyectos
            </button>
            <button
              onClick={() => setActiveTab("servicios")}
              className={`px-6 py-3 font-bold uppercase tracking-widest text-sm transition-all border-b-2 ${
                activeTab === "servicios"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              Servicios
            </button>
            <button
              onClick={() => setActiveTab("productos")}
              className={`px-6 py-3 font-bold uppercase tracking-widest text-sm transition-all border-b-2 ${
                activeTab === "productos"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              Productos
            </button>
          </div>

          {/* Content */}
          {activeTab === "servicios" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {services.length > 0 ? (
                services.map((service) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                    className="h-full"
                  >
                    <Card className="rounded-xl border-2 border-gray-200 transition-all hover:border-primary hover:shadow-2xl h-full flex flex-col bg-white overflow-hidden py-0">
                      {service.imageUrl && (
                        <div className="h-48 relative overflow-hidden">
                          <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                            style={{ backgroundImage: `url(${service.imageUrl})` }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                        </div>
                      )}
                      <CardHeader className={`p-8 ${service.imageUrl ? 'pt-6' : ''}`}>
                        {!service.imageUrl && (
                          <div className="mb-6 p-5 bg-primary rounded-lg w-16 h-16 flex items-center justify-center shadow-lg group-hover:bg-secondary transition-all duration-300">
                            {getIcon(service.iconName || "Wrench")}
                          </div>
                        )}
                        <CardTitle className="text-2xl font-black text-primary mb-4">
                          {service.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="px-8 pb-8 grow">
                        <p className="text-gray-600 font-medium leading-relaxed text-base">
                          {service.description}
                        </p>
                      </CardContent>
                      <CardFooter className="px-8 pb-8 pt-0 border-t border-gray-100">
                        <Link
                          href={getWhatsAppUrl(service.title)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-primary font-bold hover:text-secondary transition-all uppercase text-xs tracking-widest group/link"
                        >
                          Solicitar información <ChevronRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-3 py-20 text-center text-gray-400">
                  <Wrench size={48} className="mx-auto mb-4 opacity-20" />
                  <p>No hay servicios disponibles.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "proyectos" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {projects.length > 0 ? (
                projects.map((project) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                    className="h-full"
                  >
                    <Card className="rounded-xl overflow-hidden border-2 border-gray-200 group h-full flex flex-col bg-white shadow-sm hover:shadow-2xl hover:border-primary transition-all duration-500 py-0">
                      <div className="h-64 relative overflow-hidden">
                        {project.imageUrl ? (
                          <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                            style={{ backgroundImage: `url(${project.imageUrl})` }}
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                            <Construction size={64} className="text-gray-400" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                      </div>
                      <CardHeader className="p-8 pt-6">
                        <CardTitle className="font-black text-2xl text-primary uppercase tracking-tighter mb-2">
                          {project.title}
                        </CardTitle>
                        <CardDescription className="text-gray-500 font-medium leading-relaxed text-sm">
                          {project.description}
                        </CardDescription>
                      </CardHeader>
                      <CardFooter className="px-8 pb-8 pt-0 border-t border-gray-100">
                        <Link
                          href={getWhatsAppUrl(project.title)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-primary font-bold hover:text-secondary transition-all uppercase text-xs tracking-widest group/link"
                        >
                          Solicitar información <ChevronRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-3 py-20 text-center text-gray-400">
                  <Construction size={48} className="mx-auto mb-4 opacity-20" />
                  <p>No hay proyectos disponibles.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "productos" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {products.length > 0 ? (
                products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="h-full"
                  >
                    <Card className="rounded-xl overflow-hidden border border-gray-200 group h-full flex flex-col bg-white shadow-sm hover:shadow-2xl transition-all duration-500 py-0">
                      <div className="h-64 relative overflow-hidden">
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                          style={{ backgroundImage: `url(${product.imageUrl})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                      </div>
                      <CardHeader className="p-8 pt-6">
                        <CardTitle className="font-black text-2xl text-primary uppercase tracking-tighter mb-2">
                          {product.name}
                        </CardTitle>
                        <CardDescription className="text-gray-500 font-medium leading-relaxed italic text-sm">
                          {product.description}
                        </CardDescription>
                      </CardHeader>
                      <CardFooter className="px-8 pb-8 pt-0 border-t border-gray-100">
                        <Link
                          href={getWhatsAppUrl(product.name)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-primary font-bold hover:text-secondary transition-all uppercase text-xs tracking-widest group/link"
                        >
                          Solicitar información <ChevronRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-3 py-20 text-center text-gray-400">
                  <Package size={48} className="mx-auto mb-4 opacity-20" />
                  <p>No se encontraron productos disponibles.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Contacto Section */}
      <section
        id="contacto"
        className="py-24 bg-white relative overflow-hidden"
      >
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="text-left">
              <span className="text-secondary font-black uppercase tracking-widest text-xs mb-6 block">
                Atención Directa
              </span>
              <h2 className="text-5xl md:text-7xl font-black text-primary mb-10 leading-none tracking-tighter">
                ¿Tienes un nuevo reto?
              </h2>
              <p className="text-xl text-gray-500 font-medium mb-12 italic">
                Estamos listos para desplegar nuestra capacidad técnica en tu
                próximo proyecto.
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: <MapPin className="text-secondary" />,
                    label: "Dirección",
                    val: "Av. Los Constructores 123, Lima",
                  },
                  {
                    icon: <Phone className="text-secondary" />,
                    label: "Llámanos",
                    val: "+51 965 282 183",
                  },
                  {
                    icon: <Mail className="text-secondary" />,
                    label: "Correo",
                    val: "contacto@dismacorp.com",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-5 group items-start">
                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center shadow-sm shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                        {item.label}
                      </div>
                      {item.label === "Llámanos" ? (
                        <Link 
                          href="https://wa.me/51965282183" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-lg font-black text-primary hover:text-secondary transition-colors"
                        >
                          {item.val}
                        </Link>
                      ) : (
                        <div className="text-lg font-black text-primary">
                          {item.val}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Card className="bg-white text-primary p-8 md:p-12 rounded-[3rem] shadow-2xl relative border border-gray-200">
              <form
                action={createAppointment}
                className="grid grid-cols-1 gap-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 ml-1">
                      Nombre Completo
                    </Label>
                    <Input
                      name="name"
                      placeholder="Juan Perez"
                      required
                      className="bg-gray-50 border-gray-300 text-primary rounded-xl placeholder:text-gray-400 h-12 focus:border-primary focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 ml-1">
                      Correo Electrónico
                    </Label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="correo@empresa.com"
                      required
                      className="bg-gray-50 border-gray-300 text-primary rounded-xl placeholder:text-gray-400 h-12 focus:border-primary focus:ring-primary"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 ml-1">
                    Teléfono / WhatsApp
                  </Label>
                  <Input
                    name="phone"
                    placeholder="+51 ..."
                    className="bg-gray-50 border-gray-300 text-primary rounded-xl placeholder:text-gray-400 h-12 focus:border-primary focus:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 ml-1">
                    Mensaje o Detalles del Proyecto
                  </Label>
                  <Textarea
                    name="message"
                    placeholder="Describa su requerimiento..."
                    rows={4}
                    className="bg-gray-50 border-gray-300 text-primary rounded-xl placeholder:text-gray-400 resize-none focus:border-primary focus:ring-primary"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-14 bg-primary text-white hover:bg-secondary font-black uppercase tracking-widest rounded-xl transition-all shadow-lg text-sm mt-4"
                >
                  Enviar Solicitud
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
