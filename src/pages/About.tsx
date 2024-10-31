import { Brain, Building, Users } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            About PropPredict
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            We combine cutting-edge AI technology with real estate expertise to provide
            accurate property price predictions that help you make informed decisions.
          </p>
        </div>


        {/* Features Section */}
        <div className="mt-32">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <Brain className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">AI Technology</h3>
              <p className="mt-2 text-gray-600">
                Our advanced machine learning models are trained on millions of real estate transactions.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <Building className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">Market Expertise</h3>
              <p className="mt-2 text-gray-600">
                Deep understanding of real estate markets and property valuation principles.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">Customer Focus</h3>
              <p className="mt-2 text-gray-600">
                Dedicated to providing accurate, actionable insights for our users.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}