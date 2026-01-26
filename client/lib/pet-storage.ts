import { Pet } from './mock-pets';

const STORAGE_KEY = 'pups-paws-added-pets';

export function getAddedPets(): Pet[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function addPet(pet: Pet): void {
  if (typeof window === 'undefined') return;
  try {
    const pets = getAddedPets();
    const newPet = {
      ...pet,
      addedAt: Date.now()
    };
    pets.push(newPet);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pets));
  } catch (error) {
    console.error('Failed to add pet:', error);
  }
}

export function clearAddedPets(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear pets:', error);
  }
}
