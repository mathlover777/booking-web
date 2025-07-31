"use client";

import { useAuth } from "@clerk/nextjs";
import { useState, useEffect, useCallback } from "react";

interface UserEmailData {
  assist_local: string;
}

interface EmailAvailabilityResponse {
  available: boolean;
  message?: string;
}

export default function UserEmailManager() {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const [emailData, setEmailData] = useState<UserEmailData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [availabilityMessage, setAvailabilityMessage] = useState<string | null>(null);


  const domain = process.env.NEXT_PUBLIC_DOMAIN!;
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API!;

  const fetchUserEmail = useCallback(async () => {
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
        setEmailData(data);
        setEditValue(data.assist_local || "");
      }
      // If 404 or any other status, it just means email is not set up yet
      // No need to treat it as an error
    } catch {
      // Only show error for actual network/authentication issues
      console.warn("Network error fetching email");
    } finally {
      setIsLoading(false);
    }
  }, [isSignedIn, getToken, baseUrl]);

  // Fetch user's email on component mount
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetchUserEmail();
    }
  }, [isLoaded, isSignedIn, fetchUserEmail]);

  const checkEmailAvailability = async (emailLocal: string): Promise<boolean> => {
    if (!isSignedIn) return false;

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
    } catch {
      setAvailabilityMessage("❌ Error checking availability");
      return false;
    }
  };

  const updateUserEmail = async () => {
    if (!isSignedIn || !editValue.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      // Check availability first
      const isAvailable = await checkEmailAvailability(editValue.trim());
      if (!isAvailable) {
        setError("Email is not available");
        return;
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
        throw new Error(`Failed to update email: ${response.status}`);
      }

      const data = await response.json();
      setEmailData(data);
      setIsEditing(false);
      setAvailabilityMessage("✅ Email updated successfully!");
      
      console.log("Email updated successfully, dispatching event...");
      // Dispatch event to notify other components
      window.dispatchEvent(new Event('emailUpdated'));
      
      // Clear success message after 3 seconds
      setTimeout(() => setAvailabilityMessage(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update email");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setEditValue(emailData?.assist_local || "");
    setError(null);
    setAvailabilityMessage(null);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditValue(emailData?.assist_local || "");
    setError(null);
    setAvailabilityMessage(null);
  };

  const handleInputChange = (value: string) => {
    setEditValue(value);
    setError(null);
    setAvailabilityMessage(null);
  };

  if (!isLoaded) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (!isSignedIn) {
    return null;
  }

  if (isLoading && !emailData) {
    return <div className="text-center py-4">Loading your email...</div>;
  }

  const fullEmail = emailData?.assist_local ? `${emailData.assist_local}@${domain}` : null;

  return (
    <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 dark:border-gray-700 max-w-md mx-auto">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        {fullEmail ? "Your Concierge Email" : "Set Up Your Concierge Email"}
      </h3>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg text-red-700 dark:text-red-300">
          {error}
        </div>
      )}

      {availabilityMessage && (
        <div className={`mb-4 p-3 rounded-lg border ${
          availabilityMessage.includes("✅") 
            ? "bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700 text-green-700 dark:text-green-300"
            : "bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700 text-red-700 dark:text-red-300"
        }`}>
          {availabilityMessage}
        </div>
      )}

      {!isEditing ? (
        <div className="space-y-4">
          {fullEmail ? (
            <div className="flex items-center justify-between">
              <code className="bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg text-blue-600 dark:text-blue-400 font-mono text-sm">
                {fullEmail}
              </code>
              <button
                onClick={handleEditClick}
                className="ml-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Edit
              </button>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Get your personalized email address to start scheduling meetings
              </p>
              <button
                onClick={handleEditClick}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Create Email
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="text"
              value={editValue}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="your-name"
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <span className="px-3 py-2 bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-lg">
              @{domain}
            </span>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={updateUserEmail}
              disabled={isLoading || !editValue.trim()}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={handleCancelEdit}
              disabled={isLoading}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 