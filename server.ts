import "reflect-metadata";
import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { DataSource, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";
import dotenv from "dotenv";

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
const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true, // Auto-create tables (warning: use migrations in production)
  logging: false,
  entities: [Project],
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false
});

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

  app.use(express.json());

  try {
    await AppDataSource.initialize();
    console.log("Database connected successfully");
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
