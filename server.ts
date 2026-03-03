import "reflect-metadata";
import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { DataSource, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

// Define the Project Entity
@Entity("projects")
export class Project {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column({ type: "varchar" })
  title!: string;

  @Column({ type: "text" })
  description!: string;

  @Column({ type: "varchar", nullable: true })
  image_url!: string;

  @Column({ type: "json", nullable: true })
  images!: string[];

  @Column({ type: "varchar", nullable: true })
  tags!: string;

  @Column({ type: "varchar", nullable: true })
  project_url!: string;

  @CreateDateColumn({ type: "timestamp" })
  created_at!: Date;
}

// Initialize TypeORM Database Connection
const isLocal = !process.env.DATABASE_URL || process.env.DATABASE_URL.includes("localhost");

const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true, // Auto-create tables (warning: use migrations in production)
  logging: false,
  entities: [Project],
  ssl: isLocal ? false : { rejectUnauthorized: false }
});

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

  app.use(cors());
  app.use(express.json());

  try {
    await AppDataSource.initialize();
    console.log("Database connected successfully");

    const projectRepository = AppDataSource.getRepository(Project);

    // Auto-seed on startup if the database is empty
    const count = await projectRepository.count();
    if (count === 0) {
      console.log("Database is empty. Populating initial projects...");
      const initialProjects = [
        {
          title: "Héroes Cercanos",
          description: "Plataforma web solidaria que conecta voluntarios y donantes con organizaciones y causas sociales. Incluye mapas interactivos, sistema de gestión de donaciones y perfiles para ONGs.",
          image_url: "/heroes-1.png",
          images: [
            "/heroes-1.png",
            "/heroes-2.png",
            "/heroes-3.png",
            "/heroes-4.png",
            "/heroes-5.png",
            "/heroes-6.png",
            "/heroes-7.png",
            "/heroes-8.png",
            "/heroes-9.png",
            "/heroes-10.png",
            "/heroes-11.png",
            "/heroes-12.png",
            "/heroes-responsive-1.png",
            "/heroes-responsive-2.png"
          ],
          tags: "React, TypeScript, Tailwind, Node.js, PostgreSQL",
          project_url: "https://heroes-cercanos-rho.vercel.app/"
        },
        {
          title: "ORAU - Orgullo Austral",
          description: "Plataforma de gestión integral para la marca Orgullo Austral, diseñada para administrar productos, ventas y comunicación con clientes. Cuenta con un frontend dinámico en React y un backend escalable en NestJS.",
          image_url: "/orau-1.png",
          images: [
            "/orau-1.png",
            "/orau-2.png",
            "/orau-3.png",
            "/orau-4.png",
            "/orau-5.png",
            "/orau-6.png",
            "/orau-7.png",
            "/orau-8.png",
            "/orau-9.png"
          ],
          tags: "React, NestJS, PostgreSQL, TypeORM, Cloudinary",
          project_url: "https://github.com/manucastroa7/orau-frontend"
        },
        {
          title: "Sistema de Gestión de Reservas",
          description: "Interfaz de usuario moderna para la gestión operativa de hoteles. Incluye calendario interactivo, dashboards operativos, gestión de recursos humanos y control de gastos financieros.",
          image_url: "/sistema-reservas-3.png",
          images: [
            "/sistema-reservas-2.png",
            "/sistema-reservas-3.png",
            "/sistema-reservas-4.png",
            "/sistema-reservas-5.png",
            "/sistema-reservas-6.png",
            "/sistema-reservas-7.png",
            "/sistema-reservas-8.png",
            "/sistema-reservas-9.png",
            "/sistema-reservas-10.png",
            "/sistema-reservas-11.png",
            "/sistema-reservas-12.png",
            "/sistema-reservas-13.png"
          ],
          tags: "React, Vite, Tailwind CSS, Lucide React, date-fns",
          project_url: "https://github.com/manucastroa7/sistemaReservas-front"
        },
        {
          title: "Agent Sport - Gestión de Talentos",
          description: "Plataforma Full Stack diseñada para llevar el perfil del futbolista del caos al orden. Resuelve el problema de la información dispersa en PDFs, Excels y chats, centralizando los datos de la plantilla para que los agentes puedan generar cartas de presentación dinámicas y profesionales en un solo link.",
          image_url: "/agentsport-1.png",
          images: [
            "/agentsport-1.png",
            "/agentsport-2.png",
            "/agentsport-3.png",
            "/agentsport-4.png",
            "/agentsport-5.png",
            "/agentsport-6.png",
            "/agentsport-8.png",
            "/agentsport-9.png"
          ],
          tags: "React 19, NestJS, Tailwind 4, Shadcn UI, Zustand, Framer Motion",
          project_url: "https://github.com/manucastroa7/agentesRepresentacion"
        }
      ];

      for (const projectData of initialProjects) {
        const project = projectRepository.create(projectData);
        await projectRepository.save(project);
      }
      console.log("Database seeded successfully during startup.");
    }

  } catch (err) {
    console.error("Error connecting to the database:", err);
    process.exit(1);
  }

  const projectRepository = AppDataSource.getRepository(Project);

  // API Routes
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await projectRepository.find({
        order: { created_at: "DESC" }
      });
      res.json(projects);
    } catch (error) {
      console.error("Fetch projects error:", error);
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  app.post("/api/projects", async (req, res) => {
    const { title, description, image_url, images, tags, project_url } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: "Title and description are required" });
    }

    try {
      const newProject = projectRepository.create({
        title,
        description,
        image_url,
        images: images || [],
        tags,
        project_url
      });

      const saved = await projectRepository.save(newProject);
      res.json({ id: saved.id, message: "Project added successfully" });
    } catch (error) {
      console.error("Save project error:", error);
      res.status(500).json({ error: "Failed to add project" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(process.cwd(), "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(process.cwd(), "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
