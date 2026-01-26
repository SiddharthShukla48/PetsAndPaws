'use client';

import React from "react"

import { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';

export interface FilterState {
  type: 'All' | 'Dog' | 'Cat';
  age: 'All' | '0-2' | '3-5' | '6+';
  location: string;
}

interface FiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  resultCount: number;
}

export default function Filters({ filters, onFiltersChange, resultCount }: FiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleTypeChange = (type: FilterState['type']) => {
    onFiltersChange({ ...filters, type });
  };

  const handleAgeChange = (age: FilterState['age']) => {
    onFiltersChange({ ...filters, age });
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ ...filters, location: e.target.value });
  };

  const handleClearFilters = () => {
    onFiltersChange({ type: 'All', age: 'All', location: '' });
    setIsExpanded(false);
  };

  const isFiltered = filters.type !== 'All' || filters.age !== 'All' || filters.location !== '';

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between px-4 py-3 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors"
        >
          <span className="font-medium text-foreground">Filters</span>
          <ChevronDown
            className={`w-5 h-5 text-muted-foreground transition-transform ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      {/* Filters Panel */}
      <div
        className={`${
          isExpanded ? 'block' : 'hidden'
        } lg:block bg-card border border-border rounded-lg p-5 space-y-5 mb-6 lg:mb-0 lg:sticky lg:top-20`}
      >
        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">Pet Type</label>
          <div className="space-y-2">
            {(['All', 'Dog', 'Cat'] as const).map((type) => (
              <label key={type} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  checked={filters.type === type}
                  onChange={() => handleTypeChange(type)}
                  className="w-4 h-4 text-primary"
                />
                <span className="text-sm text-foreground">{type}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">Age Range</label>
          <div className="space-y-2">
            {(['All', '0-2', '3-5', '6+'] as const).map((age) => (
              <label key={age} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="age"
                  checked={filters.age === age}
                  onChange={() => handleAgeChange(age)}
                  className="w-4 h-4 text-primary"
                />
                <span className="text-sm text-foreground">
                  {age === 'All' ? 'All ages' : `${age} years`}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">Location</label>
          <input
            type="text"
            placeholder="Search location..."
            value={filters.location}
            onChange={handleLocationChange}
            className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Results Count */}
        <div className="pt-3 border-t border-border">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{resultCount}</span> results found
          </p>
        </div>

        {/* Clear Filters Button */}
        {isFiltered && (
          <button
            onClick={handleClearFilters}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-muted text-foreground hover:bg-muted/80 transition-colors rounded-md text-sm font-medium"
          >
            <X className="w-4 h-4" />
            Clear Filters
          </button>
        )}
      </div>
    </>
  );
}
