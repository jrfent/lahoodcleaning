
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Menu, X, Phone, ArrowRight, Star, CheckCircle2, 
  LayoutDashboard, LogOut, Settings, Users, FileText,
  Plus, Edit2, Trash2, ExternalLink, Mail, Newspaper
} from 'lucide-react';
import { 
  INITIAL_SETTINGS, 
  INITIAL_SERVICES, 
  INITIAL_TESTIMONIALS, 
  MOCK_LEADS, 
  MOCK_BLOG_POSTS,
  getIcon 
} from './constants';
import { Service, Lead, SiteSettings, Testimonial } from './types';

const App: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SETTINGS);
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);
  const [posts, setPosts] = useState(MOCK_BLOG_POSTS);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100">
        <Navigation 
          settings={settings} 
          isMenuOpen={isMenuOpen} 
          setIsMenuOpen={setIsMenuOpen} 
        />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomeView settings={settings} services={services} testimonials={testimonials} setLeads={setLeads} posts={posts} />} />
            <Route path="/services" element={<ServicesView services={services} />} />
            <Route path="/about" element={<AboutView />} />
            <Route path="/blog" element={<BlogView posts={posts} />} />
            <Route path="/contact" element={<ContactView settings={settings} setLeads={setLeads} />} />
            <Route path="/privacy" element={<PrivacyPolicyView />} />
            <Route path="/terms" element={<TermsView />} />
            <Route path="/admin/*" element={
              <AdminDashboard 
                settings={settings} 
                setSettings={setSettings}
                services={services}
                setServices={setServices}
                leads={leads}
                setLeads={setLeads}
                testimonials={testimonials}
                setTestimonials={setTestimonials}
                posts={posts}
                setPosts={setPosts}
              />
            } />
          </Routes>
        </main>

        <Footer settings={settings} />
      </div>
    </HashRouter>
  );
};

const Navigation: React.FC<{ settings: SiteSettings, isMenuOpen: boolean, setIsMenuOpen: (v: boolean) => void }> = ({ settings, isMenuOpen, setIsMenuOpen }) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) return null;

  return (
    <nav className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">LA</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-white">{settings.name}</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-zinc-400 hover:text-orange-500 transition-colors">Home</Link>
            <Link to="/services" className="text-zinc-400 hover:text-orange-500 transition-colors">Services</Link>
            <Link to="/about" className="text-zinc-400 hover:text-orange-500 transition-colors">About</Link>
            <Link to="/blog" className="text-zinc-400 hover:text-orange-500 transition-colors">Blog</Link>
            <Link to="/contact" className="text-zinc-400 hover:text-orange-500 transition-colors">Contact</Link>
            <a href={`tel:${settings.phone}`} className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded-lg transition-all font-semibold shadow-lg shadow-orange-900/20">
              <Phone size={18} />
              <span>Call Now</span>
            </a>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-zinc-400 hover:text-white">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-zinc-900 border-b border-zinc-800 py-4 px-4 space-y-4">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="block text-zinc-300 hover:text-orange-500">Home</Link>
          <Link to="/services" onClick={() => setIsMenuOpen(false)} className="block text-zinc-300 hover:text-orange-500">Services</Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)} className="block text-zinc-300 hover:text-orange-500">About</Link>
          <Link to="/blog" onClick={() => setIsMenuOpen(false)} className="block text-zinc-300 hover:text-orange-500">Blog</Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="block text-zinc-300 hover:text-orange-500">Contact</Link>
          <a href={`tel:${settings.phone}`} className="block w-full text-center bg-orange-600 text-white py-3 rounded-lg font-bold">
            Call {settings.phone}
          </a>
        </div>
      )}
    </nav>
  );
};

