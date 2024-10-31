import { Home, Info, LineChart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <LineChart className="h-8 w-8 text-blue-600" />
              <span className="font-bold text-xl text-gray-800">PropPredict</span>
            </Link>
          </div>
          
          <div className="flex space-x-8">
            <Link
              to="/"
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                isActive('/') 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            
            <Link
              to="/predict"
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                isActive('/predict')
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <LineChart className="w-4 h-4 mr-1" />
              Predict
            </Link>
            
            <Link
              to="/about"
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                isActive('/about')
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Info className="w-4 h-4 mr-1" />
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}