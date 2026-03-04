import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Plus,
  X,
  Code2,
  Cpu,
  Layout,
  Database as DbIcon,
  ChevronDown,
  Terminal,
  Download
} from 'lucide-react';
import { Project } from './types';

const TECH_ICONS: Record<string, { icon: React.ReactNode, color: string, bg: string }> = {
  'React': {
    icon: <img src="/react.svg" alt="React" className="w-full h-full object-contain" />,
    color: '#61DAFB',
    bg: 'rgba(97, 218, 251, 0.1)'
  },
  'NestJS': {
    icon: <img src="/nestjs.svg" alt="NestJS" className="w-full h-full object-contain" />,
    color: '#E0234E',
    bg: 'rgba(224, 35, 78, 0.1)'
  },
  'TypeScript': {
    icon: <img src="/typescript.svg" alt="TypeScript" className="w-full h-full object-contain" />,
    color: '#3178C6',
    bg: 'rgba(49, 120, 198, 0.1)'
  },
  'Node.js': {
    icon: <img src="/nodejs.svg" alt="Node.js" className="w-full h-full object-contain" />,
    color: '#339933',
    bg: 'rgba(51, 153, 51, 0.1)'
  },
  'PostgreSQL': {
    icon: <img src="/postgresql.svg" alt="PostgreSQL" className="w-full h-full object-contain" />,
    color: '#336791',
    bg: 'rgba(51, 103, 145, 0.1)'
  },
  'Tailwind': {
    icon: <img src="/tailwind.svg" alt="Tailwind CSS" className="w-full h-full object-contain" />,
    color: '#06B6D4',
    bg: 'rgba(6, 182, 212, 0.1)'
  },
  'Cloudinary': {
    icon: <img src="/cloudinary.svg" alt="Cloudinary" className="w-full h-full object-contain" />,
    color: '#3448C5',
    bg: 'rgba(52, 72, 197, 0.1)'
  },
  'Vite': {
    icon: <Cpu />,
    color: '#646CFF',
    bg: 'rgba(100, 108, 255, 0.1)'
  },
  'MercadoPago': {
    icon: <img src="/mpago.svg" alt="MercadoPago" className="w-full h-full object-contain" />,
    color: '#00B1EA',
    bg: 'rgba(0, 177, 234, 0.1)'
  },
  'Google OAuth': {
    icon: <svg viewBox="0 0 24 24" className="w-full h-full fill-white" xmlns="http://www.w3.org/2000/svg"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.908 3.152-1.928 4.176-1.224 1.224-3.136 2.504-6.392 2.504-5.112 0-9.152-4.144-9.152-9.256s4.04-9.256 9.152-9.256c2.784 0 4.816 1.096 6.312 2.496l2.312-2.312C18.496 1.056 15.824 0 12.48 0 5.696 0 0 5.696 0 12.48s5.696 12.48 12.48 12.48c3.672 0 6.44-1.208 8.648-3.512 2.264-2.264 2.976-5.416 2.976-7.904 0-.76-.064-1.488-.184-2.144h-11.44z" /></svg>,
    color: '#4285F4',
    bg: 'rgba(66, 133, 244, 0.1)'
  },
  'JWT': {
    icon: <img src="/jwt.svg" alt="JWT" className="w-full h-full object-contain" />,
    color: '#D63AFF',
    bg: 'rgba(214, 58, 255, 0.1)'
  }
};

