"use client";

import { useAuth } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface UserEmailData {
  assist_local: string;
}

interface EmailAvailabilityResponse {
  available: boolean;
  message?: string;
}

export default function SetupEmailPage() {
  const { userId, getToken, isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const [emailData, setEmailData] = useState<UserEmailData | null>(null);
  const [editValue, setEditValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [availabilityMessage, setAvailabilityMessage] = useState<string | null>(null);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);

  const domain = process.env.NEXT_PUBLIC_DOMAIN!;
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API!;

  // Check if user already has email configured
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      checkExistingEmail();
    }
  }, [isLoaded, isSignedIn]);

  const checkExistingEmail = async () => {
    if (!isSignedIn) return;

    setIsLoading(true);
    setError(null);

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
          // User has email configured, populate the form for editing
          setEmailData(data);
          setEditValue(data.assist_local);
        }
      }
      // If 404 or any other status, it just means email is not set up yet
    } catch (err) {
      console.warn("Network error checking email:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const checkEmailAvailability = async (emailLocal: string): Promise<boolean> => {
    if (!isSignedIn) return false;

    setIsCheckingAvailability(true);
    setAvailabilityMessage(null);

    try {
      const token = await getToken();
      const response = await fetch(`${baseUrl}/user/email`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          assist_local: emailLocal,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to check availability: ${response.status}`);
      }

      const data: EmailAvailabilityResponse = await response.json();
      
      if (data.available) {
        setAvailabilityMessage("✅ Email is available");
        return true;
      } else {
        setAvailabilityMessage("❌ Email is already taken");
        return false;
      }
    } catch (err) {
      setAvailabilityMessage("❌ Error checking availability");
      return false;
    } finally {
      setIsCheckingAvailability(false);
    }
  };

  const saveUserEmail = async () => {
    if (!isSignedIn || !editValue.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      // Check availability first (skip if it's the same email)
      if (editValue.trim() !== emailData?.assist_local) {
        const isAvailable = await checkEmailAvailability(editValue.trim());
        if (!isAvailable) {
          setError("Email is not available");
          return;
        }
      }

      const token = await getToken();
      const response = await fetch(`${baseUrl}/user/email`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          assist_local: editValue.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to save email: ${response.status}`);
      }

      const data = await response.json();
      setEmailData(data);
      setAvailabilityMessage("✅ Email saved successfully! Redirecting to dashboard...");
      
      // Redirect to dashboard after a short delay
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save email");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (value: string) => {
    setEditValue(value);
    setError(null);
    setAvailabilityMessage(null);
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Please sign in to set up your email
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            You need to be authenticated to access this page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {emailData?.assist_local ? "Edit Your Concierge Email" : "Set Up Your Concierge Email"}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {emailData?.assist_local 
              ? "Update your personalized email address for scheduling meetings."
              : "Create your personalized email address to start scheduling meetings effortlessly."
            }
          </p>
        </div>

        {/* Email Setup Card */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 p-8">
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Choose your email address
              </label>
              <div className="flex items-center">
                <input
                  id="email"
                  type="text"
                  value={editValue}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder="your-name"
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <span className="px-4 py-3 bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-lg">
                  @{domain}
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                This will be your personal AI assistant email for scheduling meetings.
              </p>
            </div>

            {error && (
              <div className="p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg text-red-700 dark:text-red-300">
                {error}
              </div>
            )}

            {availabilityMessage && (
              <div className={`p-4 rounded-lg border ${
                availabilityMessage.includes("✅") 
                  ? "bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700 text-green-700 dark:text-green-300"
                  : "bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700 text-red-700 dark:text-red-300"
              }`}>
                {availabilityMessage}
              </div>
            )}

            <div className="flex space-x-4">
              <button
                onClick={saveUserEmail}
                disabled={isLoading || !editValue.trim()}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg disabled:cursor-not-allowed"
              >
                {isLoading ? "Saving..." : (emailData?.assist_local ? "Save Changes" : "Create Email")}
              </button>
              <button
                onClick={() => router.push('/dashboard')}
                disabled={isLoading}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            How it works
          </h3>
          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
            <p>• Once created, you can use this email in any email thread</p>
            <p>• Simply CC or BCC this email when discussing meetings</p>
            <p>• Our AI will analyze the conversation and schedule the meeting automatically</p>
            <p>• You can always edit your email address later from the dashboard</p>
          </div>
        </div>
      </div>
    </div>
  );
} 