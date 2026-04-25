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
    <div className="min-h-screen bg-[#EDE4F8]">
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
            className="flex items-center gap-2 text-[11px] font-bold text-[#E67E22] px-3.5 py-1.5 rounded-full"
            style={{ background: 'rgba(230,126,34,0.12)', border: '1px solid rgba(230,126,34,0.25)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#E67E22] inline-block" />
            {freeCount} Free
          </span>
          <span
            className="flex items-center gap-2 text-[11px] font-bold text-[#7B3FE4] px-3.5 py-1.5 rounded-full"
            style={{ background: 'rgba(123,63,228,0.10)', border: '1px solid rgba(123,63,228,0.30)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#7B3FE4] inline-block" />
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
