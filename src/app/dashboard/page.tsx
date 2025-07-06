import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function Dashboard() {
  return (
    <>
      <SignedOut>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Please sign in to access your dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              You need to be authenticated to view this page.
            </p>
          </div>
        </div>
      </SignedOut>
      <SignedIn>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to Your Dashboard
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Your AI scheduling assistant is ready to help you manage meetings effortlessly.
          </p>
        </div>

        {/* Main Instructions Card */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 p-8 mb-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              You're All Set!
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              To schedule any meeting, simply add our AI assistant to your email thread:
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-6 inline-block">
              <code className="text-xl font-mono text-blue-600 dark:text-blue-400">
                book@bhaang.com
              </code>
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
                <strong>Example:</strong> "Hi Sarah, I'd like to discuss the Q4 project. Are you available for a meeting?"
              </p>
            </div>
          </div>

          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              🤖 Add Our AI Assistant
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Include <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded text-blue-600 font-mono">book@bhaang.com</code> in the CC or BCC field.
            </p>
            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
              <p className="text-sm text-green-800 dark:text-green-200">
                <strong>AI will:</strong> Read the conversation, understand context, and suggest optimal meeting times.
              </p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Smart Scheduling</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              AI analyzes availability and suggests the best meeting times for all participants.
            </p>
          </div>

          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Calendar Integration</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Automatically creates calendar events and sends invites to all participants.
            </p>
          </div>

          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Confirmation</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Sends confirmation emails with meeting details and calendar links to everyone.
            </p>
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
                  "Hi team, let's discuss the new product launch. I'm thinking we need a 30-minute meeting to align on the strategy."
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  CC: book@bhaang.com
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">Interview Scheduling</h3>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  "Hi John, thanks for your application. I'd like to schedule a 45-minute interview to discuss the role."
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  CC: book@bhaang.com
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Need help? Our AI assistant is here to make scheduling effortless.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              View Documentation
            </button>
            <button className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-6 py-3 rounded-lg font-medium transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
      </SignedIn>
    </>
  );
} 