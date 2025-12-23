import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "disma.db");
const db = new Database(dbPath);

// Inicializar tablas
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price TEXT,
    imageUrl TEXT,
    category TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    imageUrl TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS appointments (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    message TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS services (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    tag TEXT,
    iconName TEXT,
    imageUrl TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Seed initial data if empty
const check = db.prepare("SELECT count(*) as count FROM products").get() as {
  count: number;
};
if (check.count === 0) {
  const insert = db.prepare(`
        INSERT INTO products (id, name, description, price, imageUrl, category)
        VALUES (?, ?, ?, ?, ?, ?)
    `);

  const initialProducts = [
    {
      id: "1",
      name: "Materiales de Construcción",
      description:
        "Cemento, bloques, varillas y morteros de primeras marcas. Entregas bajo pedido.",
      price: "Consulte volumen",
      imageUrl: "/images/photo-1541888946425-d81bb19240f5.jfif",
      category: "Materiales",
    },
    {
      id: "2",
      name: "Herrajes y Accesorios",
      description:
        "Tornillería técnica, bisagras reforzadas y cerraduras de alta seguridad.",
      price: "Desde S/ 15.00",
      imageUrl: "/images/photo-1541888946425-d81bb19240f5.jfif",
      category: "Accesorios",
    },
    {
      id: "3",
      name: "Acabados y Revestimientos",
      description:
        "Pisos de alto tránsito, cerámicos y selladores industriales.",
      price: "Por m2",
      imageUrl: "/images/photo-1541888946425-d81bb19240f5.jfif",
      category: "Acabados",
    },
  ];

  for (const p of initialProducts) {
    insert.run(p.id, p.name, p.description, p.price, p.imageUrl, p.category);
  }
}

// Seed initial services if empty
const checkServices = db.prepare("SELECT count(*) as count FROM services").get() as {
  count: number;
};
if (checkServices.count === 0) {
  const insertService = db.prepare(`
    INSERT INTO services (id, title, description, tag, iconName)
    VALUES (?, ?, ?, ?, ?)
  `);

  const initialServices = [
    {
      id: "1",
      title: "Obras y Proyectos",
      description: "Planificación y ejecución completa de obras residenciales, comerciales e industriales con los más altos estándares.",
      tag: "Ingeniería",
      iconName: "Construction",
    },
    {
      id: "2",
      title: "Instalaciones Técnicas",
      description: "Sistemas eléctricos, hidráulicos e integrados de alta eficiencia diseñados para durar.",
      tag: "Especializado",
      iconName: "Zap",
    },
    {
      id: "3",
      title: "Acabados Premium",
      description: "Detalles arquitectónicos, revestimientos y carpintería fina para entregar espacios con distinción.",
      tag: "Arquitectura",
      iconName: "Hammer",
    },
  ];

  for (const s of initialServices) {
    insertService.run(s.id, s.title, s.description, s.tag, s.iconName);
  }
}

export default db;
