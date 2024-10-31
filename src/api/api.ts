import { PredictionRequest, PredictionResponse } from "../types";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const predictPrice = async (data: PredictionRequest): Promise<PredictionResponse> => {
  try {
    // Convert the data to FormData as the API expects form data
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });

    const response = await fetch(`${API_URL}/predict/`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Prediction request failed');
    }

    const result = await response.json();
    
    return {
      predicted_price: result.predicted_price,
      timestamp: new Date().toISOString(),
      id: Math.random().toString(36).substr(2, 9),
      confidence: 0.95
    };
  } catch (error) {
    console.error('Prediction error:', error);
    throw error;
  }
};

export const fetchSuburbData = async () => {
  try {
    const response = await fetch(`${API_URL}/suburbs/`);
    if (!response.ok) {
      throw new Error('Failed to fetch suburb data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching suburb data:', error);
    throw error;
  }
};