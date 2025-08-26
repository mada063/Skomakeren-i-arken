"use client";

import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import EditableText from "@/components/EditableText";
import { carKeyDB, Car } from "@/lib/firebase";

// Main component with export at top as requested
export default function BilNoklerLanding() {
  const [carKeys, setCarKeys] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<
    "newest" | "oldest" | "alphabetical"
  >("newest");

  // Initialize router for navigation
  const router = useRouter();

  useEffect(() => {
    const fetchCarKeys = async () => {
      try {
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

  // Handle browser back/forward navigation
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

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // Update browser history when state changes
  useEffect(() => {
    if (selectedBrand) {
      // Push state for brand view
      window.history.pushState(
        { view: "brand", brand: selectedBrand },
        "",
        window.location.href
      );
    } else if (searchTerm) {
      // Push state for search view
      window.history.pushState(
        { view: "search", searchTerm: searchTerm },
        "",
        window.location.href
      );
    } else {
      // Push state for main view
      if (window.history.state?.view) {
        window.history.pushState({ view: "main" }, "", window.location.href);
      }
    }
  }, [selectedBrand, searchTerm]);

  // Group cars by brand and count them
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

  // Get sorted list of brands with counts
  const brandsWithCounts = useMemo(() => {
    return Object.entries(brandGroups)
      .map(([brand, cars]) => ({
        brand,
        count: cars.length,
      }))
      .sort((a, b) => a.brand.localeCompare(b.brand)); // Alphabetical order
  }, [brandGroups]);

  // Filter cars based on search or brand selection
  const filteredCars = useMemo(() => {
    let filtered = carKeys;

    // If searching, filter all cars
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = carKeys.filter((car) => {
        // Check brand and model with null safety
        if (car.brand && car.brand.toLowerCase().includes(searchLower))
          return true;
        if (car.model && car.model.toLowerCase().includes(searchLower))
          return true;

        // Check keyTypes (handle both string and string[] types) with null safety
        if (
          car.keyTypes &&
          (Array.isArray(car.keyTypes) ? car.keyTypes.join(" ") : car.keyTypes)
            .toLowerCase()
            .includes(searchLower)
        )
          return true;

        // Check years with null safety
        if (
          car.years &&
          Array.isArray(car.years) &&
          car.years.some((year) => year.toString().includes(searchTerm))
        )
          return true;

        return false;
      });
    }
    // If brand selected, show only that brand
    else if (selectedBrand) {
      filtered = brandGroups[selectedBrand] || [];
    }
    // Otherwise show nothing (initial state)
    else {
      return [];
    }

    // Sort the filtered results
    return filtered.sort((a, b) => {
      if (sortOrder === "newest") {
        // Sort by newest manufacturing year
        const aMaxYear = Math.max(...a.years);
        const bMaxYear = Math.max(...b.years);
        return bMaxYear - aMaxYear;
      } else if (sortOrder === "oldest") {
        // Sort by oldest manufacturing year
        const aMinYear = Math.min(...a.years);
        const bMinYear = Math.min(...b.years);
        return aMinYear - bMinYear;
      } else {
        // Alphabetical by model name
        return a.model.localeCompare(b.model);
      }
    });
  }, [carKeys, searchTerm, selectedBrand, brandGroups, sortOrder]);

  // Format year range for display
  const formatYearRange = (years: number[]) => {
    if (!years || years.length === 0) return "";
    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);
    return minYear === maxYear ? `${minYear}` : `${minYear}-${maxYear}`;
  };

  // Handle brand selection with history management
  const handleBrandSelect = (brand: string) => {
    setSelectedBrand(brand);
    setSearchTerm("");
  };

  // Handle search with history management
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setSelectedBrand(null);
  };

  // Handle going back to main view
  const handleGoBack = () => {
    setSelectedBrand(null);
    setSearchTerm("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-col justify-center min-h-screen">
        <div className="mb-16">
          {/* Title section - positioned below search on mobile */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-8 md:order-first">
            <EditableText
              id="bilnokler-landing-title"
              defaultText="Bilnøkkel ekspertise"
              className="text-4xl md:text-5xl lg:text-6xl uppercase font-semibold text-center"
              tag="h2"
              page="bil-nokler"
            />
            <Image
              src="/images/bil_ikon.png"
              height={50}
              width={50}
              className="h-10 md:h-12 w-auto"
              alt="Bilnøkkel ikon"
            />
          </div>

          {/* Search Section - Fixed clickable area */}
          <div className="mb-8 md:order-first">
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Søk etter bilmerke, modell, år eller nøkkeltype..."
                value={searchTerm}
                onChange={(e) => {
                  handleSearch(e.target.value);
                }}
                className="w-full px-4 py-4 pr-12 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-custom-blue transition-colors duration-200 text-gray-800 placeholder-gray-500 text-lg"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
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

            {/* Show search results count */}
            {searchTerm && (
              <p className="mt-3 text-lg text-gray-600 text-center">
                Fant {filteredCars.length}{" "}
                {filteredCars.length === 1 ? "bil" : "biler"}
              </p>
            )}
          </div>

          {/* Brand Selection or Back Button */}
          {!searchTerm && !selectedBrand && (
            <div className="mb-8">
              <h3 className="text-xl font-medium text-gray-700 mb-6 text-center">
                Velg bilmerke:
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {brandsWithCounts.map(({ brand, count }) => (
                  <button
                    key={brand}
                    onClick={() => handleBrandSelect(brand)}
                    className="px-4 py-4 border-2 border-gray-300 rounded-xl hover:border-custom-blue bg-white text-gray-800 font-medium text-lg"
                  >
                    {brand} ({count})
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Back button and sorting when brand is selected */}
          {selectedBrand && !searchTerm && (
            <div className="mb-6">
              <button
                onClick={handleGoBack}
                className="flex items-center text-custom-blue hover:text-blue-700 font-medium mb-4 text-lg"
              >
                ← Tilbake til bilmerker
              </button>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h3 className="text-2xl font-semibold text-gray-800">
                  {selectedBrand} modeller ({brandGroups[selectedBrand]?.length}{" "}
                  {brandGroups[selectedBrand]?.length === 1 ? "bil" : "biler"})
                </h3>
                <div className="flex items-center gap-3">
                  <span className="text-lg text-gray-600">Sorter:</span>
                  <select
                    value={sortOrder}
                    onChange={(e) =>
                      setSortOrder(
                        e.target.value as "newest" | "oldest" | "alphabetical"
                      )
                    }
                    className="px-4 py-2 border border-gray-300 rounded-xl text-lg"
                  >
                    <option value="newest">Nyeste modeller</option>
                    <option value="oldest">Eldste modeller</option>
                    <option value="alphabetical">Modell A-Å</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Info text with contact button */}
          {(selectedBrand || searchTerm) && (
            <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-center sm:justify-start">
              <p className="text-gray-600 text-lg text-center sm:text-left">
                Finner du ikke bilen din? Vi kan lage nøkler til flere modeller!
              </p>
              <button
                onClick={() => router.push("/kontakt")}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium text-lg whitespace-nowrap shrink-0"
              >
                Kontakt oss
              </button>
            </div>
          )}

          {/* Car Keys Grid - Only shown when searching or brand selected */}
          {(searchTerm || selectedBrand) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {loading && (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-600 text-xl">Laster bilnøkler...</p>
                </div>
              )}

              {error && (
                <div className="col-span-full text-center py-12">
                  <p className="text-red-500 text-xl">Feil: {error}</p>
                </div>
              )}

              {!loading && !error && filteredCars.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-600 text-xl">
                    {searchTerm
                      ? `Ingen biler funnet for "${searchTerm}"`
                      : "Ingen bilnøkler tilgjengelig"}
                  </p>
                </div>
              )}

              {!loading &&
                !error &&
                filteredCars.map((car) => (
                  <div
                    key={car.id}
                    className="p-6 border-2 border-gray-200 rounded-2xl bg-gray-50 cursor-pointer transition-all hover:border-custom-blue"
                  >
                    <h4 className="font-semibold text-2xl text-gray-900 mb-3">
                      {car.brand} {car.model}
                    </h4>
                    <div className="space-y-3">
                      {/* Display year range and key type in compact format */}
                      <div className="text-xl text-gray-700">
                        <span className="font-medium">Årsmodell:</span>{" "}
                        {formatYearRange(car.years)}
                      </div>
                      <div className="text-xl text-gray-700">
                        <span className="font-medium">Nøkkeltype:</span>{" "}
                        <span className="inline-block bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-lg mt-1">
                          {car.keyTypes || "Ikke spesifisert"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* Initial state message when nothing selected */}
          {!searchTerm && !selectedBrand && !loading && (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600 mb-3">
                Bruk søkefeltet eller velg et bilmerke for å se tilgjengelige
                nøkler
              </p>
              <p className="text-lg text-gray-500">
                Vi har {carKeys.length} bilmodeller i vårt system
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
