import { Building2 } from 'lucide-react';
import PredictionForm from '../components/PredictionForm';
import PredictionResult from '../components/PredictionResult';
import { usePrediction} from '../hooks/usePrediction';
import { PredictionRequest, PredictionResponse } from '../types';
import { useState } from 'react';

export default function Predict() {
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const { getPrediction } = usePrediction();


  //Fetch prediction from model and api
  const handlePrediction = async (formData: PredictionRequest) => {
    try {
      const result = await getPrediction(formData);
      setPrediction(result);
    } catch (error) {
      console.error('Error fetching prediction:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <div className="flex items-center space-x-2 mb-6">
              <Building2 className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Property Price Prediction</h1>
            </div>

            <PredictionForm onPredict ={handlePrediction} />
            {prediction ? (
              <PredictionResult prediction={prediction} />
            ) : (
              <p className="text-center text-gray-500 mt-4">No prediction available.</p>
               )}
          </div>
        </div>
      </div>
    </div>
  );
}