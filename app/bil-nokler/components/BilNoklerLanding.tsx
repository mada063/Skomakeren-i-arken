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
        // Check brand and model
        if (car.brand.toLowerCase().includes(searchLower)) return true;
        if (car.model.toLowerCase().includes(searchLower)) return true;

        // Check keyTypes (now it's a string, not array)
        if (
          car.keyTypes &&
          Array.isArray(car.keyTypes) &&
          car.keyTypes.join(" ").toLowerCase().includes(searchLower)
        )
          return true;

        // Check years
        if (
          car.years &&
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

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-col justify-center min-h-screen">
        <div className="mb-16">
          <div className="flex flex-row gap-6 items-center mb-8">
            <EditableText
              id="bilnokler-landing-title"
              defaultText="Bilnøkkel ekspertise"
              className="text-5xl md:text-7xl uppercase font-semibold"
              tag="h2"
              page="bil-nokler"
            />
            <Image
              src="/images/bil_ikon.png"
              height={50}
              width={50}
              className="h-12 w-auto"
              alt="Bilnøkkel ikon"
            />
          </div>

          {/* Search Section */}
          <div className="mb-8">
            <div className="relative max-w-md">
              <input
                type="text"
                placeholder="Søk etter bilmerke, modell, år eller nøkkeltype..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setSelectedBrand(null); // Clear brand selection when searching
                }}
                className="w-full px-4 py-3 pr-10 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-custom-blue transition-colors duration-200 text-gray-800 placeholder-gray-500"
              />
              <svg
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
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

            {/* Show search results count */}
            {searchTerm && (
              <p className="mt-2 text-sm text-gray-600">
                Fant {filteredCars.length}{" "}
                {filteredCars.length === 1 ? "bil" : "biler"}
              </p>
            )}
          </div>

          {/* Brand Selection or Back Button */}
          {!searchTerm && !selectedBrand && (
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-700 mb-4">
                Velg bilmerke:
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {brandsWithCounts.map(({ brand, count }) => (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(brand)}
                    className="px-4 py-3 border-2 border-gray-300 rounded-lg hover:border-custom-blue hover:shadow-md transition-all duration-200 bg-white text-gray-800 font-medium"
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
                onClick={() => setSelectedBrand(null)}
                className="flex items-center text-custom-blue hover:text-blue-700 font-medium mb-4"
              >
                ← Tilbake
              </button>
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">
                  {selectedBrand} modeller ({brandGroups[selectedBrand]?.length}{" "}
                  biler)
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Sorter:</span>
                  <select
                    value={sortOrder}
                    onChange={(e) =>
                      setSortOrder(
                        e.target.value as "newest" | "oldest" | "alphabetical"
                      )
                    }
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm"
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
            <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <p className="text-gray-600">
                Finner du ikke bilen din? Vi kan lage nøkler til flere modeller!
              </p>
              <button
                onClick={() => router.push("/kontakt")}
                className="px-6 py-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium transition-all duration-300 hover:from-orange-600 hover:to-amber-600 hover:shadow-lg hover:scale-105 whitespace-nowrap"
              >
                Kontakt oss
              </button>
            </div>
          )}

          {/* Car Keys Grid - Only shown when searching or brand selected */}
          {(searchTerm || selectedBrand) && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {loading && (
                <div className="col-span-full text-center py-8">
                  <p className="text-gray-600">Laster bilnøkler...</p>
                </div>
              )}

              {error && (
                <div className="col-span-full text-center py-8">
                  <p className="text-red-500">Feil: {error}</p>
                </div>
              )}

              {!loading && !error && filteredCars.length === 0 && (
                <div className="col-span-full text-center py-8">
                  <p className="text-gray-600">
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
                    className="p-5 border-2 border-gray-200 rounded-lg hover:border-custom-blue hover:shadow-lg transition-all duration-300 bg-white cursor-pointer"
                  >
                    <h4 className="font-semibold text-xl text-gray-900">
                      {car.brand} {car.model}
                    </h4>
                    <div className="mt-3 space-y-2">
                      {/* Display year range and key type in compact format */}
                      <div className="text-sm text-gray-700">
                        <span className="font-medium">Årsmodell:</span>{" "}
                        {formatYearRange(car.years)}
                      </div>
                      <div className="text-sm text-gray-700">
                        <span className="font-medium">Nøkkeltype:</span>{" "}
                        {car.keyTypes || "Ikke spesifisert"}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* Initial state message when nothing selected */}
          {!searchTerm && !selectedBrand && !loading && (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600 mb-2">
                Bruk søkefeltet eller velg et bilmerke for å se tilgjengelige
                nøkler
              </p>
              <p className="text-sm text-gray-500">
                Vi har {carKeys.length} bilmodeller i vårt system
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
