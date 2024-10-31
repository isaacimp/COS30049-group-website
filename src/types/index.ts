export interface PredictionRequest {
  Type: string;
  Distance: number;
  BuildingArea: number;
  LandSize: number;
  YearBuilt: number;
  Rooms: number;
  Longitude: number;
  Lattitude: number;
}

export interface PredictionResponse {
  predicted_price: number;
  timestamp: string;
  id: string;
  confidence: number;
}

export interface PredictionError {
  detail: string;
  error: string;
}