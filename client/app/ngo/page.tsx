'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/navbar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Badge from '@/components/badge';
import { ArrowRight, Plus, MapPin, Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import Image from 'next/image';

// Dummy data for NGO's pet listings
const dummyPets = [
  {
    id: '1',
    name: 'Max',
    type: 'Dog',
    age: 3,
    location: 'Mumbai',
    image: '/placeholder.svg',
    vaccinated: true,
    status: 'Available',
  },
  {
    id: '2',
    name: 'Luna',
    type: 'Cat',
    age: 2,
    location: 'Mumbai',
    image: '/placeholder.svg',
    vaccinated: true,
    status: 'Available',
  },
  {
    id: '3',
    name: 'Charlie',
    type: 'Dog',
    age: 5,
    location: 'Mumbai',
    image: '/placeholder.svg',
    vaccinated: false,
    status: 'Pending',
  },
  {
    id: '4',
    name: 'Whiskers',
    type: 'Cat',
    age: 1,
    location: 'Mumbai',
    image: '/placeholder.svg',
    vaccinated: true,
    status: 'Available',
  },
];

// Dummy data for adoption requests
const dummyAdoptionRequests = [
  {
    id: '1',
    petName: 'Max',
    adopterName: 'John Doe',
    status: 'Pending',
    requestDate: '2024-02-08',
  },
  {
    id: '2',
    petName: 'Luna',
    adopterName: 'Jane Smith',
    status: 'Approved',
    requestDate: '2024-02-07',
  },
  {
    id: '3',
    petName: 'Charlie',
    adopterName: 'Mike Johnson',
    status: 'Pending',
    requestDate: '2024-02-06',
  },
];

interface PetStatus {
  Available: string;
  Pending: string;
  Adopted: string;
}

const statusColors: PetStatus = {
  Available: 'bg-green-100 text-green-800',
  Pending: 'bg-yellow-100 text-yellow-800',
  Adopted: 'bg-blue-100 text-blue-800',
};

const statusBadgeVariants: { [key: string]: 'type' | 'health' } = {
  Available: 'type',
  Pending: 'health',
  Adopted: 'type',
};

export default function NgoPage() {
  const [pets] = useState(dummyPets);
  const [adoptionRequests] = useState(dummyAdoptionRequests);

  const totalPets = pets.length;
  const adoptionRequestsCount = adoptionRequests.length;
  const approvedAdoptions = adoptionRequests.filter((r) => r.status === 'Approved').length;
  const pendingRequests = adoptionRequests.filter((r) => r.status === 'Pending').length;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 to-accent/5 border-b border-border py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
                NGO Dashboard
              </h1>
              <p className="text-lg text-muted-foreground mb-8 text-pretty">
                Manage your pet listings, track adoption requests, and help animals find their forever homes.
              </p>
              <Link href="/ngo/add-pet">
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add New Pet
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Summary Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Total Pets Card */}
            <Card className="flex flex-col items-center justify-center text-center p-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <p className="text-3xl font-bold text-foreground mb-1">{totalPets}</p>
              <p className="text-muted-foreground text-sm">Total Pets Listed</p>
            </Card>

            {/* Adoption Requests Card */}
            <Card className="flex flex-col items-center justify-center text-center p-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 mb-4">
                <AlertCircle className="w-6 h-6 text-accent" />
              </div>
              <p className="text-3xl font-bold text-foreground mb-1">{adoptionRequestsCount}</p>
              <p className="text-muted-foreground text-sm">Adoption Requests</p>
            </Card>

            {/* Approved Adoptions Card */}
            <Card className="flex flex-col items-center justify-center text-center p-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-100 mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-foreground mb-1">{approvedAdoptions}</p>
              <p className="text-muted-foreground text-sm">Approved Adoptions</p>
            </Card>

            {/* Pending Requests Card */}
            <Card className="flex flex-col items-center justify-center text-center p-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-yellow-100 mb-4">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <p className="text-3xl font-bold text-foreground mb-1">{pendingRequests}</p>
              <p className="text-muted-foreground text-sm">Pending Requests</p>
            </Card>
          </div>
        </section>

        {/* My Pet Listings Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-border">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">My Pet Listings</h2>
            <p className="text-muted-foreground">
              Manage your current pet listings and their adoption status.
            </p>
          </div>

          {pets.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {pets.map((pet) => (
                <div
                  key={pet.id}
                  className="bg-card rounded-lg overflow-hidden border border-border shadow-sm hover:shadow-md transition-all duration-200 h-full flex flex-col"
                >
                  {/* Image */}
                  <div className="relative w-full h-48 bg-muted overflow-hidden">
                    <Image
                      src={pet.image}
                      alt={pet.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col gap-3 flex-1">
                    {/* Name & Badges */}
                    <div>
                      <h3 className="font-bold text-lg text-foreground mb-2">{pet.name}</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="type">{pet.type}</Badge>
                        <Badge variant="health">
                          {pet.vaccinated ? 'Vaccinated' : 'Needs Care'}
                        </Badge>
                      </div>
                    </div>

                    {/* Meta Info */}
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{pet.age} {pet.age === 1 ? 'year' : 'years'} old</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{pet.location}</span>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="pt-2">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          statusColors[pet.status as keyof typeof statusColors]
                        }`}
                      >
                        {pet.status}
                      </span>
                    </div>

                    {/* Action Button */}
                    <div className="pt-2 mt-auto">
                      <button className="w-full bg-primary text-primary-foreground py-2 rounded-md font-medium text-sm hover:bg-primary/90 transition-colors">
                        Manage
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center border border-dashed border-border rounded-lg">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <AlertCircle className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No pets listed yet</h3>
              <p className="text-muted-foreground mb-6 max-w-sm">
                Start building your pet listings. Click the button below to add your first pet.
              </p>
              <Link href="/ngo/add-pet">
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Your First Pet
                </Button>
              </Link>
            </div>
          )}
        </section>

        {/* Adoption Requests Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-border">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">Adoption Requests</h2>
            <p className="text-muted-foreground">
              Review and manage adoption requests from interested adopters.
            </p>
          </div>

          {adoptionRequests.length > 0 ? (
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                        Pet Name
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                        Adopter Name
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                        Request Date
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {adoptionRequests.map((request, index) => (
                      <tr
                        key={request.id}
                        className={`border-b border-border hover:bg-muted/30 transition-colors ${
                          index === adoptionRequests.length - 1 ? 'border-b-0' : ''
                        }`}
                      >
                        <td className="px-6 py-4 text-sm font-medium text-foreground">
                          {request.petName}
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {request.adopterName}
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {new Date(request.requestDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                              request.status === 'Approved'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {request.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex gap-2">
                            {request.status !== 'Approved' && (
                              <button className="px-3 py-1 bg-green-600 text-white text-xs rounded-md hover:bg-green-700 transition-colors font-medium">
                                Approve
                              </button>
                            )}
                            <button className="px-3 py-1 bg-red-600 text-white text-xs rounded-md hover:bg-red-700 transition-colors font-medium">
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center border border-dashed border-border rounded-lg">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <AlertCircle className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No adoption requests yet</h3>
              <p className="text-muted-foreground max-w-sm">
                When adopters express interest in your pets, their requests will appear here.
              </p>
            </div>
          )}
        </section>

        {/* Footer Spacing */}
        <div className="py-8"></div>
      </main>
    </>
  );
}
