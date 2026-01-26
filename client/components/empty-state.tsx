'use client';

import { AlertCircle } from 'lucide-react';

interface EmptyStateProps {
  onClearFilters: () => void;
}

export default function EmptyState({ onClearFilters }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
        <AlertCircle className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">No pets found</h3>
      <p className="text-muted-foreground mb-6 max-w-sm">
        We couldn't find any pets matching your filters. Try adjusting your criteria or clearing all filters.
      </p>
      <button
        onClick={onClearFilters}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
      >
        Clear Filters
      </button>
    </div>
  );
}
