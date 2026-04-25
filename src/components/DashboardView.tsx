import { motion } from 'motion/react';
import { FileText, Download, BookOpen, ArrowRight } from 'lucide-react';
import { BRANDING } from '../branding';

export default function DashboardView({ onConsultationAction }: { onConsultationAction: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-8 max-w-6xl mx-auto space-y-12"
    >
      {/* Header */}
      <div className="text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-5xl font-serif font-bold text-brand-primary-dark tracking-tight mb-4">
            LashZone Consultation Hub
          </h1>
          <p className="text-xl text-[#333] font-light max-w-2xl mx-auto leading-relaxed">
            Your professional resource centre for consultation documents and guides.
            Access downloadable PDFs to enhance your lash consultation practice.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-4"
        >
          <button
            onClick={onConsultationAction}
            className="px-8 py-4 bg-brand-primary text-white rounded-xl font-semibold hover:bg-brand-primary-dark transition-all shadow-lg hover:shadow-xl flex items-center gap-3"
          >
            Browse Resources
            <ArrowRight size={20} />
          </button>
        </motion.div>
      </div>

      {/* Featured Resources */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <div className="bg-white border border-brand-border-light rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-brand-primary-light rounded-lg flex items-center justify-center mb-4">
            <BookOpen className="text-brand-primary" size={24} />
          </div>
          <h3 className="font-semibold text-[#000000] mb-2">Free Guide</h3>
          <p className="text-sm text-[#444] mb-4">Get started with our introductory consultation guide.</p>
          <button
            onClick={onConsultationAction}
            className="text-brand-primary font-medium text-sm hover:text-brand-primary-dark transition-colors"
          >
            View Resource →
          </button>
        </div>

        <div className="bg-white border border-brand-border-light rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-brand-accent/10 rounded-lg flex items-center justify-center mb-4">
            <FileText className="text-brand-accent" size={24} />
          </div>
          <h3 className="font-semibold text-[#000000] mb-2">Checklists</h3>
          <p className="text-sm text-[#444] mb-4">Essential preparation checklists for consultations.</p>
          <button
            onClick={onConsultationAction}
            className="text-brand-primary font-medium text-sm hover:text-brand-primary-dark transition-colors"
          >
            View Resource →
          </button>
        </div>

        <div className="bg-white border border-brand-border-light rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-brand-primary-light rounded-lg flex items-center justify-center mb-4">
            <Download className="text-brand-primary" size={24} />
          </div>
          <h3 className="font-semibold text-[#000000] mb-2">Step-by-Step</h3>
          <p className="text-sm text-[#444] mb-4">Detailed consultation framework guides.</p>
          <button
            onClick={onConsultationAction}
            className="text-brand-primary font-medium text-sm hover:text-brand-primary-dark transition-colors"
          >
            View Resource →
          </button>
        </div>

        <div className="bg-white border border-brand-border-light rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-brand-accent/10 rounded-lg flex items-center justify-center mb-4">
            <FileText className="text-brand-accent" size={24} />
          </div>
          <h3 className="font-semibold text-[#000000] mb-2">Forms</h3>
          <p className="text-sm text-[#444] mb-4">Professional consultation form templates.</p>
          <button
            onClick={onConsultationAction}
            className="text-brand-primary font-medium text-sm hover:text-brand-primary-dark transition-colors"
          >
            View Resource →
          </button>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center text-[#666] text-sm"
      >
        Professional consultation resources for lash artists
      </motion.div>
    </motion.div>
  );
}