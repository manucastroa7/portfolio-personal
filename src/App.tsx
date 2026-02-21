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
  Terminal
} from 'lucide-react';
import { Project } from './types';

export default function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    tags: '',
    project_url: ''
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setIsModalOpen(false);
        setFormData({ title: '', description: '', image_url: '', tags: '', project_url: '' });
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
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-all"
          >
            <Plus size={14} /> Nuevo Proyecto
          </button>
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
              <Terminal size={14} /> Full Stack Developer
            </div>
            <h1 className="text-6xl md:text-8xl font-bold leading-[0.9] tracking-tighter mb-8">
              Maria <br />
              <span className="text-gradient">Manuela</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-md mb-10 leading-relaxed">
              Especializada en crear experiencias digitales excepcionales donde el diseño y el código se encuentran. Transformo ideas complejas en interfaces intuitivas.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#projects" className="btn-primary">Ver Proyectos</a>
              <div className="flex gap-4 items-center ml-4">
                <a href="#" className="p-3 glass rounded-full hover:text-brand-primary transition-all"><Github size={20} /></a>
                <a href="#" className="p-3 glass rounded-full hover:text-brand-primary transition-all"><Linkedin size={20} /></a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden glass p-4">
              <img 
                src="https://picsum.photos/seed/maria/800/800" 
                alt="Maria Manuela" 
                className="w-full h-full object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 glass p-6 rounded-2xl shadow-2xl">
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-xl bg-brand-primary/20 flex items-center justify-center text-brand-primary">
                  <Layout size={24} />
                </div>
                <div>
                  <div className="text-sm font-bold">UX/UI Design</div>
                  <div className="text-xs opacity-50">Figma, Adobe XD</div>
                </div>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 glass p-6 rounded-2xl shadow-2xl">
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-xl bg-brand-secondary/20 flex items-center justify-center text-brand-secondary">
                  <Code2 size={24} />
                </div>
                <div>
                  <div className="text-sm font-bold">Frontend</div>
                  <div className="text-xs opacity-50">React, Next.js, TS</div>
                </div>
              </div>
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

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl font-bold tracking-tighter mb-4">Proyectos <span className="text-brand-primary">Destacados</span></h2>
              <p className="text-slate-400">Una selección de mis trabajos más recientes.</p>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-96 glass rounded-3xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative glass rounded-3xl overflow-hidden hover:border-brand-primary/50 transition-all"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img 
                      src={project.image_url || `https://picsum.photos/seed/${project.id}/800/500`} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.split(',').map(tag => (
                        <span key={tag} className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md bg-white/5 border border-white/10 opacity-60">
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                    <p className="text-sm text-slate-400 mb-6 line-clamp-2">{project.description}</p>
                    <a 
                      href={project.project_url || "#"} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-bold text-brand-primary hover:gap-3 transition-all"
                    >
                      Ver Proyecto <ExternalLink size={14} />
                    </a>
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
                  <div className="h-64 glass rounded-2xl flex flex-col items-center justify-center p-6 text-center">
                    <div className="text-3xl font-bold text-brand-primary mb-2">3+</div>
                    <div className="text-xs uppercase tracking-widest font-bold opacity-50">Años de Exp.</div>
                  </div>
                  <div className="h-48 glass rounded-2xl flex flex-col items-center justify-center p-6 text-center">
                    <div className="text-3xl font-bold text-brand-secondary mb-2">20+</div>
                    <div className="text-xs uppercase tracking-widest font-bold opacity-50">Proyectos</div>
                  </div>
                </div>
                <div className="space-y-4 pt-12">
                  <div className="h-48 glass rounded-2xl flex flex-col items-center justify-center p-6 text-center">
                    <DbIcon className="text-brand-primary mb-4" size={32} />
                    <div className="text-xs uppercase tracking-widest font-bold opacity-50">Backend</div>
                  </div>
                  <div className="h-64 glass rounded-2xl flex flex-col items-center justify-center p-6 text-center">
                    <Cpu className="text-brand-secondary mb-4" size={32} />
                    <div className="text-xs uppercase tracking-widest font-bold opacity-50">Performance</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold tracking-tighter mb-8 italic">
                "El código es mi lienzo, <br />
                <span className="text-brand-primary">la lógica mi pincel.</span>"
              </h2>
              <div className="space-y-6 text-slate-400 leading-relaxed">
                <p>
                  Soy Maria Manuela, una desarrolladora apasionada por el impacto visual y la eficiencia técnica. Mi enfoque combina una sólida base en ingeniería con una sensibilidad estética refinada.
                </p>
                <p>
                  Creo en la creación de software que no solo funcione perfectamente, sino que también deleite a quienes lo usan. Mi objetivo es siempre superar las expectativas, entregando soluciones escalables y mantenibles.
                </p>
                <div className="pt-6 flex gap-6">
                  <div>
                    <div className="text-white font-bold mb-2">Stack Principal</div>
                    <div className="text-sm">React, TypeScript, Node.js, PostgreSQL</div>
                  </div>
                  <div>
                    <div className="text-white font-bold mb-2">Diseño</div>
                    <div className="text-sm">Figma, Tailwind CSS, Framer Motion</div>
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
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-12">¿Tienes un proyecto <br /><span className="text-gradient">en mente?</span></h2>
          <div className="flex flex-col items-center gap-8">
            <a href="mailto:maria@dev.com" className="btn-primary flex items-center gap-3">
              <Mail size={20} /> Hablemos ahora
            </a>
            <div className="flex gap-6">
              <a href="#" className="opacity-50 hover:opacity-100 transition-all"><Github /></a>
              <a href="#" className="opacity-50 hover:opacity-100 transition-all"><Linkedin /></a>
            </div>
            <div className="mt-12 text-xs opacity-30 uppercase tracking-[0.2em]">
              © 2024 Maria Manuela Castro Arellano • Hecho con ❤️ y Código
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
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary transition-all"
                    placeholder="E.g. E-commerce App"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-50">Descripción</label>
                  <textarea 
                    required
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary transition-all h-24 resize-none"
                    placeholder="Describe brevemente el proyecto..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-50">Tags (separados por coma)</label>
                    <input 
                      type="text" 
                      value={formData.tags}
                      onChange={e => setFormData({...formData, tags: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary transition-all"
                      placeholder="React, Tailwind..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-50">URL del Proyecto</label>
                    <input 
                      type="url" 
                      value={formData.project_url}
                      onChange={e => setFormData({...formData, project_url: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary transition-all"
                      placeholder="https://..."
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-50">URL de Imagen</label>
                  <input 
                    type="text" 
                    value={formData.image_url}
                    onChange={e => setFormData({...formData, image_url: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary transition-all"
                    placeholder="https://picsum.photos/..."
                  />
                </div>
                <button type="submit" className="w-full btn-primary mt-4">Guardar Proyecto</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
