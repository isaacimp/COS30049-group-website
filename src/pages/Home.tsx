import { ArrowRight, Building2, LineChart, Map } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="pt-20 pb-16 text-center lg:pt-32">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            <span className="text-blue-600">AI-Powered</span> Real Estate
            <br />Price Predictions
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
            Get accurate property price predictions using our advanced AI model. Make informed decisions
            with data-driven insights for your real estate investments.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/predict"
              className="rounded-md bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-200 inline-flex items-center"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-24">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="relative p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-lg">
                <Map className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Location Analysis</h3>
              <p className="mt-2 text-gray-600">
                Our model considers location factors including neighborhood data and proximity to CBD.
              </p>
            </div>
            
            <div className="relative p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-lg">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Property Features</h3>
              <p className="mt-2 text-gray-600">
                Detailed analysis of property characteristics.
              </p>
            </div>
            
            <div className="relative p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-lg">
                <LineChart className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Market Trends</h3>
              <p className="mt-2 text-gray-600">
                Up-to-date market analysis and historical data to ensure accurate predictions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}