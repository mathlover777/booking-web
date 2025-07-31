"use client";

import { useAuth } from "@clerk/nextjs";
import { useState, useEffect, useCallback } from "react";

interface UserEmailData {
  assist_local: string;
}

export default function DynamicBookingEmail() {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const domain = process.env.NEXT_PUBLIC_DOMAIN!;
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API!;

  const fetchUserEmail = useCallback(async () => {
    if (!isSignedIn) return;

    setIsLoading(true);

    try {
      const token = await getToken();
      const response = await fetch(`${baseUrl}/user/email`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data: UserEmailData = await response.json();
        if (data.assist_local) {
          setUserEmail(`${data.assist_local}@${domain}`);
        }
      }
      // If 404 or any other status, it just means email is not set up yet
      // No need to treat it as an error
    } catch {
      // Silently fail - email just not set up yet
      console.warn("Email not configured yet");
    } finally {
      setIsLoading(false);
    }
  }, [isSignedIn, getToken, baseUrl, domain]);

  // Fetch user's email on component mount
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetchUserEmail();
    }
  }, [isLoaded, isSignedIn, fetchUserEmail]);

  // Show loading state briefly while fetching
  if (isLoading && isSignedIn) {
    return (
      <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-blue-600 font-mono animate-pulse">
        Loading...
      </code>
    );
  }

  // Show user's email if available, otherwise show setup prompt
  if (!userEmail) {
    return (
      <span className="text-gray-500 dark:text-gray-400 italic">
        Set up your email first
      </span>
    );
  }

  return (
    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-blue-600 font-mono">
      {userEmail}
    </code>
  );
} 