import React from 'react';

const MapPin = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);

const Clock = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);

const JobCard = ({ job, onApply, onViewDetails }) => {
  return (
    <div className="group bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full">
      <div className="p-6 flex-grow space-y-4">
        {/* Brand Info */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded bg-gray-50 p-2 border border-gray-100 flex-shrink-0 cursor-pointer" onClick={() => onViewDetails(job)}>
            <img src={job.brandLogo} alt={job.brandName} className="w-full h-full object-contain" />
          </div>
          <div className="cursor-pointer" onClick={() => onViewDetails(job)}>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">{job.brandName}</h4>
            <h3 className="text-lg font-extrabold text-[#28313d] group-hover:text-[#0c9a50] transition-colors leading-tight">
              {job.title}
            </h3>
          </div>
        </div>

        {/* Job Details */}
        <div className="flex flex-wrap gap-4 pt-2">
          <div className="flex items-center text-gray-500 text-[13px] font-medium">
            <MapPin size={14} className="mr-1.5 text-[#0c9a50]" />
            {job.location}
          </div>
          <div className="flex items-center text-gray-500 text-[13px] font-medium">
            <Clock size={14} className="mr-1.5 text-[#0c9a50]" />
            {job.type}
          </div>
        </div>

        {/* Salary & Description */}
        <div className="pt-2">
          <div className="text-[#0c9a50] font-bold text-sm mb-2">{job.salary}</div>
          <p className="text-gray-500 text-[13px] line-clamp-2 leading-relaxed">
            {job.description}
          </p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
        <button 
          onClick={() => onViewDetails(job)}
          className="text-[11px] font-bold text-[#28313d] uppercase tracking-widest hover:text-[#0c9a50] transition-colors"
        >
          View Details
        </button>
        <button 
          onClick={() => onApply(job)}
          className="bg-[#0c9a50] hover:bg-[#0a8545] text-white text-[11px] font-extrabold px-5 py-2 rounded transition-all transform active:scale-95 uppercase tracking-widest"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobCard;
