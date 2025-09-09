"use client";

import type { FC } from 'react';
import Image from 'next/image';
import { BedDouble, Bath, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { Property } from '@/data/properties';

interface PropertyCardProps {
  property: Property;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

const PropertyCard: FC<PropertyCardProps> = ({ property, isFavorite, onToggleFavorite }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="flex flex-col overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl bg-card">
      <CardHeader className="p-0 relative">
        <Image
          src={property.image}
          alt={`View of ${property.address}`}
          width={600}
          height={400}
          className="w-full h-48 object-cover"
          data-ai-hint="house exterior"
        />
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-2 right-2 rounded-full bg-white/80 hover:bg-white text-destructive"
          onClick={() => onToggleFavorite(property.id)}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart
            className={cn(
              'h-6 w-6 transition-all duration-300 transform',
              isFavorite ? 'fill-destructive' : 'fill-none'
            )}
            strokeWidth={isFavorite ? 2 : 2}
            stroke={isFavorite ? 'hsl(var(--destructive))' : 'currentColor'}
          />
        </Button>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col">
        <h3 className="text-2xl font-bold text-primary">{formatPrice(property.price)}</h3>
        <p className="text-lg text-card-foreground/80 mt-1 flex-grow">{property.address}</p>
      </CardContent>
      <CardFooter className="p-4 bg-muted/50 flex justify-start space-x-6 text-muted-foreground">
        <div className="flex items-center space-x-2">
          <BedDouble className="h-5 w-5" />
          <span>{property.beds} beds</span>
        </div>
        <div className="flex items-center space-x-2">
          <Bath className="h-5 w-5" />
          <span>{property.baths} baths</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
