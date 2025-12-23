"use client";

import { useState, useEffect } from "react";
import { getProducts, getProjects, getServices, createProduct, updateProduct, deleteProduct, createProject, updateProject, deleteProject, createService, updateService, deleteService } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2, X, FolderKanban, Package, Upload, Wrench, Construction, Zap, Hammer, Settings, Building2, Home as HomeIcon, Factory, Cog, HardHat, Shield, CheckCircle } from "lucide-react";
import Sidebar from "@/components/admin/Sidebar";

export default function AdminPanel() {
  const [products, setProducts] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"products" | "projects" | "services">("products");
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [editingService, setEditingService] = useState<any>(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [productImagePreview, setProductImagePreview] = useState<string | null>(null);
  const [projectImagePreview, setProjectImagePreview] = useState<string | null>(null);
  const [serviceImagePreview, setServiceImagePreview] = useState<string | null>(null);

  async function loadData() {
    const [productsData, projectsData, servicesData] = await Promise.all([
      getProducts(),
      getProjects(),
      getServices(),
    ]);
    setProducts(productsData);
    setProjects(projectsData);
    setServices(servicesData);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleProductSubmit(formData: FormData) {
    if (editingProduct) {
      formData.append("id", editingProduct.id);
      if (editingProduct.imageUrl) {
        formData.append("existingImageUrl", editingProduct.imageUrl);
      }
      await updateProduct(formData);
    } else {
      await createProduct(formData);
    }
    setShowProductForm(false);
    setEditingProduct(null);
    setProductImagePreview(null);
    loadData();
  }

  async function handleProjectSubmit(formData: FormData) {
    if (editingProject) {
      formData.append("id", editingProject.id);
      if (editingProject.imageUrl) {
        formData.append("existingImageUrl", editingProject.imageUrl);
      }
      await updateProject(formData);
    } else {
      await createProject(formData);
    }
    setShowProjectForm(false);
    setEditingProject(null);
    setProjectImagePreview(null);
    loadData();
  }

  async function handleServiceSubmit(formData: FormData) {
    if (editingService) {
      formData.append("id", editingService.id);
      if (editingService.imageUrl) {
        formData.append("existingImageUrl", editingService.imageUrl);
      }
      await updateService(formData);
    } else {
      await createService(formData);
    }
    setShowServiceForm(false);
    setEditingService(null);
    setServiceImagePreview(null);
    loadData();
  }

  async function handleDeleteService(id: string) {
    if (confirm("¿Está seguro de eliminar este servicio?")) {
      await deleteService(id);
      loadData();
    }
  }

  async function handleDeleteProduct(id: string) {
    if (confirm("¿Está seguro de eliminar este producto?")) {
      await deleteProduct(id);
      loadData();
    }
  }

  async function handleDeleteProject(id: string) {
    if (confirm("¿Está seguro de eliminar este proyecto?")) {
      await deleteProject(id);
      loadData();
    }
  }

  function startEditProduct(product: any) {
    setEditingProduct(product);
    setProductImagePreview(product.imageUrl || null);
    setShowProductForm(true);
  }

  function startEditProject(project: any) {
    setEditingProject(project);
    setProjectImagePreview(project.imageUrl || null);
    setShowProjectForm(true);
  }

  function startEditService(service: any) {
    setEditingService(service);
    setServiceImagePreview(service.imageUrl || null);
    setShowServiceForm(true);
  }

  function cancelEdit() {
    setEditingProduct(null);
    setEditingProject(null);
    setEditingService(null);
    setProductImagePreview(null);
    setProjectImagePreview(null);
    setServiceImagePreview(null);
    setShowProductForm(false);
    setShowProjectForm(false);
    setShowServiceForm(false);
  }

  function handleProductImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleProjectImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProjectImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleServiceImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setServiceImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        productsCount={products.length}
        projectsCount={projects.length}
        servicesCount={services.length}
      />

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 min-h-screen">
        <div className="p-6 lg:p-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl lg:text-5xl font-black text-primary mb-2">
              {activeTab === "products" 
                ? "Gestión de Productos" 
                : activeTab === "projects"
                ? "Gestión de Proyectos"
                : "Gestión de Servicios"}
            </h1>
            <p className="text-gray-600 font-medium">
              {activeTab === "products"
                ? "Administra el catálogo de productos disponibles"
                : activeTab === "projects"
                ? "Administra los proyectos realizados"
                : "Administra los servicios ofrecidos"}
            </p>
          </div>

          {activeTab === "products" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <div className="text-sm text-gray-500 font-medium">
                  {products.length} producto{products.length !== 1 ? "s" : ""} registrado{products.length !== 1 ? "s" : ""}
                </div>
                <Button
                  onClick={() => {
                    setEditingProduct(null);
                    setShowProductForm(true);
                  }}
                  className="gap-2 bg-primary hover:bg-secondary text-white shadow-lg"
                  size="lg"
                >
                  <Plus size={20} />
                  Nuevo Producto
                </Button>
              </div>

              {showProductForm && (
                <Card className="mb-6 border-2 border-primary shadow-xl">
                  <CardHeader className="bg-primary/5">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-primary text-xl">
                        {editingProduct ? "Editar Producto" : "Nuevo Producto"}
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={cancelEdit}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X size={18} />
                      </Button>
                    </div>
                  </CardHeader>
                <CardContent>
                  <form action={handleProductSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase tracking-widest text-gray-600">
                        Nombre *
                      </Label>
                      <Input
                        name="name"
                        defaultValue={editingProduct?.name || ""}
                        required
                        className="bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase tracking-widest text-gray-600">
                        Descripción
                      </Label>
                      <Textarea
                        name="description"
                        defaultValue={editingProduct?.description || ""}
                        rows={3}
                        className="bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase tracking-widest text-gray-600">
                        Imagen
                      </Label>
                      <div className="space-y-4">
                        {productImagePreview && (
                          <div className="relative w-full h-48 rounded-xl overflow-hidden border-2 border-gray-200">
                            <img
                              src={productImagePreview}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setProductImagePreview(null);
                                const input = document.getElementById("product-image-input") as HTMLInputElement;
                                if (input) input.value = "";
                              }}
                              className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        )}
                        <div className="relative">
                          <Input
                            id="product-image-input"
                            name="image"
                            type="file"
                            accept="image/*"
                            onChange={handleProductImageChange}
                            className="bg-white cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-primary file:text-white hover:file:bg-secondary file:cursor-pointer"
                          />
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 hover:opacity-100 transition-opacity">
                            <div className="bg-primary/10 rounded-xl px-4 py-2 flex items-center gap-2">
                              <Upload size={18} className="text-primary" />
                              <span className="text-xs font-bold text-primary uppercase">Subir Imagen</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500">
                          Formatos aceptados: JPG, PNG, WEBP. La imagen se convertirá automáticamente a WebP.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Button type="submit" className="bg-primary hover:bg-secondary">
                        {editingProduct ? "Actualizar" : "Crear"}
                      </Button>
                      <Button type="button" variant="outline" onClick={cancelEdit}>
                        Cancelar
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.length > 0 ? (
                  products.map((product) => (
                    <Card
                      key={product.id}
                      className="border border-gray-200 hover:shadow-xl transition-all duration-300 group"
                    >
                      <div className="h-48 bg-gray-100 rounded-t-xl overflow-hidden relative">
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                            <Package size={48} className="text-gray-400" />
                          </div>
                        )}
                      </div>
                      <CardHeader>
                        <CardTitle className="text-lg font-black text-primary mb-2">
                          {product.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[2.5rem]">
                          {product.description || "Sin descripción"}
                        </p>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => startEditProduct(product)}
                            variant="outline"
                            size="sm"
                            className="flex-1 gap-2 hover:bg-primary hover:text-white transition-colors"
                          >
                            <Edit size={14} />
                            Editar
                          </Button>
                          <Button
                            onClick={() => handleDeleteProduct(product.id)}
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 gap-2"
                          >
                            <Trash2 size={14} />
                            Eliminar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center">
                    <Package size={64} className="mx-auto mb-4 text-gray-300" />
                    <p className="text-gray-500 font-medium">No hay productos registrados</p>
                    <p className="text-sm text-gray-400 mt-2">Crea tu primer producto para comenzar</p>
                  </div>
                )}
              </div>
            </div>
          )}

              {activeTab === "projects" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-6">
                    <div className="text-sm text-gray-500 font-medium">
                      {projects.length} proyecto{projects.length !== 1 ? "s" : ""} registrado{projects.length !== 1 ? "s" : ""}
                    </div>
                    <Button
                      onClick={() => {
                        setEditingProject(null);
                        setShowProjectForm(true);
                      }}
                      className="gap-2 bg-primary hover:bg-secondary text-white shadow-lg"
                      size="lg"
                    >
                      <Plus size={20} />
                      Nuevo Proyecto
                    </Button>
                  </div>

                  {showProjectForm && (
                    <Card className="mb-6 border-2 border-primary shadow-xl">
                      <CardHeader className="bg-primary/5">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-primary text-xl">
                            {editingProject ? "Editar Proyecto" : "Nuevo Proyecto"}
                          </CardTitle>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={cancelEdit}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <X size={18} />
                          </Button>
                        </div>
                      </CardHeader>
                <CardContent>
                  <form action={handleProjectSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase tracking-widest text-gray-600">
                        Título *
                      </Label>
                      <Input
                        name="title"
                        defaultValue={editingProject?.title || ""}
                        required
                        className="bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase tracking-widest text-gray-600">
                        Descripción
                      </Label>
                      <Textarea
                        name="description"
                        defaultValue={editingProject?.description || ""}
                        rows={4}
                        className="bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase tracking-widest text-gray-600">
                        Imagen
                      </Label>
                      <div className="space-y-4">
                        {projectImagePreview && (
                          <div className="relative w-full h-48 rounded-xl overflow-hidden border-2 border-gray-200">
                            <img
                              src={projectImagePreview}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setProjectImagePreview(null);
                                const input = document.getElementById("project-image-input") as HTMLInputElement;
                                if (input) input.value = "";
                              }}
                              className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        )}
                        <div className="relative">
                          <Input
                            id="project-image-input"
                            name="image"
                            type="file"
                            accept="image/*"
                            onChange={handleProjectImageChange}
                            className="bg-white cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-primary file:text-white hover:file:bg-secondary file:cursor-pointer"
                          />
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 hover:opacity-100 transition-opacity">
                            <div className="bg-primary/10 rounded-xl px-4 py-2 flex items-center gap-2">
                              <Upload size={18} className="text-primary" />
                              <span className="text-xs font-bold text-primary uppercase">Subir Imagen</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500">
                          Formatos aceptados: JPG, PNG, WEBP. La imagen se convertirá automáticamente a WebP.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Button type="submit" className="bg-primary hover:bg-secondary">
                        {editingProject ? "Actualizar" : "Crear"}
                      </Button>
                      <Button type="button" variant="outline" onClick={cancelEdit}>
                        Cancelar
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {projects.length > 0 ? (
                      projects.map((project) => (
                        <Card
                          key={project.id}
                          className="border border-gray-200 hover:shadow-xl transition-all duration-300 group"
                        >
                          <div className="h-48 bg-gray-100 rounded-t-xl overflow-hidden relative">
                            {project.imageUrl ? (
                              <img
                                src={project.imageUrl}
                                alt={project.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                                <FolderKanban size={48} className="text-gray-400" />
                              </div>
                            )}
                          </div>
                          <CardHeader>
                            <CardTitle className="text-lg font-black text-primary">
                              {project.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-gray-600 mb-4 line-clamp-3 min-h-[4rem]">
                              {project.description || "Sin descripción"}
                            </p>
                            <div className="flex gap-2">
                              <Button
                                onClick={() => startEditProject(project)}
                                variant="outline"
                                size="sm"
                                className="flex-1 gap-2 hover:bg-primary hover:text-white transition-colors"
                              >
                                <Edit size={14} />
                                Editar
                              </Button>
                              <Button
                                onClick={() => handleDeleteProject(project.id)}
                                variant="outline"
                                size="sm"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 gap-2"
                              >
                                <Trash2 size={14} />
                                Eliminar
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="col-span-full py-20 text-center">
                        <FolderKanban size={64} className="mx-auto mb-4 text-gray-300" />
                        <p className="text-gray-500 font-medium">No hay proyectos registrados</p>
                        <p className="text-sm text-gray-400 mt-2">Crea tu primer proyecto para comenzar</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "services" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-6">
                    <div className="text-sm text-gray-500 font-medium">
                      {services.length} servicio{services.length !== 1 ? "s" : ""} registrado{services.length !== 1 ? "s" : ""}
                    </div>
                    <Button
                      onClick={() => {
                        setEditingService(null);
                        setShowServiceForm(true);
                      }}
                      className="gap-2 bg-primary hover:bg-secondary text-white shadow-lg"
                      size="lg"
                    >
                      <Plus size={20} />
                      Nuevo Servicio
                    </Button>
                  </div>

                  {showServiceForm && (
                    <Card className="mb-6 border-2 border-primary shadow-xl">
                      <CardHeader className="bg-primary/5">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-primary text-xl">
                            {editingService ? "Editar Servicio" : "Nuevo Servicio"}
                          </CardTitle>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={cancelEdit}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <X size={18} />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <form action={handleServiceSubmit} encType="multipart/form-data" className="space-y-4">
                          <div className="space-y-2">
                            <Label className="text-xs font-bold uppercase tracking-widest text-gray-600">
                              Título *
                            </Label>
                            <Input
                              name="title"
                              defaultValue={editingService?.title || ""}
                              required
                              className="bg-white"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs font-bold uppercase tracking-widest text-gray-600">
                              Descripción
                            </Label>
                            <Textarea
                              name="description"
                              defaultValue={editingService?.description || ""}
                              rows={4}
                              className="bg-white"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs font-bold uppercase tracking-widest text-gray-600">
                              Icono
                            </Label>
                            <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                              {[
                                { name: "Construction", icon: Construction },
                                { name: "Zap", icon: Zap },
                                { name: "Hammer", icon: Hammer },
                                { name: "Wrench", icon: Wrench },
                                { name: "Settings", icon: Settings },
                                { name: "Building2", icon: Building2 },
                                { name: "Home", icon: HomeIcon },
                                { name: "Factory", icon: Factory },
                                { name: "Cog", icon: Cog },
                                { name: "HardHat", icon: HardHat },
                                { name: "Shield", icon: Shield },
                                { name: "CheckCircle", icon: CheckCircle },
                              ].map(({ name, icon: Icon }) => (
                                <label
                                  key={name}
                                  className={`cursor-pointer p-3 rounded-lg border-2 transition-all flex flex-col items-center justify-center gap-2 ${
                                    editingService?.iconName === name || (!editingService?.iconName && name === "Wrench")
                                      ? "border-primary bg-primary/10"
                                      : "border-gray-200 hover:border-gray-300"
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name="iconName"
                                    value={name}
                                    defaultChecked={editingService?.iconName === name || (!editingService?.iconName && name === "Wrench")}
                                    className="hidden"
                                  />
                                  <Icon size={24} className="text-primary" />
                                  <span className="text-[10px] font-bold text-gray-600 uppercase">{name}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs font-bold uppercase tracking-widest text-gray-600">
                              Imagen
                            </Label>
                            <div className="space-y-4">
                              {serviceImagePreview && (
                                <div className="relative w-full h-48 rounded-xl overflow-hidden border-2 border-gray-200">
                                  <img
                                    src={serviceImagePreview}
                                    alt="Vista previa"
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}
                              <div className="flex items-center gap-4">
                                <label className="flex-1 cursor-pointer">
                                  <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleServiceImageChange}
                                    className="hidden"
                                  />
                                  <div className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-primary transition-colors bg-gray-50">
                                    <Upload size={20} className="text-gray-400" />
                                    <span className="text-sm font-bold text-gray-600 uppercase tracking-wider">
                                      {serviceImagePreview ? "Cambiar imagen" : "Subir imagen"}
                                    </span>
                                  </div>
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-4">
                            <Button type="submit" className="bg-primary hover:bg-secondary">
                              {editingService ? "Actualizar" : "Crear"}
                            </Button>
                            <Button type="button" variant="outline" onClick={cancelEdit}>
                              Cancelar
                            </Button>
                          </div>
                        </form>
                      </CardContent>
                    </Card>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {services.length > 0 ? (
                      services.map((service) => (
                        <Card
                          key={service.id}
                          className="border border-gray-200 hover:shadow-xl transition-all duration-300 group"
                        >
                          {service.imageUrl && (
                            <div className="h-48 bg-gray-100 rounded-t-xl overflow-hidden relative">
                              <img
                                src={service.imageUrl}
                                alt={service.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            </div>
                          )}
                          <CardHeader>
                            <div className="flex items-start justify-between mb-4">
                              <div className="p-4 bg-primary rounded-lg w-16 h-16 flex items-center justify-center shadow-lg">
                                <Wrench size={32} className="text-white" />
                              </div>
                            </div>
                            <CardTitle className="text-lg font-black text-primary mb-2">
                              {service.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-gray-600 mb-4 line-clamp-3 min-h-[4rem]">
                              {service.description || "Sin descripción"}
                            </p>
                            <div className="flex gap-2">
                              <Button
                                onClick={() => startEditService(service)}
                                variant="outline"
                                size="sm"
                                className="flex-1 gap-2 hover:bg-primary hover:text-white transition-colors"
                              >
                                <Edit size={14} />
                                Editar
                              </Button>
                              <Button
                                onClick={() => handleDeleteService(service.id)}
                                variant="outline"
                                size="sm"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 gap-2"
                              >
                                <Trash2 size={14} />
                                Eliminar
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="col-span-full py-20 text-center">
                        <Wrench size={64} className="mx-auto mb-4 text-gray-300" />
                        <p className="text-gray-500 font-medium">No hay servicios registrados</p>
                        <p className="text-sm text-gray-400 mt-2">Crea tu primer servicio para comenzar</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
        </div>
      </main>
    </div>
  );
}
