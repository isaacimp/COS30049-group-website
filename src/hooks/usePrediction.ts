import { useState } from 'react';
import { PredictionRequest, PredictionResponse, PredictionError } from '../types';
import { predictPrice } from '../api/api';

export const usePrediction = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<PredictionError | null>(null);
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);

  const getPrediction = async (data: PredictionRequest) => {
    try {
      setLoading(true);
      setError(null);
      const result = await predictPrice(data);
      setPrediction(result);
      return result;
    } catch (err) {
      const error = err as Error;
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    prediction,
    loading,
    error,
    getPrediction,
  };
};