/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Product } from '../products';
import { ArrowLeft, Send, ShieldCheck, CreditCard, Lock, Info, CheckCircle2 } from 'lucide-react';

interface PaidViewProps {
  product: Product;
  onBack: () => void;
  key?: string;
}

export default function PaidView({ product, onBack }: PaidViewProps) {
  return (
    <motion.div
      key={product.id}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-4xl mx-auto p-8 pb-24"
    >
      {/* Navigation Header */}
      <div className="flex items-center justify-between mb-12">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-brand-primary/60 hover:text-brand-primary transition-all group"
        >
          <div className="p-2 rounded-lg group-hover:bg-brand-primary/5">
            <ArrowLeft size={16} />
          </div>
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Return to Guide</span>
        </button>
        
        <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-600 rounded-full border border-green-100">
          <Lock size={12} />
          <span className="text-[10px] font-bold uppercase tracking-widest">End-to-End Encrypted</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Form Area */}
        <div className="lg:col-span-3 space-y-10">
          <div className="space-y-4">
            <h2 className="text-4xl font-serif font-bold text-brand-primary-dark tracking-tight">
              Module Access Request
            </h2>
            <p className="text-base text-brand-ink-deep/60 font-light leading-relaxed max-w-xl">
              Please provide the following details to generate your personalised {product.paidTitle.toLowerCase()}. 
              All data is processed according to our security protocols.
            </p>
          </div>

          <div className="bg-white border border-brand-border-light rounded-3xl p-10 shadow-brand-md space-y-10">
            <div className="space-y-8">
              <h4 className="text-[11px] uppercase tracking-[0.25em] font-black text-brand-accent-dark">Operational Identification</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-brand-primary-dark/40 uppercase tracking-[0.1em]">Studio / Artist Entity</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Aura Lash Studio" 
                    className="w-full bg-brand-primary-light/50 border border-brand-primary/10 rounded-2xl px-5 py-4 focus:border-brand-primary focus:bg-white outline-none transition-all text-sm font-bold text-brand-ink-deep placeholder:text-brand-primary/20 shadow-brand-sm"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-brand-primary-dark/40 uppercase tracking-[0.1em]">Official Email Address</label>
                  <input 
                    type="email" 
                    placeholder="professional@lashzone.co.uk" 
                    className="w-full bg-brand-primary-light/50 border border-brand-primary/10 rounded-2xl px-5 py-4 focus:border-brand-primary focus:bg-white outline-none transition-all text-sm font-bold text-brand-ink-deep placeholder:text-brand-primary/20 shadow-brand-sm"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <h4 className="text-[11px] uppercase tracking-[0.25em] font-black text-brand-accent-dark">Processing Requirements</h4>
              <div className="space-y-3">
                <label className="text-[11px] font-black text-brand-primary-dark/40 uppercase tracking-[0.1em]">Specific Customisations</label>
                <textarea 
                  placeholder="Enter any specific requirements for this module..." 
                  rows={4}
                  className="w-full bg-brand-primary-light/50 border border-brand-primary/10 rounded-2xl px-5 py-4 focus:border-brand-primary focus:bg-white outline-none transition-all text-sm font-bold resize-none text-brand-ink-deep placeholder:text-brand-primary/20 shadow-brand-sm"
                />
              </div>
            </div>

            <div className="pt-4">
              <button className="w-full py-5 bg-brand-accent text-white text-[12px] uppercase tracking-[0.3em] font-black rounded-2xl hover:bg-brand-accent-dark transition-all shadow-brand-lg active:scale-[0.98] flex items-center justify-center gap-3">
                Initialise Asset Generation
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white border border-brand-border-light rounded-3xl p-8 shadow-brand-md space-y-8">
            <h4 className="text-[11px] uppercase tracking-[0.25em] font-black text-brand-primary-dark">Access Benefits</h4>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="p-1.5 bg-green-500/10 rounded-lg h-fit">
                  <CheckCircle2 size={18} className="text-green-500" />
                </div>
                <div>
                  <p className="text-sm font-black text-brand-ink-deep leading-tight mb-1">Dynamic Generation</p>
                  <p className="text-[11px] text-brand-primary/60 font-medium leading-relaxed">Your assets are built in real-time based on your input.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="p-1.5 bg-green-500/10 rounded-lg h-fit">
                  <CheckCircle2 size={18} className="text-green-500" />
                </div>
                <div>
                  <p className="text-sm font-black text-brand-ink-deep leading-tight mb-1">Commercial Licence</p>
                  <p className="text-[11px] text-brand-primary/60 font-medium leading-relaxed">Includes full usage rights for your primary studio location.</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-brand-primary-light rounded-2xl border border-brand-primary/10 flex items-center gap-4 shadow-brand-sm">
              <div className="p-3 bg-brand-accent text-white rounded-xl shadow-brand-md">
                <CreditCard size={20} />
              </div>
              <div>
                <p className="text-[9px] font-black text-brand-primary/40 uppercase tracking-[0.2em]">Service Tier</p>
                <p className="text-sm font-black text-brand-primary-dark">Enterprise Pro</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-brand-border-light rounded-3xl p-8 flex flex-col items-center text-center space-y-4 shadow-brand-sm">
            <div className="p-4 bg-brand-primary-light rounded-2xl border border-brand-primary/10">
              <ShieldCheck size={28} className="text-brand-primary" />
            </div>
            <div className="space-y-2">
              <h5 className="text-[11px] font-black text-brand-primary-dark uppercase tracking-[0.2em]">Security Protocol</h5>
              <p className="text-[11px] text-brand-ink-deep/40 font-light leading-relaxed">
                Personalised data is encrypted and partitioned at the database level.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
