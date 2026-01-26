export interface Pet {
  id: string;
  name: string;
  type: 'Dog' | 'Cat';
  age: number;
  location: string;
  imageUrl: string;
  vaccinated: boolean;
  neutered: boolean;
  medicalNotes?: string;
  addedAt?: number;
}

export const mockPets: Pet[] = [
  {
    id: '1',
    name: 'Luna',
    type: 'Dog',
    age: 2,
    location: 'San Francisco, CA',
    imageUrl: 'https://images.unsplash.com/photo-1633722715463-d30628519b65?w=500&h=500&fit=crop',
    vaccinated: true,
    neutered: true,
    medicalNotes: 'Friendly and energetic, loves playing fetch'
  },
  {
    id: '2',
    name: 'Whiskers',
    type: 'Cat',
    age: 1,
    location: 'New York, NY',
    imageUrl: 'https://images.unsplash.com/photo-1574158622147-08ea047b619b?w=500&h=500&fit=crop',
    vaccinated: true,
    neutered: false,
    medicalNotes: 'Playful kitten, needs indoor home'
  },
  {
    id: '3',
    name: 'Max',
    type: 'Dog',
    age: 5,
    location: 'Los Angeles, CA',
    imageUrl: 'https://images.unsplash.com/photo-1611003228941-98852ba62227?w=500&h=500&fit=crop',
    vaccinated: true,
    neutered: true,
    medicalNotes: 'Calm and gentle, good with kids'
  },
  {
    id: '4',
    name: 'Bella',
    type: 'Cat',
    age: 3,
    location: 'Chicago, IL',
    imageUrl: 'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=500&h=500&fit=crop',
    vaccinated: true,
    neutered: true,
    medicalNotes: 'Shy but loving, prefers quiet homes'
  },
  {
    id: '5',
    name: 'Charlie',
    type: 'Dog',
    age: 1,
    location: 'Austin, TX',
    imageUrl: 'https://images.unsplash.com/photo-1612536315141-dd83a6202ff8?w=500&h=500&fit=crop',
    vaccinated: false,
    neutered: false,
    medicalNotes: 'Puppy, high energy, needs training'
  },
  {
    id: '6',
    name: 'Mittens',
    type: 'Cat',
    age: 2,
    location: 'Denver, CO',
    imageUrl: 'https://images.unsplash.com/photo-1546527868-ccdfedd5da4d?w=500&h=500&fit=crop',
    vaccinated: true,
    neutered: true,
    medicalNotes: 'Affectionate and vocal, loves cuddles'
  },
  {
    id: '7',
    name: 'Rocky',
    type: 'Dog',
    age: 4,
    location: 'Portland, OR',
    imageUrl: 'https://images.unsplash.com/photo-1597855212624-ac0338b5fe9b?w=500&h=500&fit=crop',
    vaccinated: true,
    neutered: true,
    medicalNotes: 'Loyal and protective, good guard dog'
  },
  {
    id: '8',
    name: 'Shadow',
    type: 'Cat',
    age: 6,
    location: 'Seattle, WA',
    imageUrl: 'https://images.unsplash.com/photo-1519148518688-ec6e8be45b72?w=500&h=500&fit=crop',
    vaccinated: true,
    neutered: true,
    medicalNotes: 'Senior cat, gentle and low-energy'
  }
];
