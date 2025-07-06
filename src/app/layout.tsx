import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import SignOutRedirect from "@/components/SignOutRedirect";
import AuthRedirect from "@/components/AuthRedirect";
import CustomSignInButton from "@/components/CustomSignInButton";
import CustomSignUpButton from "@/components/CustomSignUpButton";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vibes - Email Based Scheduling AI Agent",
  description: "Intelligent email scheduling assistant that helps you manage your calendar through email",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 min-h-screen`}>
          <AuthRedirect />
          <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                    Vibes
                  </h1>
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                    AI Scheduler
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <SignedOut>
                    <CustomSignInButton variant="header" />
                    <CustomSignUpButton variant="header" />
                  </SignedOut>
                  <SignedIn>
                    <div className="flex items-center space-x-4">
                      <UserButton 
                        appearance={{
                          elements: {
                            avatarBox: "w-8 h-8"
                          }
                        }}
                      />
                      <SignOutRedirect />
                    </div>
                  </SignedIn>
                </div>
              </div>
            </div>
          </header>
          <main className="flex-1">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
