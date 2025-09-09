export interface Property {
  id: string;
  image: string;
  price: number;
  address: string;
  beds: number;
  baths: number;
  sqft: number;
}

export const properties: Property[] = [
  {
    id: '1',
    image: 'https://picsum.photos/600/400',
    price: 350000,
    address: '123 Ocean View Drive, Malibu',
    beds: 3,
    baths: 2,
    sqft: 1800,
  },
  {
    id: '2',
    image: 'https://picsum.photos/600/401',
    price: 450000,
    address: '456 Skyline Ave, Beverly Hills',
    beds: 4,
    baths: 3,
    sqft: 2500,
  },
  {
    id: '3',
    image: 'https://picsum.photos/601/400',
    price: 280000,
    address: '789 Pine Street, Pasadena',
    beds: 2,
    baths: 2,
    sqft: 1500,
  },
  {
    id: '4',
    image: 'https://picsum.photos/600/399',
    price: 620000,
    address: '101 Maple Lane, Santa Monica',
    beds: 5,
    baths: 4,
    sqft: 3200,
  },
  {
    id: '5',
    image: 'https://picsum.photos/599/400',
    price: 190000,
    address: '212 Oak Court, Downtown LA',
    beds: 1,
    baths: 1,
    sqft: 900,
  },
  {
    id: '6',
    image: 'https://picsum.photos/601/401',
    price: 750000,
    address: '333 Palm Grove, Venice Beach',
    beds: 4,
    baths: 3.5,
    sqft: 2800,
  },
  {
    id: '7',
    image: 'https://picsum.photos/602/400',
    price: 480000,
    address: '555 Sunset Blvd, Hollywood',
    beds: 3,
    baths: 2.5,
    sqft: 2200,
  },
  {
    id: '8',
    image: 'https://picsum.photos/600/402',
    price: 310000,
    address: '888 Hillcrest Rd, Burbank',
    beds: 2,
    baths: 1,
    sqft: 1300,
  },
];
