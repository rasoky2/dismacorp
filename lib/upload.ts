"use server";

import sharp from "sharp";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const BUCKET_DIR = path.join(process.cwd(), "public", "bucket");

export async function uploadImage(file: File): Promise<string> {
  try {
    await mkdir(BUCKET_DIR, { recursive: true });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uniqueId = uuidv4();
    const filename = `${uniqueId}.webp`;
    const filepath = path.join(BUCKET_DIR, filename);

    await sharp(buffer)
      .webp({ quality: 85, effort: 6 })
      .resize(1200, 1200, {
        fit: "inside",
        withoutEnlargement: true,
      })
      .toFile(filepath);

    return `/bucket/${filename}`;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Error al subir la imagen");
  }
}

export async function deleteImage(imageUrl: string): Promise<void> {
  try {
    if (!imageUrl || !imageUrl.startsWith("/bucket/")) {
      return;
    }

    const filepath = path.join(process.cwd(), "public", imageUrl);
    const fs = await import("fs/promises");
    
    try {
      await fs.unlink(filepath);
    } catch (error: any) {
      if (error.code !== "ENOENT") {
        console.error("Error deleting image:", error);
      }
    }
  } catch (error) {
    console.error("Error deleting image:", error);
  }
}

