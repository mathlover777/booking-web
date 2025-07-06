'use client';

import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function SignOutRedirect() {
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut(() => {
      router.push('/');
    });
  };

  return (
    <button 
      onClick={handleSignOut}
      className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
    >
      Sign Out
    </button>
  );
} 