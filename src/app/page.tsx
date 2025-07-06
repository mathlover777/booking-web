import { SignedIn, SignedOut } from "@clerk/nextjs";
import CustomSignInButton from "@/components/CustomSignInButton";

export default function Home() {
  const bookingEmail = process.env.BOOKING_EMAIL || "book@bhaang.com";

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Schedule Meetings with
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Just an Email
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Your intelligent AI assistant that manages your calendar through email. 
              Simply add <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-blue-600 font-mono">{bookingEmail}</code> to any email thread and let AI handle the rest.
            </p>
          </div>

          {/* CTA Section */}
          <div className="mb-12">
            <SignedOut>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <CustomSignInButton />
                <button className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200">
                  Watch Demo
                </button>
              </div>
            </SignedOut>
            <SignedIn>
              <div className="text-center">
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                  Welcome back! You&apos;re all set to start scheduling.
                </p>
                <a 
                  href="/dashboard" 
                  className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Go to Dashboard
                </a>
              </div>
            </SignedIn>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Email-Based</h3>
              <p className="text-gray-600 dark:text-gray-300">
                No new apps to learn. Just add our email to any thread and AI will handle the scheduling.
              </p>
            </div>

            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">AI-Powered</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Intelligent scheduling that understands context, preferences, and availability automatically.
              </p>
            </div>

            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Time-Saving</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Eliminate back-and-forth emails. Get meetings scheduled in seconds, not days.
              </p>
            </div>
          </div>

          {/* How it works */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">How It Works</h2>
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-8 rounded-2xl border border-gray-200 dark:border-gray-700 max-w-2xl mx-auto">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Add to Email Thread</h3>
                    <p className="text-gray-600 dark:text-gray-300">Include <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded text-blue-600 font-mono">{bookingEmail}</code> in any email conversation about scheduling.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">AI Analyzes Context</h3>
                    <p className="text-gray-600 dark:text-gray-300">Our AI understands the meeting purpose, participants, and preferences from the email content.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Meeting Scheduled</h3>
                    <p className="text-gray-600 dark:text-gray-300">AI finds the best time, sends calendar invites, and confirms with all participants.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            &copy; 2024 Vibes AI Scheduler. Making scheduling effortless through intelligent email automation.
          </p>
        </div>
      </footer>
    </div>
  );
}
