'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Email is required');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email');
      return;
    }

    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl opacity-30 pointer-events-none" />

      <Card className="w-full max-w-md shadow-lg relative z-10">
        <div className="p-8">
          {/* Back Button */}
          <Link href="/auth" className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" />
            Back to Login
          </Link>

          {!isSubmitted ? (
            <>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Forgot Password?
                </h1>
                <p className="text-muted-foreground">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    className={error ? 'border-destructive' : ''}
                  />
                  {error && (
                    <p className="text-sm text-destructive">{error}</p>
                  )}
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Send Reset Link
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 mb-4">
                  <span className="text-2xl">✓</span>
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  Check Your Email
                </h2>
                <p className="text-muted-foreground">
                  We've sent a password reset link to <span className="font-semibold text-foreground">{email}</span>
                </p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg border border-border">
                <p className="text-sm text-muted-foreground">
                  The link will expire in 24 hours. If you don't see the email, check your spam folder.
                </p>
              </div>

              <Button
                onClick={() => router.push('/auth')}
                className="w-full"
                size="lg"
              >
                Back to Login
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
