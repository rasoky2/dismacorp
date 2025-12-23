"use server";

import db from "./db";
import { v4 as uuidv4 } from "uuid";
import { uploadImage, deleteImage } from "./upload";

export async function getProducts() {
  try {
    const products = db
      .prepare("SELECT * FROM products ORDER BY createdAt DESC")
      .all();
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getProjects() {
  try {
    const projects = db
      .prepare("SELECT * FROM projects ORDER BY createdAt DESC")
      .all();
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function getServices() {
  try {
    const services = db
      .prepare("SELECT * FROM services ORDER BY createdAt DESC")
      .all();
    return services;
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

export async function createAppointment(formData: FormData): Promise<void> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const message = formData.get("message") as string;

  if (!name || !email) return;

  const id = uuidv4();

  try {
    const stmt = db.prepare(`
      INSERT INTO appointments (id, name, email, phone, message)
      VALUES (?, ?, ?, ?, ?)
    `);
    stmt.run(id, name, email, phone || null, message || null);
  } catch (error) {
    console.error("Error saving appointment:", error);
  }
}

// Admin actions for products
export async function createProduct(formData: FormData): Promise<void> {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const imageFile = formData.get("image") as File | null;
  const category = formData.get("category") as string;

  if (!name) return;

  const id = uuidv4();
  let imageUrl: string | null = null;

  try {
    if (imageFile && imageFile.size > 0) {
      imageUrl = await uploadImage(imageFile);
    }

    const stmt = db.prepare(`
      INSERT INTO products (id, name, description, price, imageUrl, category)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    stmt.run(id, name, description || null, null, imageUrl, category || null);
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
}

export async function updateProduct(formData: FormData): Promise<void> {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const imageFile = formData.get("image") as File | null;
  const existingImageUrl = formData.get("existingImageUrl") as string | null;
  const category = formData.get("category") as string;

  if (!id || !name) return;

  try {
    let imageUrl: string | null = existingImageUrl || null;

    if (imageFile && imageFile.size > 0) {
      if (existingImageUrl) {
        await deleteImage(existingImageUrl);
      }
      imageUrl = await uploadImage(imageFile);
    }

    const stmt = db.prepare(`
      UPDATE products 
      SET name = ?, description = ?, price = ?, imageUrl = ?, category = ?
      WHERE id = ?
    `);
    stmt.run(name, description || null, null, imageUrl, category || null, id);
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

export async function deleteProduct(id: string): Promise<void> {
  try {
    const product = db.prepare("SELECT imageUrl FROM products WHERE id = ?").get(id) as { imageUrl: string | null } | undefined;
    
    if (product?.imageUrl) {
      await deleteImage(product.imageUrl);
    }

    const stmt = db.prepare("DELETE FROM products WHERE id = ?");
    stmt.run(id);
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}

// Admin actions for projects
export async function createProject(formData: FormData): Promise<void> {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const imageFile = formData.get("image") as File | null;

  if (!title) return;

  const id = uuidv4();
  let imageUrl: string | null = null;

  try {
    if (imageFile && imageFile.size > 0) {
      imageUrl = await uploadImage(imageFile);
    }

    const stmt = db.prepare(`
      INSERT INTO projects (id, title, description, imageUrl)
      VALUES (?, ?, ?, ?)
    `);
    stmt.run(id, title, description || null, imageUrl);
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
}

export async function updateProject(formData: FormData): Promise<void> {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const imageFile = formData.get("image") as File | null;
  const existingImageUrl = formData.get("existingImageUrl") as string | null;

  if (!id || !title) return;

  try {
    let imageUrl: string | null = existingImageUrl || null;

    if (imageFile && imageFile.size > 0) {
      if (existingImageUrl) {
        await deleteImage(existingImageUrl);
      }
      imageUrl = await uploadImage(imageFile);
    }

    const stmt = db.prepare(`
      UPDATE projects 
      SET title = ?, description = ?, imageUrl = ?
      WHERE id = ?
    `);
    stmt.run(title, description || null, imageUrl, id);
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
}

export async function deleteProject(id: string): Promise<void> {
  try {
    const project = db.prepare("SELECT imageUrl FROM projects WHERE id = ?").get(id) as { imageUrl: string | null } | undefined;
    
    if (project?.imageUrl) {
      await deleteImage(project.imageUrl);
    }

    const stmt = db.prepare("DELETE FROM projects WHERE id = ?");
    stmt.run(id);
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
}

// Admin actions for services
export async function createService(formData: FormData): Promise<void> {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const tag = formData.get("tag") as string;
  const iconName = formData.get("iconName") as string;
  const imageFile = formData.get("image") as File | null;

  if (!title) return;

  const id = uuidv4();
  let imageUrl: string | null = null;

  try {
    if (imageFile && imageFile.size > 0) {
      imageUrl = await uploadImage(imageFile);
    }

    const stmt = db.prepare(`
      INSERT INTO services (id, title, description, tag, iconName, imageUrl)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    stmt.run(id, title, description || null, tag || null, iconName || null, imageUrl);
  } catch (error) {
    console.error("Error creating service:", error);
    throw error;
  }
}

export async function updateService(formData: FormData): Promise<void> {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const tag = formData.get("tag") as string;
  const iconName = formData.get("iconName") as string;
  const imageFile = formData.get("image") as File | null;
  const existingImageUrl = formData.get("existingImageUrl") as string | null;

  if (!id || !title) return;

  try {
    let imageUrl: string | null = existingImageUrl || null;

    if (imageFile && imageFile.size > 0) {
      if (existingImageUrl) {
        await deleteImage(existingImageUrl);
      }
      imageUrl = await uploadImage(imageFile);
    }

    const stmt = db.prepare(`
      UPDATE services 
      SET title = ?, description = ?, tag = ?, iconName = ?, imageUrl = ?
      WHERE id = ?
    `);
    stmt.run(title, description || null, tag || null, iconName || null, imageUrl, id);
  } catch (error) {
    console.error("Error updating service:", error);
    throw error;
  }
}

export async function deleteService(id: string): Promise<void> {
  try {
    const service = db.prepare("SELECT imageUrl FROM services WHERE id = ?").get(id) as { imageUrl: string | null } | undefined;
    
    if (service?.imageUrl) {
      await deleteImage(service.imageUrl);
    }

    const stmt = db.prepare("DELETE FROM services WHERE id = ?");
    stmt.run(id);
  } catch (error) {
    console.error("Error deleting service:", error);
    throw error;
  }
}