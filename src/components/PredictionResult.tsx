import { DollarSign } from 'lucide-react';
import { PredictionResponse } from '../types';

interface PredictionResultProps {
  prediction: PredictionResponse;
}

export default function PredictionResult({ prediction }: PredictionResultProps) {
  return (
    <div className="mt-8 p-6 bg-blue-50 rounded-lg">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Prediction Result</h2>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <DollarSign className="h-8 w-8 text-blue-600 mr-2" />
          <div>
            <p className="text-sm text-gray-500">Estimated Price</p>
            <p className="text-2xl font-bold text-gray-900">
              ${prediction.predicted_price.toLocaleString()}
            </p>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500">Confidence Level</p>
          <p className="text-lg font-semibold text-gray-900">
            {(prediction.confidence * 100).toFixed(1)}%
          </p>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-4">
        Prediction ID: {prediction.id}
        <br />
        Generated on: {new Date(prediction.timestamp).toLocaleString()}
      </p>
    </div>
  );
}