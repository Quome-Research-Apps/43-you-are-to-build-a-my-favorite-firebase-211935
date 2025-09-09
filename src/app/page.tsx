"use client";

import { useState, useEffect, useMemo } from 'react';
import { properties as allProperties } from '@/data/properties';
import PropertyCard from '@/components/property-card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function Home() {
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const storedFavorites = localStorage.getItem('favoriteProperties');
      if (storedFavorites) {
        setFavoriteIds(new Set(JSON.parse(storedFavorites)));
      }
    } catch (error) {
      console.error("Failed to parse favorites from localStorage", error);
    }
  }, []);

  const handleToggleFavorite = (id: string) => {
    setFavoriteIds(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem('favoriteProperties', JSON.stringify(Array.from(newFavorites)));
        }
      } catch (error) {
        console.error("Failed to save favorites to localStorage", error);
      }
      
      return newFavorites;
    });
  };

  const filteredProperties = useMemo(() => {
    if (!showFavoritesOnly) {
      return allProperties;
    }
    return allProperties.filter(property => favoriteIds.has(property.id));
  }, [showFavoritesOnly, favoriteIds]);

  if (!isMounted) {
    // Render a skeleton or null on the server to avoid hydration mismatch
    return null;
  }

  return (
    <div className="min-h-screen bg-background font-body">
      <header className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-4xl font-headline font-bold text-primary-foreground bg-primary py-2 px-4 rounded-lg shadow-md">
            Property Pal
          </h1>
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-card border">
            <Label htmlFor="favorites-toggle" className="font-semibold cursor-pointer text-accent-foreground">
              Show Favorites Only
            </Label>
            <Switch
              id="favorites-toggle"
              checked={showFavoritesOnly}
              onCheckedChange={setShowFavoritesOnly}
              aria-label="Toggle showing only favorite properties"
            />
          </div>
        </div>
      </header>

      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProperties.map(property => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  isFavorite={favoriteIds.has(property.id)}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-card rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold text-card-foreground">No Properties Found</h2>
              <p className="mt-2 text-muted-foreground">
                {showFavoritesOnly ? "You haven't favorited any properties yet." : "There are no properties to display."}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
