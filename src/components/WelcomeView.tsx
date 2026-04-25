/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  Clock, 
  ShieldCheck, 
  FileText, 
  Users, 
  Plus,
  ArrowUpRight,
  ClipboardList, 
  CheckCircle2, 
  ShieldAlert, 
  MessageSquareText, 
  Layers, 
  BellRing, 
  TrendingUp, 
  Zap
} from 'lucide-react';

import { BRANDING } from '../branding';
import { PRODUCTS } from '../products';

const ICON_MAP: Record<string, any> = {
  ClipboardList,
  CheckCircle2,
  ShieldAlert,
  MessageSquareText,
  Layers,
  BellRing,
  TrendingUp,
  Zap
};

export default function WelcomeView({ onSelectAction }: { onSelectAction: (id: string) => void, key?: any }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring' as const, damping: 25, stiffness: 200 }
    }
  };

  const stats = [
    { label: 'Total Modules', value: PRODUCTS.length, icon: FileText, color: 'text-brand-primary-dark', bg: 'bg-brand-primary-light' },
    { label: 'Verified Safety', value: '100%', icon: ShieldCheck, color: 'text-brand-primary-dark', bg: 'bg-brand-primary-light' },
    { label: 'Client Retention', value: '+12%', icon: Users, color: 'text-brand-primary-dark', bg: 'bg-brand-primary-light' },
    { label: 'System Health', value: 'Optimal', icon: Zap, color: 'text-brand-accent-dark', bg: 'bg-brand-accent/10' },
  ];

  const categories = ['Consultation', 'Safety', 'Communication', 'Growth'];

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 md:space-y-12 pb-24"
    >
      {/* Welcome Header */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-brand-primary-dark tracking-tight mb-3">
            Welcome, Professional Excellence
          </h2>
          <p className="text-[#333] text-base md:text-lg font-light max-w-xl leading-relaxed">
            This is your internal command centre for {BRANDING.businessName}. Access all proprietary documentation, 
            safety protocols, and management templates below.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 border border-brand-primary/30 bg-white rounded-xl text-sm font-bold text-[#0D1856] hover:bg-brand-primary-light transition-all shadow-brand-sm">
            <Plus size={16} /> New Resource
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-brand-accent text-white rounded-xl text-sm font-bold hover:bg-brand-accent-dark shadow-brand-md transition-all">
            Quick Report
          </button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={i} 
            variants={itemVariants}
            className="p-5 md:p-8 bg-white border border-brand-border-light rounded-2xl md:rounded-3xl shadow-brand-sm hover:shadow-brand-md transition-all group cursor-default"
          >
            <div className="flex items-center justify-between mb-6">
              <div className={`p-4 rounded-2xl ${stat.bg} transition-transform group-hover:scale-110 duration-300`}>
                <stat.icon className={stat.color} size={24} />
              </div>
              <span className="text-[10px] font-black text-[#888] uppercase tracking-[0.2em]">Verified</span>
            </div>
            <h3 className="text-3xl font-black text-brand-primary-dark mb-1 tracking-tight">{stat.value}</h3>
            <p className="text-[10px] font-black text-[#666] uppercase tracking-[0.15em]">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Module Navigation Grid */}
      <div className="space-y-8">
        <motion.div variants={itemVariants} className="flex items-center justify-between">
          <h3 className="text-2xl font-serif font-bold text-brand-primary-dark tracking-tight">Module Library</h3>
          <div className="flex gap-3">
            {categories.map(cat => (
              <button key={cat} className="px-5 py-2 text-[10px] font-black text-[#666] border border-brand-border-light bg-white rounded-full hover:border-brand-primary hover:text-brand-primary uppercase tracking-[0.2em] transition-all shadow-brand-sm">
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product) => {
            const Icon = ICON_MAP[product.iconName] || BookOpen;
            return (
              <motion.div
                key={product.id}
                variants={itemVariants}
                onClick={() => onSelectAction(product.id)}
                className="group p-5 md:p-8 bg-white border border-brand-border-light rounded-2xl md:rounded-3xl hover:border-brand-primary shadow-brand-sm hover:shadow-brand-lg transition-all cursor-pointer relative overflow-hidden"
              >
                <div className="flex items-start justify-between mb-8">
                  <div className="p-4 bg-brand-primary-light group-hover:bg-brand-primary group-hover:text-white rounded-2xl transition-all duration-300 border border-brand-primary/10">
                    <Icon className="transition-colors" size={28} />
                  </div>
                  <div className="text-brand-primary/20 group-hover:text-brand-primary group-hover:scale-125 transition-all">
                    <ArrowUpRight size={24} />
                  </div>
                </div>
                
                <h4 className="text-xl font-bold text-[#000000] mb-3 group-hover:text-brand-primary transition-colors">
                  {product.menuTitle}
                </h4>
                <p className="text-sm text-[#333] font-light leading-relaxed mb-8 line-clamp-2">
                  {product.shortDescription}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-brand-primary-light">
                  <span className="text-[10px] font-black text-[#666] uppercase tracking-[0.2em]">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-2 text-xs font-black text-brand-primary opacity-0 group-hover:opacity-100 transition-all uppercase tracking-widest">
                    Access <ArrowRight size={14} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Featured Insight / Banner */}
      <motion.div 
        variants={itemVariants}
        className="bg-brand-primary rounded-3xl p-10 text-white relative overflow-hidden shadow-2xl shadow-brand-primary/20"
      >
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={20} className="text-brand-accent" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">Premium Tip</span>
          </div>
          <h3 className="text-4xl font-serif italic font-medium leading-[1.2] mb-6">
            "Your standardised consultation is the filter that transforms clients into lifelong advocates."
          </h3>
          <button className="px-8 py-3 bg-white text-brand-primary rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-brand-accent hover:text-white transition-all shadow-lg">
            Review Best Practices
          </button>
        </div>
        
        {/* Abstract shapes for dashboard feel */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/20 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 blur-2xl" />
      </motion.div>
    </motion.div>
  );
}
