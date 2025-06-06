// Card component for displaying an icon and label, with click handling
import React from "react";
import { FaTruckMoving, FaRoad, FaWeightHanging, FaBan, FaCheckCircle } from "react-icons/fa";

interface CardProps {
  icon: string;
  label: string;
  onClick: () => void;
  selected?: boolean;
  details?: {
    price: number;
    vat: number;
    hirePeriod: number;
    allowedOnRoad: boolean;
    allowsHeavyWaste: boolean;
  };
  size?: number;
  viewStyle?: "grid" | "list";
}

const getSkipIcon = (size: number) => {
  if (size <= 6) return <FaTruckMoving className="text-blue-500 text-5xl sm:text-6xl" title="Small skip" />;
  if (size <= 10) return <FaTruckMoving className="text-green-500 text-5xl sm:text-6xl" title="Medium skip" />;
  if (size <= 16) return <FaTruckMoving className="text-yellow-500 text-5xl sm:text-6xl" title="Large skip" />;
  return <FaTruckMoving className="text-purple-500 text-5xl sm:text-6xl" title="Extra large skip" />;
};

const Card: React.FC<CardProps> = ({ icon, label, onClick, selected, details, size, viewStyle = "grid" }) => (
  <div
    onClick={onClick}
    className={`relative group ${viewStyle === "grid"
      ? "flex flex-col items-stretch bg-white shadow-lg rounded-2xl border border-blue-100 transition-all cursor-pointer hover:shadow-2xl hover:scale-[1.03] focus:outline-none focus:ring-4 focus:ring-blue-200 p-6 md:p-8 gap-4"
      : "flex flex-row items-center bg-white shadow-md rounded-xl border border-blue-100 transition-all cursor-pointer hover:shadow-lg hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-blue-200 p-4 md:p-6 gap-6"} ${selected ? "ring-2 ring-blue-500 border-blue-400" : ""}`}
    style={viewStyle === "grid"
      ? { minHeight: 220, minWidth: 0, width: '100%', maxWidth: 380, margin: '0 auto', overflow: 'hidden' }
      : { minHeight: 120, width: '100%', maxWidth: 700, margin: '0 auto', overflow: 'hidden' }}
    tabIndex={0}
    aria-pressed={selected}
  >
    {/* Icon or fallback */}
    <div className={viewStyle === "grid"
      ? "flex items-center justify-center h-32 bg-gradient-to-br from-blue-100/80 to-pink-100/60 border-b border-blue-100 relative mb-4"
      : "flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-100/80 to-pink-100/60 border border-blue-100 rounded-2xl mr-6 relative"}>
      {typeof size === "number" ? getSkipIcon(size) : (
        <div className="w-16 h-16 bg-pink-200 rounded-lg flex items-center justify-center shadow-inner">
          <svg width="32" height="32" viewBox="0 0 32 32" className="block">
            <rect x="0" y="0" width="32" height="32" rx="6" fill="#e0e7ff" />
            <rect x="6" y="6" width="20" height="20" rx="4" fill="#f472b6" />
            <rect x="12" y="12" width="8" height="8" rx="2" fill="#a5b4fc" />
          </svg>
        </div>
      )}
      {selected && (
        <span className="absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white text-xs px-3 py-1 rounded-full shadow font-semibold tracking-wide border border-blue-700 animate-bounce z-10">Selected</span>
      )}
    </div>
    <div className={viewStyle === "grid"
      ? "flex-1 flex flex-col justify-between gap-3"
      : "flex-1 flex flex-col justify-center gap-3"}>
      <div className={viewStyle === "grid"
        ? "text-xl font-bold mb-2 text-blue-900 text-center tracking-wide leading-tight"
        : "text-lg font-bold text-blue-900 mb-1"}>
        {label}
      </div>
      {details && (
        <ul className={viewStyle === "grid"
          ? "w-full text-sm text-gray-700 space-y-2 mb-2 text-center flex flex-col items-center"
          : "w-full text-xs sm:text-sm text-gray-700 flex flex-wrap gap-3 items-center"}>
          <li className="flex items-center gap-2 justify-center">
            <FaWeightHanging className="text-blue-400" title="Price" />
            <span className="font-bold text-blue-700 text-lg">£{details.price}</span> <span className="text-gray-400 font-medium">+ VAT</span>
          </li>
          <li className="flex items-center gap-2 justify-center">
            <FaTruckMoving className="text-green-400" title="Hire period" />
            <span className="font-medium text-gray-800">{details.hirePeriod} days</span> <span className="text-gray-400">hire</span>
          </li>
          <li className={`flex items-center gap-2 justify-center rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${details.allowedOnRoad ? "bg-green-100 text-green-700 border border-green-200" : "bg-red-100 text-red-600 border border-red-200"}`}>
            <FaRoad className={details.allowedOnRoad ? "text-green-500" : "text-red-400"} />
            {details.allowedOnRoad ? "On-road allowed" : "On-road not allowed"}
          </li>
          <li className={`flex items-center gap-2 justify-center rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${details.allowsHeavyWaste ? "bg-green-100 text-green-700 border border-green-200" : "bg-red-100 text-red-600 border border-red-200"}`}>
            {details.allowsHeavyWaste ? <FaCheckCircle className="text-green-500" /> : <FaBan className="text-red-400" />}
            {details.allowsHeavyWaste ? "Heavy waste allowed" : "No heavy waste"}
          </li>
        </ul>
      )}
    </div>
    {/* Subtle highlight for accessibility and professionalism */}
    <div className="absolute inset-0 pointer-events-none rounded-2xl group-hover:ring-4 group-hover:ring-blue-100 transition-all" />
  </div>
);

export default Card;
