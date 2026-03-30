'use client';

import React from 'react';
import Navbar from '@/components/navbar';
import { Card } from '@/components/ui/card';
import { Search, Heart, Clock, CheckCircle, AlertTriangle, Home, Users, Shield } from 'lucide-react';

export default function GuidePage() {
  const sections = [
    {
      icon: Search,
      title: "How to Browse Pets",
      content: [
        "Visit our homepage to see all available pets for adoption.",
        "Use filters to narrow down by pet type (Dog/Cat), location, or other criteria.",
        "Click on any pet card to view detailed information including photos, medical history, and NGO contact details.",
        "Browse through multiple pages to see all available pets."
      ]
    },
    {
      icon: Heart,
      title: "How to Send an Adoption Request",
      content: [
        "Sign in to your account (create one if you don't have it yet).",
        "Find a pet you're interested in and click on their profile.",
        "Fill out the adoption request form with your details and a personal message.",
        "Submit your request - you'll receive confirmation immediately.",
        "Track your request status in the 'My Requests' section."
      ]
    },
    {
      icon: Clock,
      title: "How to Track Request Status",
      content: [
        "Log in to your account and navigate to 'My Requests' from the navigation menu.",
        "View all your adoption requests in one place.",
        "Status indicators show: Pending (yellow), Approved (green), or Rejected (red).",
        "You can cancel pending requests if you change your mind.",
        "Approved requests will show contact information for the next steps."
      ]
    },
    {
      icon: CheckCircle,
      title: "Tips Before Adopting",
      content: [
        "Consider your lifestyle, living space, and time commitment before applying.",
        "Research the specific needs of the pet type you're interested in.",
        "Be prepared for the financial responsibility of pet ownership (food, vet care, etc.).",
        "Visit the pet if possible to ensure good compatibility.",
        "Have all necessary supplies ready before bringing your new pet home.",
        "Consider adopting from shelters rather than buying from breeders."
      ]
    }
  ];

  const quickTips = [
    {
      icon: Home,
      title: "Prepare Your Home",
      description: "Make sure your living space is safe and ready for a new pet."
    },
    {
      icon: Users,
      title: "Family Discussion",
      description: "Discuss with all family members and get their agreement."
    },
    {
      icon: Shield,
      title: "Legal Requirements",
      description: "Check local laws about pet ownership and licensing."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Adoption Guide</h1>
          <p className="text-gray-600">Everything you need to know about adopting pets through our platform</p>
        </div>

        {/* Main Guide Sections */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {sections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <Card key={index} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <IconComponent className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {section.title}
                    </h3>
                    <ul className="space-y-2">
                      {section.content.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-gray-700 flex items-start gap-2">
                          <span className="text-blue-500 mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Quick Tips Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Tips</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {quickTips.map((tip, index) => {
              const IconComponent = tip.icon;
              return (
                <Card key={index} className="p-6 text-center">
                  <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <IconComponent className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {tip.title}
                  </h3>
                  <p className="text-gray-600">
                    {tip.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Important Notice */}
        <Card className="p-6 bg-yellow-50 border-yellow-200">
          <div className="flex items-start gap-4">
            <AlertTriangle className="h-6 w-6 text-yellow-600 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                Important Notice
              </h3>
              <p className="text-yellow-700">
                Adopting a pet is a serious commitment that lasts 10-15 years or more. Please consider all aspects of pet ownership before submitting an adoption request. If you have any questions, feel free to contact the NGO directly or check our FAQ section.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}