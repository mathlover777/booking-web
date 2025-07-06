'use client';

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthRedirect() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      // If user is signed in and on the home page, redirect to dashboard
      if (window.location.pathname === '/') {
        router.push('/dashboard');
      }
    }
  }, [isSignedIn, isLoaded, router]);

  return null;
} 