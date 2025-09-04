"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import EditableText from "@/components/EditableText";
import { carKeyDB, Car } from "@/lib/firebase";

// Skeleton loader component for better perceived performance
const CarCardSkeleton = () => (
  <div className="p-6 border border-gray-200 rounded-xl bg-white animate-pulse">
    <div className="h-8 bg-gray-200 rounded mb-4"></div>
    <div className="space-y-3">
      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      <div className="h-10 bg-gray-200 rounded w-full"></div>
    </div>
  </div>
);

// Main component
export default function CarKeySearch() {
  const [carKeys, setCarKeys] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<
    "newest" | "oldest" | "alphabetical"
  >("newest");

  const router = useRouter();

  // Fetch data with optimized loading
  useEffect(() => {
    const fetchCarKeys = async () => {
      try {
        // Small timeout to ensure smooth animation even if data loads quickly
        await new Promise((resolve) => setTimeout(resolve, 300));
        const cars = await carKeyDB.getAllCars();
        setCarKeys(cars);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCarKeys();
  }, []);

  // Memoized data processing for performance
  const brandGroups = useMemo(() => {
    const groups: Record<string, Car[]> = {};
    carKeys.forEach((car) => {
      if (!groups[car.brand]) {
        groups[car.brand] = [];
      }
      groups[car.brand].push(car);
    });
    return groups;
  }, [carKeys]);

  const brandsWithCounts = useMemo(() => {
    return Object.entries(brandGroups)
      .map(([brand, cars]) => ({
        brand,
        count: cars.length,
      }))
      .sort((a, b) => a.brand.localeCompare(b.brand));
  }, [brandGroups]);

  const filteredCars = useMemo(() => {
    let filtered = carKeys;

    if (searchTerm.trim()) {
      const searchTerms = searchTerm.toLowerCase().trim().split(/\s+/);
      filtered = carKeys.filter((car) => {
        // Check if ALL search terms are found in the car data
        return searchTerms.every(term => {
          // Check brand
          if (car.brand && car.brand.toLowerCase().includes(term)) return true;
          
          // Check model
          if (car.model && car.model.toLowerCase().includes(term)) return true;
          
          // Check key types
          if (car.keyTypes) {
            const keyTypesStr = Array.isArray(car.keyTypes) 
              ? car.keyTypes.join(" ") 
              : car.keyTypes;
            if (keyTypesStr.toLowerCase().includes(term)) return true;
          }
          
          // Check years
          if (car.years && Array.isArray(car.years)) {
            if (car.years.some(year => year.toString().includes(term))) return true;
          }
          
          return false;
        });
      });
    } else if (selectedBrand) {
      filtered = brandGroups[selectedBrand] || [];
    } else {
      return [];
    }

    return filtered.sort((a, b) => {
      if (sortOrder === "newest") {
        const aMaxYear = Math.max(...a.years);
        const bMaxYear = Math.max(...b.years);
        return bMaxYear - aMaxYear;
      } else if (sortOrder === "oldest") {
        const aMinYear = Math.min(...a.years);
        const bMinYear = Math.min(...b.years);
        return aMinYear - bMinYear;
      } else {
        return a.model.localeCompare(b.model);
      }
    });
  }, [carKeys, searchTerm, selectedBrand, brandGroups, sortOrder]);

  // Event handlers with useCallback
  const formatYearRange = useCallback((years: any[]) => {
    if (!years || years.length === 0) return "";
    
    // Check if "Latest" is present
    const hasLatest = years.some(year => year === "Latest" || year === "latest");
    
    // Filter out non-numeric values and convert to numbers
    const numericYears = years
      .filter(year => typeof year === 'number' && !isNaN(year))
      .map(year => Number(year));
    
    if (numericYears.length === 0) return hasLatest ? "Nyeste" : "";
    
    const minYear = Math.min(...numericYears);
    
    if (hasLatest) {
      return `${minYear}-Nyeste`;
    } else {
      const maxYear = Math.max(...numericYears);
      return minYear === maxYear ? `${minYear}` : `${minYear}-${maxYear}`;
    }
  }, []);

  const handleBrandSelect = useCallback((brand: string) => {
    setSelectedBrand(brand);
    setSearchTerm("");
  }, []);

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
    setSelectedBrand(null);
  }, []);

  const handleGoBack = useCallback(() => {
    setSelectedBrand(null);
    setSearchTerm("");
  }, []);

  return (
    <div className="min-h-screen">

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="mb-10">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Søk etter bilmerke, modell, år eller nøkkeltype..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full px-6 py-5 pr-14 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-custom-blue transition-all duration-200 text-gray-800 placeholder-gray-400 text-lg bg-white"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-5 pointer-events-none">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {searchTerm && (
            <p className="mt-4 text-xl text-custom-gray text-center animate-fadeIn">
              Fant {filteredCars.length}{" "}
              {filteredCars.length === 1 ? "bil" : "biler"}
            </p>
          )}
        </div>

        {/* Brand Selection */}
        {!searchTerm && !selectedBrand && (
          <div className="mb-10 animate-fadeIn">
            <h3 className="text-2xl font-semibold text-gray-700 mb-8 text-center">
              Velg bilmerke:
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {brandsWithCounts.map(({ brand, count }) => (
                <button
                  key={brand}
                  onClick={() => handleBrandSelect(brand)}
                  className="px-5 py-4 border border-gray-200 rounded-xl hover:border-custom-blue hover:bg-blue-50 bg-white text-gray-800 font-medium text-xl transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  <span className="block truncate">{brand}</span>
                  <span className="text-lg text-custom-blue font-semibold">
                    ({count})
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Selected Brand Header */}
        {selectedBrand && !searchTerm && (
          <div className="mb-8 animate-fadeIn">
            <button
              onClick={handleGoBack}
              className="flex items-center text-custom-blue hover:text-custom-blue font-medium mb-6 text-xl transition-colors duration-200 group"
            >
              <svg
                className="w-6 h-6 mr-3 transition-transform duration-200 group-hover:-translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Tilbake til bilmerker
            </button>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <h3 className="text-3xl font-bold text-gray-800">
                {selectedBrand} modeller{" "}
                <span className="text-custom-blue">
                  ({brandGroups[selectedBrand]?.length})
                </span>
              </h3>
              <div className="flex items-center gap-4">
                <span className="text-xl text-custom-gray">
                  Sorter:
                </span>
                <select
                  value={sortOrder}
                  onChange={(e) =>
                    setSortOrder(
                      e.target.value as "newest" | "oldest" | "alphabetical"
                    )
                  }
                  className="px-5 py-3 border border-gray-300 rounded-xl text-lg bg-white text-gray-800 focus:ring-2 focus:ring-blue-100 focus:border-custom-blue"
                >
                  <option value="newest">Nyeste modeller</option>
                  <option value="oldest">Eldste modeller</option>
                  <option value="alphabetical">Modell A-Å</option>
                </select>
              </div>
            </div>
          </div>
        )}

        

        {/* Results Grid */}
        {(searchTerm || selectedBrand) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {loading && (
              <>
                {Array.from({ length: 8 }).map((_, i) => (
                  <CarCardSkeleton key={i} />
                ))}
              </>
            )}

            {error && (
              <div className="col-span-full text-center py-12">
                <div className="inline-flex items-center justify-center p-6 bg-red-50 rounded-xl border border-red-200">
                  <svg
                    className="w-7 h-7 text-red-500 mr-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-red-600 text-xl">
                    Feil: {error}
                  </p>
                </div>
              </div>
            )}

            {!loading && !error && filteredCars.length === 0 && (
              <div className="col-span-full text-center py-12">
                <div className="inline-flex flex-col items-center justify-center p-8 bg-white rounded-2xl border border-gray-200 max-w-md">
                  <svg
                    className="w-14 h-14 text-custom-gray mb-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-custom-gray text-xl">
                    {searchTerm
                      ? `Ingen biler funnet for "${searchTerm}"`
                      : "Ingen bilnøkler tilgjengelig"}
                  </p>
                </div>
              </div>
            )}

            {!loading &&
              !error &&
              filteredCars.map((car) => (
                <div
                  key={car.id}
                  className="p-8 border border-gray-200 rounded-xl bg-white cursor-pointer transition-all duration-300 hover:border-blue-300 transform hover:-translate-y-1 group"
                >
                  <h4 className="font-bold text-2xl text-gray-900 mb-5 group-hover:text-custom-blue transition-colors">
                    {car.brand} {car.model}
                  </h4>
                  <div className="space-y-5">
                    <div className="text-gray-700 text-xl">
                      <span className="font-medium">Årsmodell:</span>{" "}
                      {formatYearRange(car.years)}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}

       
      </main>

      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
