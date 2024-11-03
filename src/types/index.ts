export interface PredictionRequest {
  Type: string;
  Distance: number;
  BuildingArea: number;
  LandSize: number;
  YearBuilt: number;
  Rooms: number;
  Longitude: number;
  Latitude: number;
}
export interface PropertyFeatures {
  Distance: number;
  BuildingArea: number;
  Landsize: number;
  YearBuilt: number;
  Rooms: number;
  Longitude: number;
  Latitude: number;
}

export interface PredictionResponse {
  predicted_price: number;
  datasetX: PropertyFeatures[]
  datasetY: number[]
  predictionFeatures: PropertyFeatures
  timestamp: string;
  id: string;
  confidence: number;
}

export interface PredictionError {
  detail: string;
  error: string;
}