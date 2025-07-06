'use client';

import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface CustomSignInButtonProps {
  variant?: 'default' | 'header';
}

export default function CustomSignInButton({ variant = 'default' }: CustomSignInButtonProps) {
  const { openSignIn } = useClerk();

  const handleSignIn = () => {
    openSignIn({
      afterSignInUrl: '/dashboard',
      afterSignUpUrl: '/dashboard',
    });
  };

  if (variant === 'header') {
    return (
      <button 
        onClick={handleSignIn}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
      >
        Sign In
      </button>
    );
  }

  return (
    <button 
      onClick={handleSignIn}
      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
    >
      Get Started Free
    </button>
  );
} 