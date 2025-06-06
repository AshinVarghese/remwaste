import React, { useState, useEffect } from "react";
import Card from "./Card";
import Header from "./Header";

// Type for skip data from API
interface SkipOption {
  id: number;
  size: number;
  hire_period_days: number;
  price_before_vat: number;
  vat: number;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
  forbidden?: boolean;
  postcode?: string;
}

const fetchSkips = async (): Promise<SkipOption[]> => {
  const res = await fetch(
    "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
  );
  return res.json();
};

const getSkipIcon = (size: number) => {
  // Use trending SVGs or emojis for skip sizes
  if (size <= 6) return "🟦";
  if (size <= 10) return "🟩";
  if (size <= 16) return "🟧";
  return "🟪";
};

const SkipSelectionPage: React.FC = () => {
  const [skips, setSkips] = useState<SkipOption[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Filters
  const [onRoadOnly, setOnRoadOnly] = useState(false);
  const [heavyWasteOnly, setHeavyWasteOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [viewStyle, setViewStyle] = useState<"grid" | "list">("grid");
  // New filter states
  const [minSize, setMinSize] = useState<number | null>(null);
  const [maxSize, setMaxSize] = useState<number | null>(null);
  const [hirePeriod, setHirePeriod] = useState<number | null>(null);
  const [forbiddenOnly, setForbiddenOnly] = useState<boolean>(false);
  const [postcode, setPostcode] = useState<string>("");

  useEffect(() => {
    fetchSkips()
      .then((data) => {
        setSkips(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load skips.");
        setLoading(false);
      });
  }, []);

  const handleClick = (id: number) => setSelected(id);

  // Filtering logic
  const filteredSkips = skips.filter((skip) => {
    if (onRoadOnly && !skip.allowed_on_road) return false;
    if (heavyWasteOnly && !skip.allows_heavy_waste) return false;
    if (maxPrice !== null && skip.price_before_vat > maxPrice) return false;
    if (minSize !== null && skip.size < minSize) return false;
    if (maxSize !== null && skip.size > maxSize) return false;
    if (hirePeriod !== null && skip.hire_period_days !== hirePeriod) return false;
    if (forbiddenOnly && !skip.forbidden) return false;
    if (postcode && !skip.postcode?.toLowerCase().includes(postcode.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f4ff] to-[#e0f7fa] p-0 sm:p-6 flex flex-col">
      <Header />
      <main className="flex-1 w-full max-w-6xl mx-auto flex flex-col gap-6">
        <section className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white/90 rounded-2xl shadow-lg p-4 md:p-6 mt-2 mb-2 border border-blue-100">
          <div className="flex flex-col gap-2 w-full md:w-auto">
            <h2 className="text-2xl font-extrabold text-blue-900 tracking-tight text-center md:text-left mb-2 md:mb-0">
              🚚 Book Your Skip in Lowestoft
            </h2>
            <div className="flex flex-wrap gap-2 md:gap-4 items-center justify-center md:justify-start">
              <div className="flex flex-col items-start">
                <label className="text-xs font-semibold text-blue-800 mb-1">On-road allowed</label>
                <button
                  className={`w-24 px-2 py-1 rounded-lg border text-sm font-semibold transition ${onRoadOnly ? "bg-blue-600 text-white border-blue-600" : "bg-white text-blue-600 border-blue-300 hover:bg-blue-50"}`}
                  onClick={() => setOnRoadOnly((v) => !v)}
                  aria-pressed={onRoadOnly}
                >
                  {onRoadOnly ? "Yes" : "Any"}
                </button>
              </div>
              <div className="flex flex-col items-start">
                <label className="text-xs font-semibold text-blue-800 mb-1">Heavy waste allowed</label>
                <button
                  className={`w-24 px-2 py-1 rounded-lg border text-sm font-semibold transition ${heavyWasteOnly ? "bg-blue-600 text-white border-blue-600" : "bg-white text-blue-600 border-blue-300 hover:bg-blue-50"}`}
                  onClick={() => setHeavyWasteOnly((v) => !v)}
                  aria-pressed={heavyWasteOnly}
                >
                  {heavyWasteOnly ? "Yes" : "Any"}
                </button>
              </div>
              <div className="flex flex-col items-start">
                <label className="text-xs font-semibold text-blue-800 mb-1">Max price (£)</label>
                <input
                  type="number"
                  min={0}
                  value={maxPrice ?? ''}
                  onChange={e => setMaxPrice(e.target.value ? parseInt(e.target.value) : null)}
                  className="w-24 border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 bg-blue-50"
                  placeholder="No limit"
                />
              </div>
              <div className="flex flex-col items-start">
                <label className="text-xs font-semibold text-blue-800 mb-1">Min size (yd³)</label>
                <input
                  type="number"
                  min={0}
                  value={minSize ?? ''}
                  onChange={e => setMinSize(e.target.value ? parseInt(e.target.value) : null)}
                  className="w-20 border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 bg-blue-50"
                  placeholder="Any"
                />
              </div>
              <div className="flex flex-col items-start">
                <label className="text-xs font-semibold text-blue-800 mb-1">Max size (yd³)</label>
                <input
                  type="number"
                  min={0}
                  value={maxSize ?? ''}
                  onChange={e => setMaxSize(e.target.value ? parseInt(e.target.value) : null)}
                  className="w-20 border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 bg-blue-50"
                  placeholder="Any"
                />
              </div>
              <div className="flex flex-col items-start">
                <label className="text-xs font-semibold text-blue-800 mb-1">Hire period (days)</label>
                <input
                  type="number"
                  min={0}
                  value={hirePeriod ?? ''}
                  onChange={e => setHirePeriod(e.target.value ? parseInt(e.target.value) : null)}
                  className="w-20 border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 bg-blue-50"
                  placeholder="Any"
                />
              </div>
              <div className="flex flex-col items-start">
                <label className="text-xs font-semibold text-blue-800 mb-1">Forbidden only</label>
                <button
                  className={`w-24 px-2 py-1 rounded-lg border text-sm font-semibold transition ${forbiddenOnly ? "bg-pink-600 text-white border-pink-600" : "bg-white text-pink-600 border-pink-300 hover:bg-pink-50"}`}
                  onClick={() => setForbiddenOnly((v) => !v)}
                  aria-pressed={forbiddenOnly}
                >
                  {forbiddenOnly ? "Yes" : "Any"}
                </button>
              </div>
              <div className="flex flex-col items-start">
                <label className="text-xs font-semibold text-blue-800 mb-1">Postcode</label>
                <input
                  type="text"
                  value={postcode}
                  onChange={e => setPostcode(e.target.value)}
                  className="w-24 border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 bg-blue-50"
                  placeholder="NR32"
                />
              </div>
              <div className="flex flex-col items-start">
                <label className="text-xs font-semibold text-blue-800 mb-1">View</label>
                <div className="flex gap-1">
                  <button
                    className={`px-3 py-1 rounded-lg border text-sm font-semibold transition ${viewStyle === "grid" ? "bg-blue-600 text-white border-blue-600" : "bg-white text-blue-600 border-blue-300 hover:bg-blue-50"}`}
                    onClick={() => setViewStyle("grid")}
                    aria-label="Grid view"
                  >
                    <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><rect x="2" y="2" width="6" height="6" rx="2" fill="currentColor"/><rect x="12" y="2" width="6" height="6" rx="2" fill="currentColor"/><rect x="2" y="12" width="6" height="6" rx="2" fill="currentColor"/><rect x="12" y="12" width="6" height="6" rx="2" fill="currentColor"/></svg>
                  </button>
                  <button
                    className={`px-3 py-1 rounded-lg border text-sm font-semibold transition ${viewStyle === "list" ? "bg-blue-600 text-white border-blue-600" : "bg-white text-blue-600 border-blue-300 hover:bg-blue-50"}`}
                    onClick={() => setViewStyle("list")}
                    aria-label="List view"
                  >
                    <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><rect x="2" y="4" width="16" height="3" rx="1.5" fill="currentColor"/><rect x="2" y="9" width="16" height="3" rx="1.5" fill="currentColor"/><rect x="2" y="14" width="16" height="3" rx="1.5" fill="currentColor"/></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="flex-1">
          {loading ? (
            <div className="flex justify-center items-center h-60 text-blue-400 animate-pulse text-lg font-semibold">
              Loading skips...
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-60 text-red-500 text-lg font-semibold">
              {error}
            </div>
          ) : filteredSkips.length === 0 ? (
            <div className="flex justify-center items-center h-60 text-gray-400 text-lg font-semibold">
              No skips match your filters.
            </div>
          ) : (
            <div
              className={
                viewStyle === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "flex flex-col gap-4"
              }
            >
              {filteredSkips.map((skip) => (
                <Card
                  key={skip.id}
                  icon={""}
                  size={skip.size}
                  label={`${skip.size} yd³ Skip`}
                  onClick={() => handleClick(skip.id)}
                  selected={selected === skip.id}
                  details={{
                    price: skip.price_before_vat,
                    vat: skip.vat,
                    hirePeriod: skip.hire_period_days,
                    allowedOnRoad: skip.allowed_on_road,
                    allowsHeavyWaste: skip.allows_heavy_waste,
                  }}
                  viewStyle={viewStyle}
                />
              ))}
            </div>
          )}
        </section>
        {selected && (
          <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-2 border-t z-20 animate-fade-in">
            <span className="font-bold text-lg">
              Selected:{" "}
              {skips.find((s) => s.id === selected)?.size} yd³ Skip
            </span>
            <button
              className="bg-white text-blue-700 px-8 py-2 rounded-lg font-bold hover:bg-blue-50 hover:text-blue-900 transition border border-blue-200 shadow"
              onClick={() => alert("Continue to booking!")}
            >
              Continue
            </button>
          </div>
        )}
      </main>
      <footer className="w-full text-center text-xs text-gray-400 py-4 mt-8">
        &copy; {new Date().getFullYear()} WeWantWaste. All rights reserved.
      </footer>
    </div>
  );
};

export default SkipSelectionPage;
