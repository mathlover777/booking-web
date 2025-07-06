'use client';

import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface CustomSignUpButtonProps {
  variant?: 'default' | 'header';
}

export default function CustomSignUpButton({ variant = 'default' }: CustomSignUpButtonProps) {
  const { openSignUp } = useClerk();
  const router = useRouter();

  const handleSignUp = () => {
    openSignUp({
      afterSignInUrl: '/dashboard',
      afterSignUpUrl: '/dashboard',
    });
  };

  if (variant === 'header') {
    return (
      <button 
        onClick={handleSignUp}
        className="border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-4 py-2 rounded-lg font-medium transition-colors"
      >
        Sign Up
      </button>
    );
  }

  return (
    <button 
      onClick={handleSignUp}
      className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200"
    >
      Watch Demo
    </button>
  );
} 