/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Product } from '../products';
import { Check, ArrowRight, User, BookOpen, Target, Info, FileText, LayoutList, ShieldCheck } from 'lucide-react';
import { BRANDING } from '../branding';

interface GuideViewProps {
  product: Product;
  onContinue: () => void;
  key?: string;
}

export default function GuideView({ product, onContinue }: GuideViewProps) {
  return (
    <motion.div
      key={product.id}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-6xl mx-auto p-8 space-y-8"
    >
      {/* Module Header Card */}
      <div className="bg-white border border-brand-border-light rounded-3xl p-10 shadow-brand-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary-light rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-50" />
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10 relative z-10">
          <div className="space-y-5 flex-1">
            <div className="flex items-center gap-3 text-brand-primary">
              <div className="p-3 bg-brand-primary-light rounded-xl border border-brand-primary/10">
                <BookOpen size={20} className="text-brand-primary-dark" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-[0.2em] font-black text-brand-primary-dark/40">
                  Secure Resource
                </span>
                <span className="text-[11px] font-black text-brand-primary uppercase tracking-[0.1em]">{product.category}</span>
              </div>
            </div>
            
            <h2 className="text-5xl font-serif font-bold text-brand-primary-dark leading-tight">
              {product.guideTitle}
            </h2>
            <p className="text-xl text-brand-ink-deep/60 font-light max-w-3xl leading-relaxed">
              {product.shortDescription}
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
            <button 
              onClick={onContinue}
              className="px-10 py-5 bg-brand-accent text-white text-[11px] uppercase tracking-[0.25em] font-black rounded-2xl hover:bg-brand-accent-dark transition-all flex items-center justify-center gap-4 shadow-brand-lg active:scale-95"
            >
              Unlock {product.paidTitle}
              <ArrowRight size={18} />
            </button>
            <div className="flex items-center justify-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
              <p className="text-[10px] text-brand-primary/40 font-black uppercase tracking-[0.15em]">
                Verified Asset
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left/Middle Content Panel */}
        <div className="lg:col-span-2 space-y-8">
          {/* Summary Panel */}
          <div className="bg-white border border-brand-border-light rounded-3xl overflow-hidden shadow-brand-sm">
            <div className="p-8 border-b border-brand-primary-light bg-brand-primary-light/30 flex items-center gap-3">
              <div className="p-2 bg-brand-primary rounded-lg shadow-brand-sm">
                <Info size={20} className="text-white" />
              </div>
              <h4 className="text-xs font-black text-brand-primary-dark uppercase tracking-[0.2em]">Platform Overview</h4>
            </div>
            <div className="p-10 space-y-12">
              <section className="space-y-5">
                <h5 className="text-[11px] uppercase tracking-[0.2em] font-black text-brand-accent-dark flex items-center gap-2">
                  <Target size={16} /> Core Objective
                </h5>
                <p className="text-brand-ink-deep/70 font-light leading-relaxed text-lg">
                  {product.whoItIsFor}
                </p>
              </section>

              <section className="space-y-8">
                <h5 className="text-[11px] uppercase tracking-[0.2em] font-black text-brand-accent-dark flex items-center gap-2">
                  <LayoutList size={16} /> System Deliverables
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {product.benefits.map((benefit, i) => (
                    <div key={i} className="flex gap-4 p-5 rounded-2xl bg-brand-primary-light/50 border border-brand-primary/10 group hover:border-brand-primary/30 transition-all shadow-brand-sm">
                      <div className="w-8 h-8 rounded-xl bg-brand-primary text-white flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Check size={16} />
                      </div>
                      <span className="text-sm font-bold text-brand-primary-dark leading-snug">{benefit}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Right Sidebar Panel */}
        <div className="space-y-8">
          {/* Module Resources List */}
          <div className="bg-white border border-brand-border-light rounded-3xl overflow-hidden shadow-brand-md">
            <div className="p-8 border-b border-brand-primary-light bg-brand-primary-light/30 flex items-center gap-3">
              <div className="p-2 bg-brand-primary rounded-lg shadow-brand-sm">
                <FileText size={20} className="text-white" />
              </div>
              <h4 className="text-xs font-black text-brand-primary-dark uppercase tracking-[0.2em]">Module Assets</h4>
            </div>
            <div className="p-8">
              <div className="space-y-4">
                {product.includedItems.map((item, i) => (
                  <div key={i} className="flex gap-5 items-center p-4 rounded-2xl bg-brand-primary-light/30 hover:bg-brand-primary-light transition-all border border-transparent hover:border-brand-primary/10 group">
                    <div className="w-10 h-10 rounded-xl bg-white border border-brand-primary/10 flex items-center justify-center flex-shrink-0 shadow-brand-sm">
                      <span className="text-xs font-black text-brand-primary-dark">{i + 1}</span>
                    </div>
                    <span className="text-sm font-bold text-brand-primary-dark/80 group-hover:text-brand-primary transition-colors">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-10 pt-8 border-t border-dashed border-brand-primary/20">
                <div className="flex items-center gap-4 p-5 bg-brand-accent/5 rounded-2xl border border-brand-accent/10">
                  <ShieldCheck size={20} className="text-brand-accent" />
                  <p className="text-[11px] text-brand-accent-dark font-black uppercase tracking-[0.15em] leading-relaxed">
                    Verified Digital Asset
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Action Box */}
          <div className="bg-brand-primary p-8 rounded-2xl text-white shadow-xl shadow-brand-primary/20">
            <h4 className="text-lg font-bold mb-3 tracking-tight">Need customisation?</h4>
            <p className="text-xs text-white/70 font-light mb-6 leading-relaxed">
              Standard modules can be tailored to your studio's specific branding requirements.
            </p>
            <button className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all">
              Request Studio Patch
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