const HomeView: React.FC<{ settings: SiteSettings, services: Service[], testimonials: Testimonial[], setLeads: any, posts: any[] }> = ({ settings, services, testimonials, setLeads, posts }) => {
  return (
    <div>
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-950/20 via-zinc-950 to-zinc-950 -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-orange-500 uppercase bg-orange-950/50 border border-orange-800 rounded-full">
              Trusted by 500+ LA Restaurants
            </span>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-8">
              {settings.heroHeadline}
            </h1>
            <p className="text-xl text-zinc-400 mb-10 leading-relaxed">
              {settings.heroSubheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-xl shadow-orange-900/30">
                Get a Free Quote
                <ArrowRight className="ml-2" size={20} />
              </Link>
              <a href={`tel:${settings.phone}`} className="inline-flex items-center justify-center px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-bold text-lg transition-all border border-zinc-700">
                Call {settings.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 border-y border-zinc-800 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatItem number="15+" label="Years Experience" />
            <StatItem number="100%" label="Fire Code Compliant" />
            <StatItem number="500+" label="Kitchens Serviced" />
            <StatItem number="24/7" label="Emergency Service" />
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Our Core Specialties</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            We provide comprehensive cleaning and maintenance solutions designed specifically for high-volume commercial kitchens.
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8">
          {services.map(service => (
            <div key={service.id} className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl hover:border-orange-500/50 transition-all group">
              <div className="w-14 h-14 bg-zinc-800 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange-600/20 group-hover:text-orange-500 transition-colors">
                {getIcon(service.icon, "w-8 h-8")}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
              <p className="text-zinc-400 mb-6 leading-relaxed">{service.description}</p>
              <ul className="space-y-3">
                {service.features.map(f => (
                  <li key={f} className="flex items-center text-sm text-zinc-300">
                    <CheckCircle2 size={16} className="text-orange-500 mr-2" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 bg-zinc-900/30 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white">Latest Industry Insights</h2>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8">
          {posts.map(post => (
            <Link key={post.id} to="/blog" className="group bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden hover:border-orange-500 transition-all">
              <div className="aspect-video w-full overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div className="p-8">
                <p className="text-orange-500 font-bold text-xs uppercase mb-2">{post.date}</p>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors">{post.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-r from-orange-900/40 to-red-900/40 border border-orange-800/50 p-12 md:p-20 rounded-[3rem]">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8">Ready for a Safer Kitchen?</h2>
          <p className="text-xl text-orange-100/70 mb-10 max-w-2xl mx-auto">
            Book your free assessment today and join the ranks of LA's safest commercial kitchens.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link to="/contact" className="bg-white text-zinc-950 px-10 py-5 rounded-2xl font-black text-lg hover:bg-orange-100 transition-all">
              Request Your Free Quote
            </Link>
            <a href={`tel:${settings.phone}`} className="bg-orange-600/30 text-white border border-orange-500/50 px-10 py-5 rounded-2xl font-black text-lg hover:bg-orange-600/50 transition-all">
              Call Now: {settings.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

const StatItem: React.FC<{ number: string, label: string }> = ({ number, label }) => (
  <div className="text-center">
    <div className="text-3xl md:text-4xl font-black text-white mb-2">{number}</div>
    <div className="text-sm md:text-base text-zinc-500 font-medium uppercase tracking-widest">{label}</div>
  </div>
);

const BlogView: React.FC<{ posts: any[] }> = ({ posts }) => (
  <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 className="text-5xl font-black text-white mb-12">Kitchen Safety Blog</h1>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map(post => (
        <div key={post.id} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all">
          <div className="aspect-video bg-zinc-800">
             <img src={post.image} className="w-full h-full object-cover" />
          </div>
          <div className="p-6">
            <p className="text-orange-500 font-bold text-xs uppercase mb-2">{post.date}</p>
            <h3 className="text-xl font-bold text-white mb-3">{post.title}</h3>
            <p className="text-zinc-500 text-sm leading-relaxed mb-6">{post.excerpt}</p>
            <button className="text-orange-500 font-bold text-sm hover:underline">Read Article</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const PrivacyPolicyView: React.FC = () => (
  <div className="py-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-invert">
    <h1 className="text-4xl font-black text-white mb-8">Privacy Policy</h1>
    <p className="text-zinc-400">Last updated: May 20, 2024</p>
    <section className="space-y-6 text-zinc-300">
      <p>Your privacy is important to us. It is LA Hood Cleaning Pro's policy to respect your privacy regarding any information we may collect from you across our website.</p>
      <h2 className="text-2xl font-bold text-white mt-8">Information We Collect</h2>
      <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent.</p>
      <h2 className="text-2xl font-bold text-white mt-8">How We Use Information</h2>
      <p>We use the collected information to respond to inquiries, provide quotes, and manage service bookings. We do not share any personally identifying information publicly or with third-parties, except when required to by law.</p>
    </section>
  </div>
);

const TermsView: React.FC = () => (
  <div className="py-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-invert">
    <h1 className="text-4xl font-black text-white mb-8">Terms of Service</h1>
    <p className="text-zinc-400">Effective Date: May 20, 2024</p>
    <section className="space-y-6 text-zinc-300">
      <h2 className="text-2xl font-bold text-white mt-8">1. Terms</h2>
      <p>By accessing this website, you are agreeing to be bound by these website Terms and Conditions of Use and all applicable laws and regulations.</p>
      <h2 className="text-2xl font-bold text-white mt-8">2. Service Scope</h2>
      <p>All cleaning and maintenance services are subject to on-site inspection. Quotes provided via our online form are estimates only and may change after a physical assessment.</p>
    </section>
  </div>
);

const AdminDashboard: React.FC<{ 
  settings: SiteSettings, setSettings: any, 
  services: Service[], setServices: any,
  leads: Lead[], setLeads: any,
  testimonials: Testimonial[], setTestimonials: any,
  posts: any[], setPosts: any
}> = ({ settings, setSettings, services, setServices, leads, setLeads, testimonials, setTestimonials, posts, setPosts }) => {
  const [activeTab, setActiveTab] = useState<'leads' | 'services' | 'blog' | 'settings'>('leads');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col">
        <div className="p-6 border-b border-zinc-800">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-600 rounded">
              <LayoutDashboard size={20} className="text-white" />
            </div>
            <span className="font-bold text-white uppercase tracking-tight">Admin Console</span>
          </div>
        </div>
        
        <nav className="flex-grow p-4 space-y-2">
          <AdminNavLink icon={<Users size={20} />} label="Leads" active={activeTab === 'leads'} onClick={() => setActiveTab('leads')} />
          <AdminNavLink icon={<FileText size={20} />} label="Services" active={activeTab === 'services'} onClick={() => setActiveTab('services')} />
          <AdminNavLink icon={<Newspaper size={20} />} label="Blog" active={activeTab === 'blog'} onClick={() => setActiveTab('blog')} />
          <AdminNavLink icon={<Settings size={20} />} label="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <button onClick={() => navigate('/')} className="flex items-center space-x-3 w-full p-3 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-all">
            <LogOut size={20} />
            <span className="font-medium">Exit Admin</span>
          </button>
        </div>
      </aside>

      <main className="flex-grow p-8 overflow-y-auto">
        {activeTab === 'leads' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-white">Incoming Leads</h2>
              <div className="px-4 py-2 bg-zinc-800 text-zinc-400 rounded-lg text-sm">Total: {leads.length}</div>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
              <table className="w-full text-left">
                <thead className="bg-zinc-800/50 border-b border-zinc-800">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold uppercase text-zinc-500">Contact</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase text-zinc-500">Restaurant</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase text-zinc-500">Service</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase text-zinc-500">Status</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase text-zinc-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {leads.map(lead => (
                    <tr key={lead.id} className="hover:bg-zinc-800/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-white">{lead.name}</div>
                        <div className="text-sm text-zinc-500">{lead.phone}</div>
                      </td>
                      <td className="px-6 py-4 text-zinc-300">{lead.restaurantName}</td>
                      <td className="px-6 py-4 text-zinc-400 text-sm">
                        {services.find(s => s.id === lead.serviceId)?.title || 'General'}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                          lead.status === 'new' ? 'bg-orange-500/10 text-orange-500' : 'bg-green-500/10 text-green-500'
                        }`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="p-2 text-zinc-500 hover:text-white transition-colors"><Edit2 size={16} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'blog' && (
          <div className="space-y-8">
             <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-white">Blog Management</h2>
              <button className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded-lg font-bold">
                <Plus size={18} />
                <span>New Post</span>
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {posts.map(post => (
                <div key={post.id} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <img src={post.image} className="w-16 h-16 rounded-xl object-cover" />
                    <div>
                      <h3 className="font-bold text-white">{post.title}</h3>
                      <p className="text-sm text-zinc-500">{post.date}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-zinc-400 hover:text-white"><Edit2 size={18} /></button>
                    <button className="p-2 text-red-500 hover:text-red-400"><Trash2 size={18} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'services' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-white">Manage Services</h2>
              <button className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded-lg font-bold">
                <Plus size={18} />
                <span>Add Service</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map(service => (
                <div key={service.id} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl relative group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-zinc-800 rounded-lg text-orange-500 group-hover:bg-orange-600 transition-colors">
                      {getIcon(service.icon, "w-6 h-6 group-hover:text-white")}
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded text-zinc-400"><Edit2 size={14} /></button>
                      <button className="p-2 bg-zinc-800 hover:bg-red-900/50 rounded text-red-500"><Trash2 size={14} /></button>
                    </div>
                  </div>
                  <h3 className="font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-sm text-zinc-500 line-clamp-2">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-2xl space-y-12">
            <h2 className="text-3xl font-bold text-white">Site Settings</h2>
            
            <section className="space-y-6">
              <h3 className="text-xl font-bold text-orange-500 border-b border-zinc-800 pb-2">Business Information</h3>
              <div className="grid gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-500 uppercase">Website Name</label>
                  <input 
                    type="text" 
                    value={settings.name} 
                    onChange={e => setSettings({...settings, name: e.target.value})}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-500 uppercase">Phone</label>
                    <input 
                      type="text" 
                      value={settings.phone} 
                      onChange={e => setSettings({...settings, phone: e.target.value})}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-500 uppercase">Email</label>
                    <input 
                      type="email" 
                      value={settings.email} 
                      onChange={e => setSettings({...settings, email: e.target.value})}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>
              </div>
            </section>

            <button className="w-full bg-orange-600 hover:bg-orange-500 text-white font-black py-4 rounded-xl transition-all shadow-xl shadow-orange-900/20">
              Save All Changes
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

const AdminNavLink: React.FC<{ icon: React.ReactNode, label: string, active: boolean, onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex items-center space-x-3 w-full p-4 rounded-xl transition-all ${
      active ? 'bg-orange-600 text-white shadow-lg shadow-orange-900/20' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
    }`}
  >
    {icon}
    <span className="font-semibold">{label}</span>
  </button>
);

const ServicesView: React.FC<{ services: Service[] }> = ({ services }) => (
  <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 className="text-5xl font-black text-white mb-8">Our Professional Services</h1>
    <div className="grid gap-12">
      {services.map((s, idx) => (
        <div key={s.id} className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}>
          <div className="w-full md:w-1/2">
            <div className="aspect-video bg-zinc-900 rounded-3xl border border-zinc-800 flex items-center justify-center text-zinc-700 overflow-hidden group">
               <div className="absolute inset-0 bg-orange-600/5 group-hover:bg-orange-600/10 transition-colors" />
               {getIcon(s.icon, "w-24 h-24 opacity-20 text-orange-500")}
            </div>
          </div>
          <div className="w-full md:w-1/2 space-y-6">
            <span className="text-orange-500 font-bold uppercase tracking-widest text-sm">{s.category}</span>
            <h2 className="text-4xl font-bold text-white">{s.title}</h2>
            <p className="text-zinc-400 text-lg leading-relaxed">{s.description}</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {s.features.map(f => (
                <li key={f} className="flex items-center text-zinc-300">
                  <CheckCircle2 size={18} className="text-orange-500 mr-3" />
                  {f}
                </li>
              ))}
            </ul>
            <Link to="/contact" className="inline-flex items-center text-orange-500 font-bold hover:text-orange-400 transition-colors group">
              Get an estimate <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ContactView: React.FC<{ settings: SiteSettings, setLeads: any }> = ({ settings, setLeads }) => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', restaurant: '', service: '1' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLead: Lead = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      restaurantName: formData.restaurant,
      serviceId: formData.service,
      status: 'new',
      createdAt: new Date().toISOString()
    };
    setLeads((prev: Lead[]) => [newLead, ...prev]);
    setSubmitted(true);
  };

  return (
    <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-20">
        <div className="space-y-12">
          <div>
            <h1 className="text-5xl font-black text-white mb-6">Let's Secure Your Kitchen.</h1>
            <p className="text-xl text-zinc-400 leading-relaxed">
              Fill out the form for a free on-site assessment and same-day quote. 
              Our experts are ready to ensure your restaurant stays compliant and safe.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-6 p-6 bg-zinc-900/50 border border-zinc-800 rounded-3xl">
              <div className="w-14 h-14 bg-orange-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-900/20">
                <Phone size={28} />
              </div>
              <div>
                <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Call Us Now</p>
                <p className="text-2xl font-black text-white">{settings.phone}</p>
              </div>
            </div>
            <div className="flex items-center space-x-6 p-6 bg-zinc-900/50 border border-zinc-800 rounded-3xl">
              <div className="w-14 h-14 bg-zinc-800 rounded-2xl flex items-center justify-center text-orange-500">
                <Mail size={28} />
              </div>
              <div>
                <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Email Us</p>
                <p className="text-2xl font-black text-white">{settings.email}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-orange-900/5">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <input required placeholder="Your Name" className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-5 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-all" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                <input required placeholder="Phone Number" className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-5 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-all" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
              </div>
              <input required type="email" placeholder="Email Address" className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-5 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-all" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              <input placeholder="Restaurant Name" className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-5 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-all" value={formData.restaurant} onChange={e => setFormData({...formData, restaurant: e.target.value})} />
              <select className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-orange-500 transition-all" value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})}>
                <option value="1">Hood Cleaning</option>
                <option value="2">Maintenance</option>
                <option value="3">Compliance Audit</option>
              </select>
              <button type="submit" className="w-full bg-orange-600 hover:bg-orange-500 text-white font-black py-5 rounded-2xl text-lg transition-all transform active:scale-95 shadow-xl shadow-orange-900/20">
                Get My Free Estimate
              </button>
            </form>
          ) : (
            <div className="text-center py-20 space-y-6">
              <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={48} />
              </div>
              <h3 className="text-3xl font-bold text-white">Message Sent!</h3>
              <p className="text-zinc-400">One of our specialists will contact you shortly.</p>
              <button onClick={() => setSubmitted(false)} className="text-orange-500 font-bold hover:underline">Send another inquiry</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AboutView: React.FC = () => (
  <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
    <div className="max-w-3xl">
      <h1 className="text-6xl font-black text-white mb-10 leading-none">Pioneering Kitchen Safety in Los Angeles.</h1>
      <p className="text-2xl text-zinc-400 leading-relaxed">
        Founded in 2008, Los Angeles Hood Cleaning has grown from a single truck to the city's premier partner for commercial kitchen fire prevention.
      </p>
    </div>
    <div className="grid md:grid-cols-3 gap-12">
      <AboutCard title="Our Mission" content="To provide the most thorough, honest, and reliable hood cleaning service in Southern California, ensuring every kitchen we touch is a safe environment." />
      <AboutCard title="Our Values" content="Transparency, compliance, and uncompromising quality. We believe in doing the job right the first time, every time." />
      <AboutCard title="Our Promise" content="NFPA 96 compliance isn't just a standard—it's our baseline. We provide the documentation you need for total peace of mind." />
    </div>
  </div>
);

const AboutCard: React.FC<{ title: string, content: string }> = ({ title, content }) => (
  <div className="space-y-4">
    <h3 className="text-xl font-bold text-orange-500 uppercase tracking-widest">{title}</h3>
    <p className="text-lg text-zinc-300 leading-relaxed">{content}</p>
  </div>
);

const Footer: React.FC<{ settings: SiteSettings }> = ({ settings }) => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-8">
              <div className="w-8 h-8 bg-orange-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">LA</span>
              </div>
              <span className="text-xl font-black tracking-tight text-white">{settings.name}</span>
            </Link>
            <p className="text-zinc-500 leading-relaxed mb-6">
              Los Angeles' premier commercial kitchen exhaust cleaning and maintenance service.
            </p>
            <div className="flex space-x-4">
              <a href={settings.facebook} className="text-zinc-600 hover:text-orange-500"><ExternalLink size={20} /></a>
              <a href={settings.instagram} className="text-zinc-600 hover:text-orange-500"><ExternalLink size={20} /></a>
              <a href={settings.youtube} className="text-zinc-600 hover:text-orange-500"><ExternalLink size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-sm">Explore</h4>
            <ul className="space-y-4 text-zinc-500">
              <li><Link to="/" className="hover:text-orange-500">Home</Link></li>
              <li><Link to="/services" className="hover:text-orange-500">Services</Link></li>
              <li><Link to="/about" className="hover:text-orange-500">About Us</Link></li>
              <li><Link to="/blog" className="hover:text-orange-500">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-orange-500">Contact</Link></li>
              <li><Link to="/admin" className="hover:text-orange-500 text-xs opacity-50">Admin Login</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-sm">Services</h4>
            <ul className="space-y-4 text-zinc-500">
              <li><Link to="/services" className="hover:text-orange-500">Exhaust Cleaning</Link></li>
              <li><Link to="/services" className="hover:text-orange-500">Fan Maintenance</Link></li>
              <li><Link to="/services" className="hover:text-orange-500">Filter Exchange</Link></li>
              <li><Link to="/services" className="hover:text-orange-500">Hinge Kits</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-sm">Contact</h4>
            <ul className="space-y-4 text-zinc-500">
              <li className="flex items-center space-x-3 text-zinc-300">
                <Phone size={18} className="text-orange-500" />
                <span>{settings.phone}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-zinc-600" />
                <span>{settings.email}</span>
              </li>
              <li className="text-sm italic">
                {settings.address}
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-zinc-600">
          <p>© {currentYear} {settings.name}. All rights reserved.</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default App;
