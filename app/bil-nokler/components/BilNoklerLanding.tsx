"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import EditableText from "@/components/EditableText";
import { carKeyDB, Car } from "@/lib/firebase";

// Skeleton loader component for better perceived performance
const CarCardSkeleton = () => (
  <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 animate-pulse">
    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
    <div className="space-y-3">
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
    </div>
  </div>
);

// Main component
export default function BilNoklerLanding() {
  const [carKeys, setCarKeys] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<
    "newest" | "oldest" | "alphabetical"
  >("newest");
  const [isScrolled, setIsScrolled] = useState(false);

  const router = useRouter();

  // Handle scroll for header effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  // Navigation handling with useCallback for stability
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.view) {
        if (event.state.view === "brand" && event.state.brand) {
          setSelectedBrand(event.state.brand);
          setSearchTerm("");
        } else if (event.state.view === "search" && event.state.searchTerm) {
          setSearchTerm(event.state.searchTerm);
          setSelectedBrand(null);
        } else {
          setSelectedBrand(null);
          setSearchTerm("");
        }
      } else {
        setSelectedBrand(null);
        setSearchTerm("");
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // History management
  useEffect(() => {
    if (selectedBrand) {
      window.history.pushState(
        { view: "brand", brand: selectedBrand },
        "",
        window.location.href
      );
    } else if (searchTerm) {
      window.history.pushState(
        { view: "search", searchTerm: searchTerm },
        "",
        window.location.href
      );
    } else if (window.history.state?.view) {
      window.history.pushState({ view: "main" }, "", window.location.href);
    }
  }, [selectedBrand, searchTerm]);

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
      const searchLower = searchTerm.toLowerCase();
      filtered = carKeys.filter((car) => {
        if (car.brand && car.brand.toLowerCase().includes(searchLower))
          return true;
        if (car.model && car.model.toLowerCase().includes(searchLower))
          return true;

        if (
          car.keyTypes &&
          (Array.isArray(car.keyTypes) ? car.keyTypes.join(" ") : car.keyTypes)
            .toLowerCase()
            .includes(searchLower)
        )
          return true;

        if (
          car.years &&
          Array.isArray(car.years) &&
          car.years.some((year) => year.toString().includes(searchTerm))
        )
          return true;

        return false;
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
  const formatYearRange = useCallback((years: number[]) => {
    if (!years || years.length === 0) return "";
    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);
    return minYear === maxYear ? `${minYear}` : `${minYear}-${maxYear}`;
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
    <div className="min-h-screen bg-gradient-to-b from-[#F0F7FF] to-white dark:from-gray-700 dark:to-gray-600">
      {/* Sticky header with glass morphism effect */}
      <header
        className={`sticky top-0 z-10 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            <EditableText
              id="bilnokler-landing-title"
              defaultText="Bilnøkkel ekspertise"
              className="text-4xl md:text-5xl lg:text-6xl uppercase font-bold text-center text-gray-900 dark:text-gray-100"
              tag="h2"
              page="bil-nokler"
            />
            <div className="relative h-12 md:h-14 w-12 md:w-14">
              <Image
                src="/images/bil_ikon.png"
                fill
                className="object-contain dark:invert"
                alt="Bilnøkkel ikon"
                priority
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="mb-10">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Søk etter bilmerke, modell, år eller nøkkeltype..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full px-6 py-5 pr-14 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 focus:border-blue-400 dark:focus:border-blue-500 transition-all duration-200 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 text-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-5 pointer-events-none">
              <svg
                className="w-6 h-6 text-gray-400 dark:text-gray-500"
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
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 text-center animate-fadeIn">
              Fant {filteredCars.length}{" "}
              {filteredCars.length === 1 ? "bil" : "biler"}
            </p>
          )}
        </div>

        {/* Brand Selection */}
        {!searchTerm && !selectedBrand && (
          <div className="mb-10 animate-fadeIn">
            <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-8 text-center">
              Velg bilmerke:
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {brandsWithCounts.map(({ brand, count }) => (
                <button
                  key={brand}
                  onClick={() => handleBrandSelect(brand)}
                  className="px-5 py-4 border border-gray-200 dark:border-gray-600 rounded-xl hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-medium text-xl transition-all duration-200 transform hover:-translate-y-0.5 shadow-sm hover:shadow-md"
                >
                  <span className="block truncate">{brand}</span>
                  <span className="text-lg text-blue-600 dark:text-blue-400 font-semibold">
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
              className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium mb-6 text-xl transition-colors duration-200 group"
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
              <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                {selectedBrand} modeller{" "}
                <span className="text-blue-600 dark:text-blue-400">
                  ({brandGroups[selectedBrand]?.length})
                </span>
              </h3>
              <div className="flex items-center gap-4">
                <span className="text-xl text-gray-600 dark:text-gray-400">
                  Sorter:
                </span>
                <select
                  value={sortOrder}
                  onChange={(e) =>
                    setSortOrder(
                      e.target.value as "newest" | "oldest" | "alphabetical"
                    )
                  }
                  className="px-5 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 focus:border-blue-400 dark:focus:border-blue-500"
                >
                  <option value="newest">Nyeste modeller</option>
                  <option value="oldest">Eldste modeller</option>
                  <option value="alphabetical">Modell A-Å</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Contact Prompt */}
        {(selectedBrand || searchTerm) && (
          <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl border border-blue-100 dark:border-blue-800 animate-fadeIn">
            <div className="flex flex-col sm:flex-row items-center gap-6 justify-between">
              <p className="text-gray-700 dark:text-gray-300 text-xl text-center sm:text-left">
                Finner du ikke bilen din? Vi kan lage nøkler til flere modeller!
              </p>
              <button
                onClick={() => router.push("/kontakt")}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-500 dark:to-cyan-500 text-white font-semibold text-lg whitespace-nowrap shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 hover:from-blue-700 hover:to-cyan-700 dark:hover:from-blue-600 dark:hover:to-cyan-600"
              >
                Kontakt oss
              </button>
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
                <div className="inline-flex items-center justify-center p-6 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
                  <svg
                    className="w-7 h-7 text-red-500 dark:text-red-400 mr-4"
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
                  <p className="text-red-600 dark:text-red-400 text-xl">
                    Feil: {error}
                  </p>
                </div>
              </div>
            )}

            {!loading && !error && filteredCars.length === 0 && (
              <div className="col-span-full text-center py-12">
                <div className="inline-flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 max-w-md">
                  <svg
                    className="w-14 h-14 text-gray-400 dark:text-gray-500 mb-6"
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
                  <p className="text-gray-600 dark:text-gray-400 text-xl">
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
                  className="p-8 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 cursor-pointer transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg transform hover:-translate-y-1 group"
                >
                  <h4 className="font-bold text-2xl text-gray-900 dark:text-gray-100 mb-5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {car.brand} {car.model}
                  </h4>
                  <div className="space-y-5">
                    <div className="text-gray-700 dark:text-gray-300 text-xl">
                      <span className="font-medium">Årsmodell:</span>{" "}
                      {formatYearRange(car.years)}
                    </div>
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300 text-xl">
                        Nøkkeltype:
                      </span>
                      <span className="block bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-5 py-3 rounded-lg text-lg mt-3 font-medium border border-blue-100 dark:border-blue-800 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
                        {car.keyTypes || "Ikke spesifisert"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Initial state */}
        {!searchTerm && !selectedBrand && !loading && (
          <div className="text-center py-16 animate-fadeIn">
            <div className="inline-block p-8 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm max-w-md">
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
                Bruk søkefeltet eller velg et bilmerke for å se tilgjengelige
                nøkler
              </p>
              <p className="text-lg text-gray-500 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 rounded-lg py-3 px-5 inline-block">
                Vi har {carKeys.length} bilmodeller i vårt system
              </p>
            </div>
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