export default function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState<{ project: Project; index: number } | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    images: '',
    tags: '',
    project_url: ''
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const API_URL = import.meta.env.VITE_API_URL || '';

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_URL}/api/projects`);
      if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
      const data = await res.json();
      setProjects(data);
    } catch (err: any) {
      console.error('Error fetching projects:', err);
      setErrorDetails(`Error de Red. Frontend intentó conectar con: "${API_URL}/api/projects". Mensaje: ${err.message}. Revisa la pestaña de "Network" (Red) en F12 para ver si fue bloqueado por CORS o Mixed Content.`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          images: formData.images.split(',').map(img => img.trim()).filter(img => img !== '')
        }),
      });
      if (res.ok) {
        setIsModalOpen(false);
        setFormData({ title: '', description: '', image_url: '', images: '', tags: '', project_url: '' });
        fetchProjects();
      }
    } catch (err) {
      console.error('Error adding project:', err);
    }
  };

  return (
    <div className="min-h-screen selection:bg-brand-primary/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b-0 py-4">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold tracking-tighter"
          >
            MARIA<span className="text-brand-primary">.DEV</span>
          </motion.div>
          <div className="hidden md:flex gap-8 text-sm font-medium opacity-70">
            <a href="#home" className="hover:text-brand-primary transition-colors">Inicio</a>
            <a href="#projects" className="hover:text-brand-primary transition-colors">Proyectos</a>
            <a href="#about" className="hover:text-brand-primary transition-colors">Sobre mí</a>
            <a href="#contact" className="hover:text-brand-primary transition-colors">Contacto</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-20">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-brand-primary rounded-full blur-[120px]" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-brand-secondary rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold uppercase tracking-widest mb-6">
              <Terminal size={14} /> Full Stack | Backend Specialist
            </div>
            <h1 className="text-6xl md:text-8xl font-bold leading-[0.9] tracking-tighter mb-8">
              Maria <br />
              <span className="text-gradient">Manuela</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-xl mb-10 leading-relaxed">
              Me apasiona resolver problemas reales con código. No me asustan los desafíos: si no sé algo, lo investigo, lo aprendo y lo implemento. Construyo soluciones sólidas usando <span className="text-white">TypeScript, Node.js, NestJS y PostgreSQL</span>.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <a href="#projects" className="btn-primary">Ver Proyectos</a>
              <a href="#contact" className="px-6 py-3 glass rounded-full hover:bg-white/10 transition-all font-bold">Contacto</a>
              <a
                href="/certificate-henry.png"
                download="Henry_Certificate_Maria_Manuela.png"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FFFF00]/10 border border-[#FFFF00]/20 hover:bg-[#FFFF00]/20 transition-all group"
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  <svg viewBox="0 0 48 48" className="w-full h-full fill-[#FFFF00]" xmlns="http://www.w3.org/2000/svg"><path d="M4 4h8v40H4V4zm12 0h8v40h-8V4zm12 0h20v8h-12v8h12v8h-12v8h12v8H28V4z" /><path d="M0 23h48v2H0z" fill="#FFFF00" /></svg>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#FFFF00]">soy Henry</span>
                <Download size={14} className="text-[#FFFF00] opacity-50 group-hover:opacity-100 group-hover:translate-y-0.5 transition-all" />
              </a>
              <div className="flex gap-4 items-center md:ml-4">
                <a href="https://www.linkedin.com/in/manucastroa7/" target="_blank" rel="noopener noreferrer" className="p-3 glass rounded-full hover:text-brand-primary transition-all"><Linkedin size={20} /></a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center items-center"
          >
            {/* Background decorative grid/glow */}
            <div className="absolute -z-10 w-full h-full bg-[radial-gradient(circle_at_center,var(--brand-primary-20)_0%,transparent_70%)] opacity-30" />

            <div className="relative group">
              {/* Profile Image with Organic Shape/Frame */}
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-[2rem] overflow-hidden glass p-3 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02] border-brand-primary/20">
                <img
                  src="/profile.jpg"
                  alt="Maria Manuela"
                  className="w-full h-full object-cover rounded-[1.5rem]"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Floating Tech Indicators (Backend Focused) */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 glass p-4 rounded-2xl shadow-xl flex items-center gap-3 border-white/10"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                  <DbIcon size={18} />
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest opacity-70">PostgreSQL</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-1/2 -left-12 glass p-4 rounded-2xl shadow-xl flex items-center gap-3 border-white/10"
              >
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400">
                  <Terminal size={18} />
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest opacity-70">Node.js</div>
              </motion.div>

              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -right-8 glass p-3 px-4 rounded-xl shadow-xl flex items-center gap-2 border-white/10"
              >
                <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
                <div className="text-[10px] font-bold uppercase tracking-widest opacity-70">NestJS Expert</div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div className="flex justify-center mt-20">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="opacity-30"
          >
            <ChevronDown size={32} />
          </motion.div>
        </div>
      </section>

      {/* Tech Stack Marquee/Strip */}
      <section className="py-12 border-y border-white/5 bg-slate-950/20 backdrop-blur-sm overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
            {/* Tech Item */}
            <div className="flex items-center gap-3 group">
              <div className="w-10 h-10 p-2 rounded-xl bg-[#3178C6]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg viewBox="0 0 24 24" className="w-full h-full fill-[#3178C6]" xmlns="http://www.w3.org/2000/svg"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125zm17.363 9.75c.612 0 1.154.037 1.627.111v2.111c-.352-.093-.833-.148-1.444-.148-1.204 0-1.907.593-1.907 1.518v.796h3.351v2.111h-3.351V22.5h-2.481V14.14h-1.777v-2.111h1.777V11.24c0-1.481.963-2.5 2.481-2.5-.001.01-.001.01 0 0zM11.04 22.5H8.556V11.24H5V9.129h6.04v13.371z" /></svg>
              </div>
              <span className="text-xs font-bold tracking-widest uppercase">TypeScript</span>
            </div>

            <div className="flex items-center gap-3 group">
              <div className="w-10 h-10 p-2 rounded-xl bg-[#339933]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg viewBox="0 0 24 24" className="w-full h-full fill-[#339933]" xmlns="http://www.w3.org/2000/svg"><path d="M14.914 15.926c0 .524-.31.785-.92.785-.31 0-.61-.06-.88-.18-.28-.11-.53-.26-.74-.46l-1.32 1.32c.41.41.9.72 1.48.95.58.22 1.21.33 1.9.33 1.05 0 1.86-.27 2.43-.81.57-.54.86-1.33.86-2.37V9.129h-2.81v6.797zm-5.834-3.516c-.53 0-.97.16-1.31.48-.34.32-.51.74-.51 1.25 0 .52.17.93.51 1.25.34.33.78.49 1.31.49s.97-.16 1.31-.49c.34-.32.51-.74.51-1.25 0-.52-.17-.93-.51-1.25-.34-.32-.78-.48-1.31-.48zm0-2.398c1.37 0 2.44.4 3.2 1.2s1.14 1.93 1.14 3.39-.38 2.59-1.14 3.39c-.76.8-1.83 1.2-3.2 1.2s-2.44-.4-3.2-1.2S1.74 16.03 1.74 14.6c0-1.47.38-2.6 1.14-3.39.76-.8 1.83-1.2 3.2-1.2z" /></svg>
              </div>
              <span className="text-xs font-bold tracking-widest uppercase">Node.js</span>
            </div>

            <div className="flex items-center gap-3 group">
              <div className="w-10 h-10 p-2 rounded-xl bg-[#E0234E]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg viewBox="0 0 24 24" className="w-full h-full fill-[#E0234E]" xmlns="http://www.w3.org/2000/svg"><path d="M12 0L2.14 5.69v11.37L12 24l9.86-6.94V5.69L12 0zm0 3.22l7.07 4.08v8.16L12 19.54l-7.07-4.08V7.3l7.07-4.08zm-1.85 5.56v5.56h1.85V8.78h1.85v5.56h1.85V8.78h1.85V6.93h-7.4v1.85z" /></svg>
              </div>
              <span className="text-xs font-bold tracking-widest uppercase">NestJS</span>
            </div>

            <div className="flex items-center gap-3 group">
              <div className="w-10 h-10 p-2 rounded-xl bg-[#336791]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg viewBox="0 0 24 24" className="w-full h-full fill-[#336791]" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.373 0 0 5.373 0 12c0 6.627 5.373 12 12 12s12-5.373 12-12c0-6.627-5.373-12-12-12zm-3.15 6.75h6.3v2.25h-2.025v9.45h-2.25V9h-2.025V6.75z" /></svg>
              </div>
              <span className="text-xs font-bold tracking-widest uppercase">PostgreSQL</span>
            </div>

            <div className="flex items-center gap-3 group">
              <div className="w-10 h-10 p-2 rounded-xl bg-[#61DAFB]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg viewBox="0 0 128 128" className="w-full h-full fill-[#61DAFB]" xmlns="http://www.w3.org/2000/svg"><path d="M128 64c0 16.23-14.735 30.563-39.734 38.647 1.574 3.125 2.871 6.309 3.863 9.537C112.564 105.106 128 90.7 128 64c0-26.7-15.436-41.106-35.871-48.184-1.121 3.654-2.612 7.284-4.444 10.854C112.894 34.698 128 48.067 128 64ZM20.315 112.184C31.54 117.838 46.91 120.75 64 120.75c17.09 0 32.46-2.912 43.685-8.566l-1.353-2.645c-10.435 5.257-25.044 8.211-42.332 8.211-17.288 0-31.897-2.954-42.332-8.211l-1.353 2.645ZM64 7.25c-17.09 0-32.46 2.912-43.685 8.566l1.353 2.645c10.435-5.257 25.044-8.211 42.332-8.211 17.288 0 31.897 2.954 42.332 8.211l1.353-2.645C96.46 10.162 81.09 7.25 64 7.25ZM0 64c0 26.7 15.436 41.106 35.871 48.184 1.121-3.654 2.612-7.284 4.444-10.854C15.106 93.302 0 79.933 0 64c0-16.23 14.735-30.563 39.734-38.647-1.574-3.125-2.871-6.309-3.863-9.537C15.436 22.894 0 37.3 0 64Zm64 12.001c6.627 0 12-5.373 12-12s-5.373-12-12-12-12 5.373-12 12 5.373 12 12 12Z" /></svg>
              </div>
              <span className="text-xs font-bold tracking-widest uppercase">React</span>
            </div>

            <div className="flex items-center gap-3 group">
              <div className="w-10 h-10 p-2 rounded-xl bg-[#06B6D4]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg viewBox="0 0 24 24" className="w-full h-full fill-[#06B6D4]" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C6.155 0 1.259 4.148 0 9.771 1.741 8.358 3.656 7.643 5.746 7.625c1.196.018 2.052.429 2.998 1.391C10.285 10.592 11.517 12 13.923 12c5.845 0 10.741-4.148 12-9.771-1.741 1.413-3.656 2.128-5.746 2.146-1.192-.018-2.052-.429-2.998-1.391C15.633 1.408 14.401 0 12.181 0h-.181zM5.746 12C2.155 12 1.259 16.148 0 21.771 1.741 20.358 3.656 19.643 5.746 19.625c1.196.018 2.052.429 2.998 1.391 1.541 1.576 2.773 2.984 5.179 2.984 5.845 0 10.741-4.148 12-9.771-1.741 1.413-3.656 2.128-5.746 2.146-1.192-.018-2.052-.429-2.998-1.391C15.633 13.408 14.401 12 12.181 12h-.181z" /></svg>
              </div>
              <span className="text-xs font-bold tracking-widest uppercase">Tailwind</span>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl font-bold tracking-tighter mb-4">Proyectos <span className="text-brand-primary">Destacados</span></h2>
              <p className="text-slate-400">Una selección de mis trabajos más recientes.</p>
            </div>
          </div>

          {errorDetails && (
            <div className="mb-12 p-6 glass rounded-2xl bg-red-500/10 border-red-500/20 text-red-200">
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">⚠️ Error Cargando Proyectos</h3>
              <p className="font-mono text-sm">{errorDetails}</p>
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-[500px] glass rounded-[2.5rem] animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }}
                  className="group flex flex-col glass rounded-[2.5rem] overflow-hidden hover:border-brand-primary/50 transition-all shadow-2xl bg-slate-900/40"
                >
                  {/* Image Section */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={project.image_url || `https://picsum.photos/seed/${project.id}/800/800`}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Content Section */}
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold text-white group-hover:text-brand-primary transition-colors">{project.title}</h3>
                    </div>

                    <p className="text-sm text-slate-300 mb-6 leading-relaxed whitespace-pre-line flex-grow">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tags.split(',')
                        .map(t => t.trim())
                        .filter(t => t && !t.toLowerCase().includes('gemini'))
                        .map(trimmedTag => {
                          const tech = TECH_ICONS[trimmedTag];
                          return (
                            <div
                              key={trimmedTag}
                              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all bg-white/5 border border-white/10 hover:bg-white/10"
                              style={tech ? { color: tech.color } : {}}
                              title={trimmedTag}
                            >
                              {tech ? <div className="w-4 h-4 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">{tech.icon}</div> : <span className="text-[8px] font-bold">{trimmedTag.substring(0, 2)}</span>}
                            </div>
                          );
                        })}
                    </div>

                    {/* Actions */}
                    <div className="mt-auto">
                      <button
                        onClick={() => project.images.length > 0 && setSelectedGallery({ project, index: 0 })}
                        className="w-full btn-primary py-3 flex items-center justify-center gap-2 text-sm"
                      >
                        <Layout size={18} />
                        Ver Galería
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="h-64 glass rounded-2xl flex flex-col items-center justify-center p-6 text-center group hover:border-brand-primary/50 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-4 group-hover:scale-110 transition-transform">
                      <Code2 size={28} />
                    </div>
                    <div className="text-lg font-bold mb-1">Arquitectura</div>
                    <div className="text-[10px] uppercase tracking-widest font-bold opacity-50">Lógica Sólida</div>
                  </div>
                  <div className="h-48 glass rounded-2xl flex flex-col items-center justify-center p-6 text-center group hover:border-brand-secondary/50 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-brand-secondary/10 flex items-center justify-center text-brand-secondary mb-4 group-hover:scale-110 transition-transform">
                      <DbIcon size={28} />
                    </div>
                    <div className="text-lg font-bold mb-1">Bases de Datos</div>
                    <div className="text-[10px] uppercase tracking-widest font-bold opacity-50">PostgreSQL / SQL</div>
                  </div>
                </div>
                <div className="space-y-4 pt-12">
                  <div className="h-48 glass rounded-2xl flex flex-col items-center justify-center p-6 text-center group hover:border-brand-primary/50 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-4 group-hover:scale-110 transition-transform">
                      <Cpu size={28} />
                    </div>
                    <div className="text-lg font-bold mb-1">Modern Stack</div>
                    <div className="text-[10px] uppercase tracking-widest font-bold opacity-50">NestJS & Node</div>
                  </div>
                  <div className="h-64 glass rounded-2xl flex flex-col items-center justify-center p-6 text-center group hover:border-brand-secondary/50 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-brand-secondary/10 flex items-center justify-center text-brand-secondary mb-4 group-hover:scale-110 transition-transform">
                      <Layout size={28} />
                    </div>
                    <div className="text-lg font-bold mb-1">Visión IT</div>
                    <div className="text-[10px] uppercase tracking-widest font-bold opacity-50">Business & UX</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold tracking-tighter mb-8 italic">
                "Traduzco necesidades reales <br />
                <span className="text-brand-primary">en arquitecturas de software.</span>"
              </h2>
              <div className="space-y-6 text-slate-400 leading-relaxed text-sm md:text-base">
                <p>
                  Vengo del mundo de la administración y el turismo, lo que me enseñó a entender el "negocio" detrás de cada aplicación y a programar pensando siempre en el usuario. Hoy, aplico esa visión desarrollando software a medida y arquitecturas sólidas con <span className="text-white">TypeScript, Node.js, NestJS y PostgreSQL</span>.
                </p>
                <p>
                  Mi mayor fortaleza es la resolución de problemas: investigo, aprendo y no me detengo hasta que el código funciona. Ya construí sistemas desde cero que hoy están en producción, y busco sumar mi empuje a proyectos donde pueda seguir escalando mis habilidades técnicas y colaborando con otros desarrolladores.
                </p>

                <div className="pt-6 flex flex-wrap gap-8">
                  <div>
                    <div className="text-white font-bold mb-2">Stack Principal</div>
                    <div className="text-sm">Node.js, NestJS, TypeScript, PostgreSQL</div>
                  </div>
                  <div>
                    <div className="text-white font-bold mb-2">Frontend & UI</div>
                    <div className="text-sm">React, Tailwind CSS, Framer Motion</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-12">Contacto</h2>
          <div className="flex flex-col items-center gap-8">
            <a href="mailto:manucastroa7@gmail.com" className="btn-primary flex items-center gap-3">
              <Mail size={20} /> Hablemos ahora
            </a>
            <div className="flex gap-6">
              <a href="https://www.linkedin.com/in/manucastroa7/" target="_blank" rel="noopener noreferrer" className="opacity-50 hover:opacity-100 transition-all"><Linkedin /></a>
            </div>
            <div className="mt-12 text-xs opacity-30 uppercase tracking-[0.2em]">
              © {new Date().getFullYear()} María Manuela Castro Arellano • Hecho con ❤️ y Código
            </div>
          </div>
        </div>
      </footer>

      {/* Modal for New Project */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-brand-dark/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg glass rounded-3xl p-8 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Nuevo Proyecto</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-all">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-50">Título</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary transition-all"
                    placeholder="E.g. E-commerce App"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-50">Descripción</label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary transition-all h-24 resize-none"
                    placeholder="Describe brevemente el proyecto..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-50">Tags (React, NestJS...)</label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={e => setFormData({ ...formData, tags: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary transition-all"
                      placeholder="React, Tailwind..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-50">URL del Proyecto</label>
                    <input
                      type="url"
                      value={formData.project_url}
                      onChange={e => setFormData({ ...formData, project_url: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary transition-all"
                      placeholder="https://..."
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-50">Portada (URL)</label>
                    <input
                      type="text"
                      value={formData.image_url}
                      onChange={e => setFormData({ ...formData, image_url: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary transition-all"
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-50">Galería (URLs sep. por coma)</label>
                    <input
                      type="text"
                      value={formData.images}
                      onChange={e => setFormData({ ...formData, images: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary transition-all"
                      placeholder="img1.jpg, img2.jpg..."
                    />
                  </div>
                </div>
                <button type="submit" className="w-full btn-primary mt-4">Guardar Proyecto</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Project Gallery Overlay */}
      <AnimatePresence>
        {selectedGallery && (
          <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center p-4 md:p-10 bg-slate-950/95 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-6 right-6 z-[210] flex gap-4"
            >
              <button
                onClick={() => setSelectedGallery(null)}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all text-white"
              >
                <X size={24} />
              </button>
            </motion.div>

            <div className="relative w-full max-w-6xl h-full flex flex-col">
              <div className="flex-1 relative flex items-center justify-center overflow-hidden rounded-[2rem]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedGallery.index}
                    src={selectedGallery.project.images[selectedGallery.index]}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="max-h-[70vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl"
                  />
                </AnimatePresence>

                {/* Navigation Arrows */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 pointer-events-none">
                  <button
                    onClick={() => setSelectedGallery(prev => prev ? { ...prev, index: (prev.index - 1 + prev.project.images.length) % prev.project.images.length } : null)}
                    className="p-4 bg-black/40 hover:bg-black/60 rounded-full text-white backdrop-blur-md transition-all pointer-events-auto disabled:opacity-30"
                    disabled={selectedGallery.project.images.length <= 1}
                  >
                    <ChevronDown size={28} className="rotate-90" />
                  </button>
                  <button
                    onClick={() => setSelectedGallery(prev => prev ? { ...prev, index: (prev.index + 1) % prev.project.images.length } : null)}
                    className="p-4 bg-black/40 hover:bg-black/60 rounded-full text-white backdrop-blur-md transition-all pointer-events-auto disabled:opacity-30"
                    disabled={selectedGallery.project.images.length <= 1}
                  >
                    <ChevronDown size={28} className="-rotate-90" />
                  </button>
                </div>
              </div>

              {/* Progress Bar & Info */}
              <div className="py-8 w-full flex flex-col items-center gap-6">
                <div className="flex gap-2 h-1 w-full max-w-md bg-white/10 rounded-full overflow-hidden">
                  {selectedGallery.project.images.map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 transition-all duration-500 ${i === selectedGallery.index ? 'bg-brand-primary' : 'bg-transparent'}`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-12 text-white">
                  <button
                    onClick={() => setSelectedGallery(prev => prev ? { ...prev, index: (prev.index - 1 + prev.project.images.length) % prev.project.images.length } : null)}
                    className="text-sm font-bold opacity-70 hover:opacity-100 flex items-center gap-2"
                  >
                    ← Anterior
                  </button>
                  <span className="font-mono text-sm tracking-widest bg-white/10 px-4 py-1 rounded-full">
                    {selectedGallery.index + 1} / {selectedGallery.project.images.length}
                  </span>
                  <button
                    onClick={() => setSelectedGallery(prev => prev ? { ...prev, index: (prev.index + 1) % prev.project.images.length } : null)}
                    className="text-sm font-bold opacity-70 hover:opacity-100 flex items-center gap-2"
                  >
                    Siguiente →
                  </button>
                </div>

                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-2">{selectedGallery.project.title}</h3>
                  <div className="flex gap-2 justify-center">
                    {selectedGallery.project.tags.split(',').map(tag => (
                      <span key={tag} className="text-[10px] font-bold uppercase tracking-widest opacity-50">{tag.trim()}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
