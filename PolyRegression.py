
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import pandas as pd
from sklearn.preprocessing import PolynomialFeatures
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.pipeline import make_pipeline
from sklearn.linear_model import Ridge


# Load dataset
data = pd.read_csv('melb_data.csv')

# Remove null Values
data = data.dropna()

# Remove rows where values are 0, and when the building area is more than the land size.
data = data[(data['Price'] != 0) & (data['Rooms'] != 0)& (data['Landsize'] != 0)& (data['BuildingArea'] < data['Landsize']) & (data['YearBuilt'] != 0) & (data['BuildingArea'] != 0)]

# Data Cleaning, by removing outliers with IQR, and 
numeric_data = data.select_dtypes(include=['float64', 'int64']) # Select only numeric columns to perform cleaning

# Calculate Q1 (25th percentile) and Q3 (75th percentile)
Q1 = numeric_data.quantile(0.25)
Q3 = numeric_data.quantile(0.75)
IQR = Q3 - Q1
lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR
# Remove outliers
data = data[~((numeric_data < lower_bound) | (numeric_data > upper_bound)).any(axis=1)]

#Split data into different categories, depending on the housing type
houses = data[data['Type'] == 'h']
townhouses = data[data['Type'] == 't']
units = data[data['Type'] == 'u']

#function to define X and Y variables for each data set
def prepare_data(df):
    X = df[['Distance', 'BuildingArea', 'Landsize', 'YearBuilt', 'Rooms', 'Longtitude', 'Lattitude']]
    y = df['Price']
    return X, y

X_h, y_h = prepare_data(houses)
X_t, y_t = prepare_data(townhouses)
X_u, y_u = prepare_data(units)


def train_ridge_poly_model(X, y, degree=2, alpha=1.0):
    # Pipeline to apply polynomial to ridge regression
    ridge_poly_model = make_pipeline(PolynomialFeatures(degree), Ridge(alpha = alpha))
    
    # Split the data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    ridge_poly_model.fit(X_train, y_train)
    
    # Make predictions
    y_pred = ridge_poly_model.predict(X_test)
    
    # Calculate MSE and R^2
    mse = mean_squared_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)
    
    #Print Results
    print(f"Polynomial Ridge Regression (degree={degree}, alpha={alpha}) - MSE: {mse}, R²: {r2}")
    return ridge_poly_model, mse, r2


ridge_poly_h, poly_mse_h, poly_r2_h = train_ridge_poly_model(X_h, y_h, degree=3, alpha=1.0)
ridge_poly_t, poly_mse_t, poly_r2_t = train_ridge_poly_model(X_t, y_t, degree=2, alpha=1.0)
ridge_poly_u, poly_mse_u, poly_r2_u = train_ridge_poly_model(X_u, y_u, degree=2, alpha=1.0)

def predict_price(model, distance, building_area, land_size, year_built, rooms, longtitude, lattitude):
    # Create a DataFrame from the input parameters
    input_data = pd.DataFrame({
        'Distance': [distance],
        'BuildingArea': [building_area],
        'Landsize': [land_size],
        'YearBuilt': [year_built],
        'Rooms': [rooms],
        'Longtitude': [longtitude],
        'Lattitude': [lattitude]
    })
    
    # Make the prediction
    predicted_price = model.predict(input_data)
    print(f"Predicted Price for Property: ${predicted_price}")
    
    return predicted_price

predict_price(ridge_poly_h, 10, 200, 300, 2000, 3, 144.998, -37.7996)