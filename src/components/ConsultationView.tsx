/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RESOURCES } from '../products';
import ResourceCard from './ResourceCard';

export default function ConsultationView() {
  const freeCount = RESOURCES.filter(r => r.isFree).length;
  const paidCount = RESOURCES.filter(r => !r.isFree).length;

  return (
    <div className="min-h-screen bg-brand-bg-soft">
      <div className="px-4 md:px-8 py-6 md:py-10 max-w-6xl mx-auto">

        {/* Heading */}
        <h1 className="text-[28px] md:text-[38px] font-serif font-bold text-[#0D1856] mb-2 tracking-tight leading-tight">
          Document Library
        </h1>
        <p className="text-[14px] md:text-[16px] text-[#000000]/65 mb-4 md:mb-6 font-light leading-relaxed">
          Essential resources for professional lash consultations
        </p>

        {/* Access summary badges */}
        <div className="flex items-center gap-2 md:gap-3 mb-6 md:mb-10">
          <span
            className="flex items-center gap-2 text-[11px] font-bold text-brand-primary px-3.5 py-1.5 rounded-full"
            style={{ background: 'rgba(244,162,97,0.12)', border: '1px solid rgba(244,162,97,0.25)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary inline-block" />
            {freeCount} Free
          </span>
          <span
            className="flex items-center gap-2 text-[11px] font-bold text-brand-accent px-3.5 py-1.5 rounded-full"
            style={{ background: 'rgba(155,93,229,0.10)', border: '1px solid rgba(155,93,229,0.28)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent inline-block" />
            {paidCount} Paid
          </span>
        </div>

        {/* Resource Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {RESOURCES.map(resource => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </div>
    </div>
  );
}
