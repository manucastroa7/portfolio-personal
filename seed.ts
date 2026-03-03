import Database from "better-sqlite3";

const db = new Database("portfolio.db");

// Clear existing projects to avoid duplicates during development/testing
db.exec("DELETE FROM projects");

const projects = [
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

const insert = db.prepare(
    "INSERT INTO projects (title, description, image_url, images, tags, project_url) VALUES (?, ?, ?, ?, ?, ?)"
);

for (const project of projects) {
    insert.run(
        project.title,
        project.description,
        project.image_url,
        JSON.stringify(project.images),
        project.tags,
        project.project_url
    );
}

console.log("Database seeded successfully!");
db.close();
