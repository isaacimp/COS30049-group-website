import { useState } from 'react';
import { ArrowRight, Building2, MapPin } from 'lucide-react';
import { PredictionRequest } from '../types';
import { usePrediction } from '../hooks/usePrediction';
import LocationMap from './LocationMap';

interface PredictionFormProps {
  onPredict: (formData: PredictionRequest) => void;
}

export default function PredictionForm({onPredict}: PredictionFormProps) {
  const { loading } = usePrediction();
  const [formData, setFormData] = useState<PredictionRequest>({
    Type: "House",
    Distance: 0,
    BuildingArea: 0,
    LandSize: 0,
    YearBuilt: 2000,
    Rooms: 1,
    Longitude: 144.9631,
    Latitude: -37.8136,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      onPredict(formData);
    } catch (error) {
      // Error is handled by the hook
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'Type' ? value : Number(value),
    }));
  };

  const handleLocationSelect = (longitude: number, latitude: number) => {
    setFormData(prev => ({
      ...prev,
      Longitude: Number(longitude.toFixed(6)),
      Latitude: Number(latitude.toFixed(6)),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Location
          </label>
          <LocationMap onLocationSelect={handleLocationSelect} />
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-1" />
            <span>Click on the map to set the property location</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="Type" className="block text-sm font-medium text-gray-700">
              Property Type
            </label>
            <select
              name="Type"
              id="Type"
              value={formData.Type}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="House">House</option>
              <option value="Unit">Unit</option>
              <option value="Townhouse">Townhouse</option>
            </select>
          </div>

          <div>
            <label htmlFor="Distance" className="block text-sm font-medium text-gray-700">
              Distance from CBD (km)
            </label>
            <input
              type="number"
              name="Distance"
              id="Distance"
              value={formData.Distance || ''}
              onChange={handleInputChange}
              step="0.1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="BuildingArea" className="block text-sm font-medium text-gray-700">
              Building Area (sq m)
            </label>
            <input
              type="number"
              name="BuildingArea"
              id="BuildingArea"
              value={formData.BuildingArea || ''}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="LandSize" className="block text-sm font-medium text-gray-700">
              Land Size (sq m)
            </label>
            <input
              type="number"
              name="LandSize"
              id="LandSize"
              value={formData.LandSize || ''}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="Rooms" className="block text-sm font-medium text-gray-700">
              Number of Rooms
            </label>
            <input
              type="number"
              name="Rooms"
              id="Rooms"
              value={formData.Rooms || ''}
              onChange={handleInputChange}
              min="1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="YearBuilt" className="block text-sm font-medium text-gray-700">
              Year Built
            </label>
            <input
              type="number"
              name="YearBuilt"
              id="YearBuilt"
              value={formData.YearBuilt || ''}
              onChange={handleInputChange}
              min="1800"
              max={new Date().getFullYear()}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="Longitude" className="block text-sm font-medium text-gray-700">
              Longitude
            </label>
            <input
              type="number"
              name="Longitude"
              id="Longitude"
              value={formData.Longitude}
              onChange={handleInputChange}
              step="0.000001"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
              readOnly
            />
          </div>

          <div>
            <label htmlFor="Latitude" className="block text-sm font-medium text-gray-700">
              Latitude
            </label>
            <input
              type="number"
              name="Latitude"
              id="Latitude"
              value={formData.Latitude}
              onChange={handleInputChange}
              step="0.000001"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
              readOnly
            />
          </div>
        </div>
      </div>

    

      <div className="flex justify-center">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            'Calculating...'
          ) : (
            <>
              Get Prediction
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}