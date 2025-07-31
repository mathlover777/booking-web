"use client";

import { SignedIn, SignedOut } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import DashboardInstructions from "@/components/DashboardInstructions";

export default function Dashboard() {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const [hasEmail, setHasEmail] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API!;

  const checkUserEmail = useCallback(async () => {
    if (!isSignedIn) return;

    setIsChecking(true);
    try {
      const token = await getToken();
      const response = await fetch(`${baseUrl}/user/email`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.assist_local) {
          setHasEmail(true);
        } else {
          setHasEmail(false);
        }
      } else {
        setHasEmail(false);
      }
    } catch {
      setHasEmail(false);
    } finally {
      setIsChecking(false);
    }
  }, [isSignedIn, getToken, baseUrl]);

  // Check if user has email configured
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      checkUserEmail();
    }
  }, [isLoaded, isSignedIn, checkUserEmail]);

  // Redirect to setup page if no email configured
  useEffect(() => {
    if (hasEmail === false && !isChecking) {
      router.push('/setup-email');
    }
  }, [hasEmail, isChecking, router]);

  return (
    <>
      <SignedOut>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Please sign in to access your dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              You need to be authenticated to view this page.
            </p>
          </div>
        </div>
      </SignedOut>
      <SignedIn>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to Your Dashboard
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Your AI scheduling assistant is ready to help you manage meetings effortlessly.
          </p>
        </div>

        {/* Show loading while checking email status */}
        {isChecking && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Checking your setup...</p>
          </div>
        )}

        {/* Show content only if user has email configured */}
        {hasEmail && !isChecking && (
          <DashboardInstructions />
        )}
      </div>
    </div>
      </SignedIn>
    </>
  );
} 