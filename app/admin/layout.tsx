'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  MessageSquare,
  DollarSign,
  HelpCircle,
  Briefcase,
  Layers,
  Sparkles,
  Image as ImageIcon,
  UserCircle,
  Building2
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Services', href: '/admin/services', icon: Layers },
  { label: 'Projects', href: '/admin/projects', icon: Briefcase },
  { label: 'Leads', href: '/admin/leads', icon: MessageSquare },
  { label: 'Testimonials', href: '/admin/testimonials', icon: Users },
  { label: 'FAQs', href: '/admin/faqs', icon: HelpCircle },
  { label: 'Pricing', href: '/admin/pricing', icon: DollarSign },
  { label: 'Team', href: '/admin/team', icon: Users },
  { label: 'Blog', href: '/admin/blog', icon: FileText },
  { label: 'Project Media', href: '/admin/project-media', icon: ImageIcon },
  { label: 'Founder', href: '/admin/founder', icon: UserCircle },
  { label: 'Client Logos', href: '/admin/client-logos', icon: Building2 },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<any>(null);

  useEffect(() => {
    // Get user details from localStorage if they exist
    const userStr = localStorage.getItem('admin_user');
    if (userStr) {
      try {
        setAdminUser(JSON.parse(userStr));
      } catch (e) {}
    }
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch('/admin/api/auth/logout', { method: 'POST' });
      if (res.ok) {
        localStorage.removeItem('admin_user');
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between z-40">
        <div className="flex items-center space-x-2">
          <Sparkles className="text-blue-600" size={24} />
          <span className="font-bold text-slate-800 tracking-tight font-montserrat">Arrowhead Admin</span>
        </div>
        <button 
          onClick={toggleSidebar}
          className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 h-screen sticky top-0 p-6 flex-shrink-0 justify-between">
        <div className="space-y-8">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Sparkles size={24} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 tracking-tight font-montserrat leading-tight">Arrowhead</h1>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest font-poppins">Management</p>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start font-medium py-3 text-sm rounded-xl transition-all duration-200 ${
                      isActive 
                        ? 'bg-blue-50 text-blue-600 hover:bg-blue-50 hover:text-blue-600 font-semibold shadow-sm shadow-blue-100/50' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
                    }`}
                  >
                    <Icon className={`mr-3 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} size={18} />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-100 space-y-4">
          {adminUser && (
            <div className="px-3 py-2 bg-slate-50 rounded-xl flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                {adminUser.name ? adminUser.name.charAt(0) : 'A'}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-slate-900 truncate">{adminUser.name || 'Admin User'}</p>
                <p className="text-[10px] text-slate-500 truncate">{adminUser.email}</p>
              </div>
            </div>
          )}
          <Button 
            variant="ghost" 
            onClick={handleLogout}
            className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl py-3 font-semibold"
          >
            <LogOut className="mr-3" size={18} />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Mobile Drawer (Overlay) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={toggleSidebar}
              className="lg:hidden fixed inset-0 bg-black z-45"
            />
            {/* Drawer */}
            <motion.aside 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-64 bg-white z-50 p-6 flex flex-col justify-between shadow-2xl"
            >
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Sparkles className="text-blue-600" size={24} />
                    <span className="font-bold text-slate-800 font-montserrat">Management</span>
                  </div>
                  <button onClick={toggleSidebar} className="p-1 text-slate-500 hover:bg-slate-100 rounded-lg">
                    <X size={20} />
                  </button>
                </div>

                <nav className="space-y-1">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                      <Link key={item.href} href={item.href} onClick={toggleSidebar}>
                        <Button
                          variant="ghost"
                          className={`w-full justify-start py-3 text-sm rounded-xl font-medium ${
                            isActive 
                              ? 'bg-blue-50 text-blue-600 font-semibold' 
                              : 'text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <Icon className={`mr-3 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} size={18} />
                          {item.label}
                        </Button>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-6 border-t border-slate-100 space-y-4">
                <Button 
                  variant="ghost" 
                  onClick={handleLogout}
                  className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl py-3 font-semibold"
                >
                  <LogOut className="mr-3" size={18} />
                  Sign Out
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Content wrapper */}
      <div className="flex-grow flex flex-col min-w-0">
        <main className="flex-grow p-6 lg:p-10 pt-24 lg:pt-10 overflow-y-auto max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
