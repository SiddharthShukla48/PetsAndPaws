'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Home } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userType = searchParams.get('userType') || 'adopter';

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl opacity-30 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 py-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Welcome to Pups & Paws! 🎉
          </h1>
          <p className="text-lg text-muted-foreground">
            {userType === 'adopter'
              ? 'Your journey to finding the perfect pet companion starts here.'
              : 'Your dashboard is ready to manage your rescue operations.'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Quick Actions */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Quick Actions</h2>
            <div className="space-y-3">
              {userType === 'adopter' ? (
                <>
                  <Link href="/">
                    <Button variant="outline" className="w-full justify-between">
                      <span>Browse Available Pets</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/auth">
                    <Button variant="outline" className="w-full justify-between">
                      <span>View My Favorites</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/auth">
                    <Button variant="outline" className="w-full justify-between">
                      <span>My Applications</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/ngo/add-pet">
                    <Button variant="outline" className="w-full justify-between">
                      <span>Add New Pet</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/auth">
                    <Button variant="outline" className="w-full justify-between">
                      <span>Manage Pets</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/auth">
                    <Button variant="outline" className="w-full justify-between">
                      <span>View Applications</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </Card>

          {/* Account Info */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Account Type</h2>
            <div className="space-y-4">
              <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                <p className="text-sm text-muted-foreground mb-1">You're logged in as</p>
                <p className="text-lg font-semibold text-foreground capitalize">
                  {userType === 'adopter' ? 'Pet Adopter' : 'NGO Member'}
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                {userType === 'adopter'
                  ? 'You can browse available pets and submit adoption applications.'
                  : 'You can manage your rescue center\'s pets and track adoption inquiries.'}
              </p>
            </div>
          </Card>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link href="/">
            <Button size="lg" className="gap-2">
              <Home className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
