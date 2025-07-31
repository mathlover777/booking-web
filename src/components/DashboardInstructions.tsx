"use client";

import { useAuth } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import DynamicBookingEmail from "./DynamicBookingEmail";

interface UserEmailData {
  assist_local: string;
}

export default function DashboardInstructions() {
  const { userId, getToken, isLoaded, isSignedIn } = useAuth();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const domain = process.env.NEXT_PUBLIC_DOMAIN!;
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API!;

  // Fetch user's email on component mount and when user changes
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetchUserEmail();
    }
  }, [isLoaded, isSignedIn, userId]);

  // Listen for email update events
  useEffect(() => {
    const handleEmailUpdate = () => {
      console.log("Email update event received, fetching email...");
      // Add a small delay to ensure the API has updated
      setTimeout(() => {
        fetchUserEmail();
      }, 500);
    };

    window.addEventListener('emailUpdated', handleEmailUpdate);
    return () => window.removeEventListener('emailUpdated', handleEmailUpdate);
  }, []);

  // Fallback: Poll for email updates when userEmail is null (email not set up yet)
  useEffect(() => {
    if (!userEmail && isSignedIn && !isLoading) {
      const interval = setInterval(() => {
        console.log("Polling for email updates...");
        fetchUserEmail();
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, [userEmail, isSignedIn, isLoading]);

  const fetchUserEmail = async () => {
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
          const fullEmail = `${data.assist_local}@${domain}`;
          console.log("Setting user email:", fullEmail);
          setUserEmail(fullEmail);
        } else {
          console.log("No assist_local found in response");
          setUserEmail(null);
        }
      } else {
        console.log("Email not configured yet, status:", response.status);
        setUserEmail(null);
      }
      // If 404 or any other status, it just means email is not set up yet
    } catch (err) {
      console.warn("Email not configured yet:", err);
      setUserEmail(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Don't show anything if not loaded or not signed in
  if (!isLoaded || !isSignedIn) {
    return null;
  }

  // Don't show instructions if email is not configured
  if (!userEmail) {
    return null;
  }

  return (
    <>
      {/* Main Instructions Card */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 p-8 mb-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            You&apos;re All Set!
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            To schedule any meeting, simply add our AI assistant to your email thread:
          </p>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
              <code className="text-xl font-mono text-blue-600 dark:text-blue-400">
                {userEmail}
              </code>
            </div>
            <a 
              href="/setup-email" 
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Edit
            </a>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Our AI will automatically analyze the email conversation and schedule the meeting for you.
          </p>
        </div>
      </div>

      {/* How to Use Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            📧 Start an Email Thread
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Begin a normal email conversation with the person you want to meet with.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Example:</strong> &quot;Hi Sarah, I&apos;d like to discuss the Q4 project. Are you available for a meeting?&quot;
            </p>
          </div>
        </div>

        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            🤖 Add Our AI Assistant
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Include <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded text-blue-600 font-mono">{userEmail}</code> in the CC or BCC field.
          </p>
          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
            <p className="text-sm text-green-800 dark:text-green-200">
              <strong>AI will:</strong> Read the conversation, understand context, and suggest optimal meeting times.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Start Examples */}
      <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Quick Start Examples
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Meeting Request</h3>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                &quot;Hi team, let&apos;s discuss the new product launch. I&apos;m thinking we need a 30-minute meeting to align on the strategy.&quot;
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                CC: {userEmail}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Interview Scheduling</h3>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                &quot;Hi John, thanks for your application. I&apos;d like to schedule a 45-minute interview to discuss the role.&quot;
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                CC: {userEmail}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 