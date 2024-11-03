import { DollarSign, Group } from 'lucide-react';
import { PredictionResponse } from '../types';
import Plot from 'react-plotly.js';

interface PredictionResultProps {
  prediction: PredictionResponse;
}


export default function PredictionResult({ prediction }: PredictionResultProps) {


  //Define constants used in the chart
    const buildingArea = prediction.datasetX.map((data) =>data.BuildingArea)
    const landSize = prediction.datasetX.map((data) =>data.Landsize)
    const rooms = prediction.datasetX.map((data) => data.Rooms)
    const year = prediction.datasetX.map((data) => data.YearBuilt)
    const lattitude = prediction.datasetX.map((data) => data.Latitude)
    const longitude = prediction.datasetX.map((data) => data.Longitude)
    const distance = prediction.datasetX.map((data) => data.Distance)
    const price = prediction.datasetY

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
      <div>
      <Plot //3d Scatter chart using building and land size
          data={[
            {
              x: buildingArea as number[],  
              y: landSize as number[],      
              z: price as number[],      
              mode: 'markers',
              type: 'scatter3d',
              name: 'Dataset',
              marker: {
                color: price,
                colorscale: 'Viridis',
                size: 5,
                opacity: 0.6,
              },
            },
            {
              x: [prediction.predictionFeatures.BuildingArea],  
              y: [prediction.predictionFeatures.Landsize],      
              z: [prediction.predicted_price],      
              mode: 'markers',
              type: 'scatter3d',
              name: "Prediction",
              marker: { color: 'red', size: 8, opacity: 1, }
            }
          ]}
          layout={{
            title: '3D plot comparsion of comparison and dataset<br> (Building Area, Land Size, Price)',
            scene: {
              xaxis: { title: 'Building Area (sq m)' },
              yaxis: { title: 'Land Size (sq m)' },
              zaxis: { title: 'Price ($)' },
            },
            font:{
              size: 13
            },
            plot_bgcolor : '#f0f7f7'
          }}
          config={{
            responsive: true
          }}
          style={{ width: '100%', height: '100%'}}
        />
      </div>
      <div>
        <Plot //Histogram to describe price distribution
          data={[
            {
              x: price, 
              type: 'histogram',
              marker: { color: 'orange' },
              name: 'Price Distribution',
            }
          ]}
          layout={{
            title: 'Distribution of Prices',
            xaxis: { title: 'Price ($)' },
            yaxis: { title: 'Frequency' },
            font:{
              size: 13
            }
          }}
          config={{
            responsive: true
          }}

          style={{ width: '100%', height: '100%'}}
        />
      </div>
      <div>
      <Plot //A map chart to visualize the spread of points and price variation
          data={[
            {
              mode: 'markers',
              type: 'scattermapbox',
              lon: longitude,  
              lat: lattitude, 
              name: 'Dataset',
              marker: {
                color: price,
                colorscale: 'Viridis',
                size: 5,
                colorbar:{
                  title: 'Price ($)',
                  x: -0.15
                }
              }
            },
            {         
              mode: 'markers',
              type: 'scattermapbox',
              lon: [prediction.predictionFeatures.Longitude],  
              lat: [prediction.predictionFeatures.Latitude], 
              name: "Prediction",
              marker: { color: 'red', size: 8, opacity: 1}
            }
          ]}
          layout={{
            title: 'Price By Location Comparison',
            font:{
              size: 13
            },
            plot_bgcolor : '#f0f7f7',
            mapbox: {
              style: 'carto-positron',     
              center: { lon: 144.9631, lat: -37.8136 }, // Center coordinates
              zoom: 10,
            }
          }}
          config={{
            responsive: true,
            mapboxAccessToken:'pk.eyJ1IjoiaXNhYWNtcCIsImEiOiJjbTJ3dWU1ZnAwYWF1MmlvaDY4dmd6dmNuIn0.V_uCzFC9c_d9_B5jOrsFQA'
          }}
          style={{ width: '100%', height: '100%'}}
          />
      </div>
    </div>
  );
}